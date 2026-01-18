import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { streamSSE } from 'hono/streaming'
import { cors } from 'hono/cors'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

// Health data
import {
  mockUser,
  mockBiomarkers,
  getCategories,
  mockNotes,
  mockRecommendations,
  mockRequisitions,
  mockBiologicalAge,
  mockQuestionnaireStatus,
} from '../../health/mock-data'

const app = new Hono().basePath('/api')

// CORS for frontend
app.use('/*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
}))

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: Date.now() })
})

// Available models endpoint
app.get('/models', (c) => {
  return c.json({
    models: [
      // Anthropic
      { id: 'claude-3-5-sonnet-20241022', provider: 'anthropic', name: 'Claude 3.5 Sonnet' },
      { id: 'claude-3-5-haiku-20241022', provider: 'anthropic', name: 'Claude 3.5 Haiku' },
      { id: 'claude-3-opus-20240229', provider: 'anthropic', name: 'Claude 3 Opus' },
      // OpenAI
      { id: 'gpt-4o', provider: 'openai', name: 'GPT-4o' },
      { id: 'gpt-4o-mini', provider: 'openai', name: 'GPT-4o Mini' },
      { id: 'gpt-4-turbo', provider: 'openai', name: 'GPT-4 Turbo' },
      // xAI (uses OpenAI-compatible API)
      { id: 'grok-2-1212', provider: 'xai', name: 'Grok 2' },
      // OpenRouter
      { id: 'meta-llama/llama-3.1-405b-instruct', provider: 'openrouter', name: 'Llama 3.1 405B' },
      { id: 'meta-llama/llama-3.1-70b-instruct', provider: 'openrouter', name: 'Llama 3.1 70B' },
      { id: 'deepseek/deepseek-chat', provider: 'openrouter', name: 'DeepSeek Chat' },
    ],
  })
})

// Chat completion with streaming
app.post('/chat', async (c) => {
  try {
    const body = await c.req.json()
    const { messages, model, apiKey, systemPrompt, config } = body

    if (!messages || !model || !apiKey) {
      return c.json({ error: 'Missing required fields: messages, model, apiKey' }, 400)
    }

    // Determine provider from model ID
    const provider = getProvider(model)

    // Stream response
    return streamSSE(c, async (stream) => {
      try {
        if (provider === 'anthropic') {
          await streamAnthropic(stream, messages, model, apiKey, systemPrompt, config)
        } else if (provider === 'openai') {
          await streamOpenAI(stream, messages, model, apiKey, systemPrompt, config)
        } else if (provider === 'xai') {
          await streamXAI(stream, messages, model, apiKey, systemPrompt, config)
        } else if (provider === 'openrouter') {
          await streamOpenRouter(stream, messages, model, apiKey, systemPrompt, config)
        } else {
          await stream.writeSSE({ data: JSON.stringify({ error: 'Unknown provider' }) })
        }
      } catch (error) {
        console.error('Streaming error:', error)
        await stream.writeSSE({
          data: JSON.stringify({
            type: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
          }),
        })
      }
    })
  } catch (error) {
    console.error('Chat error:', error)
    return c.json({ error: 'Failed to process chat request' }, 500)
  }
})

// Non-streaming chat completion
app.post('/chat/complete', async (c) => {
  try {
    const body = await c.req.json()
    const { messages, model, apiKey, systemPrompt, config } = body

    if (!messages || !model || !apiKey) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const provider = getProvider(model)
    let response: string = ''

    if (provider === 'anthropic') {
      response = await completeAnthropic(messages, model, apiKey, systemPrompt, config)
    } else if (provider === 'openai') {
      response = await completeOpenAI(messages, model, apiKey, systemPrompt, config)
    } else if (provider === 'xai') {
      response = await completeXAI(messages, model, apiKey, systemPrompt, config)
    } else if (provider === 'openrouter') {
      response = await completeOpenRouter(messages, model, apiKey, systemPrompt, config)
    }

    return c.json({ content: response })
  } catch (error) {
    console.error('Complete error:', error)
    return c.json({ error: 'Failed to complete request' }, 500)
  }
})

// Validate API key
app.post('/validate-key', async (c) => {
  try {
    const { provider, apiKey } = await c.req.json()

    if (!provider || !apiKey) {
      return c.json({ valid: false, error: 'Missing provider or apiKey' }, 400)
    }

    let valid = false
    let error = ''

    try {
      if (provider === 'anthropic') {
        const client = new Anthropic({ apiKey })
        // Make a minimal request to validate
        await client.messages.create({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1,
          messages: [{ role: 'user', content: 'hi' }],
        })
        valid = true
      } else if (provider === 'openai') {
        const client = new OpenAI({ apiKey })
        await client.models.list()
        valid = true
      } else if (provider === 'xai') {
        const client = new OpenAI({ apiKey, baseURL: 'https://api.x.ai/v1' })
        await client.models.list()
        valid = true
      } else if (provider === 'openrouter') {
        const client = new OpenAI({ apiKey, baseURL: 'https://openrouter.ai/api/v1' })
        await client.models.list()
        valid = true
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Validation failed'
    }

    return c.json({ valid, error: valid ? undefined : error })
  } catch (error) {
    return c.json({ valid: false, error: 'Validation request failed' }, 500)
  }
})

// Helper: Determine provider from model ID
function getProvider(model: string): string {
  if (model.startsWith('claude')) return 'anthropic'
  if (model.startsWith('gpt') || model.startsWith('o1')) return 'openai'
  if (model.startsWith('grok')) return 'xai'
  if (model.includes('/')) return 'openrouter'
  return 'unknown'
}

// Anthropic streaming
async function streamAnthropic(
  stream: any,
  messages: any[],
  model: string,
  apiKey: string,
  systemPrompt?: string,
  config?: any
) {
  const client = new Anthropic({ apiKey })

  const anthropicMessages = messages.map((m: any) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  const response = await client.messages.stream({
    model,
    max_tokens: config?.maxTokens || 4096,
    temperature: config?.temperature ?? 1,
    system: systemPrompt,
    messages: anthropicMessages,
  })

  for await (const event of response) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      await stream.writeSSE({
        data: JSON.stringify({ type: 'content', content: event.delta.text }),
      })
    }
  }

  const finalMessage = await response.finalMessage()
  await stream.writeSSE({
    data: JSON.stringify({
      type: 'done',
      usage: {
        promptTokens: finalMessage.usage.input_tokens,
        completionTokens: finalMessage.usage.output_tokens,
      },
    }),
  })
}

// OpenAI streaming
async function streamOpenAI(
  stream: any,
  messages: any[],
  model: string,
  apiKey: string,
  systemPrompt?: string,
  config?: any
) {
  const client = new OpenAI({ apiKey })

  const openaiMessages = systemPrompt
    ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
    : messages

  const response = await client.chat.completions.create({
    model,
    messages: openaiMessages,
    max_tokens: config?.maxTokens || 4096,
    temperature: config?.temperature ?? 1,
    stream: true,
  })

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content
    if (content) {
      await stream.writeSSE({
        data: JSON.stringify({ type: 'content', content }),
      })
    }
  }

  await stream.writeSSE({
    data: JSON.stringify({ type: 'done' }),
  })
}

// xAI streaming (OpenAI-compatible)
async function streamXAI(
  stream: any,
  messages: any[],
  model: string,
  apiKey: string,
  systemPrompt?: string,
  config?: any
) {
  const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.x.ai/v1',
  })

  const xaiMessages = systemPrompt
    ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
    : messages

  const response = await client.chat.completions.create({
    model,
    messages: xaiMessages,
    max_tokens: config?.maxTokens || 4096,
    temperature: config?.temperature ?? 1,
    stream: true,
  })

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content
    if (content) {
      await stream.writeSSE({
        data: JSON.stringify({ type: 'content', content }),
      })
    }
  }

  await stream.writeSSE({
    data: JSON.stringify({ type: 'done' }),
  })
}

// OpenRouter streaming
async function streamOpenRouter(
  stream: any,
  messages: any[],
  model: string,
  apiKey: string,
  systemPrompt?: string,
  config?: any
) {
  const client = new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'https://closedai.app',
      'X-Title': 'closedAI',
    },
  })

  const routerMessages = systemPrompt
    ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
    : messages

  const response = await client.chat.completions.create({
    model,
    messages: routerMessages,
    max_tokens: config?.maxTokens || 4096,
    temperature: config?.temperature ?? 1,
    stream: true,
  })

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content
    if (content) {
      await stream.writeSSE({
        data: JSON.stringify({ type: 'content', content }),
      })
    }
  }

  await stream.writeSSE({
    data: JSON.stringify({ type: 'done' }),
  })
}

// Non-streaming completions
async function completeAnthropic(
  messages: any[],
  model: string,
  apiKey: string,
  systemPrompt?: string,
  config?: any
): Promise<string> {
  const client = new Anthropic({ apiKey })

  const response = await client.messages.create({
    model,
    max_tokens: config?.maxTokens || 4096,
    temperature: config?.temperature ?? 1,
    system: systemPrompt,
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
  })

  return response.content[0].type === 'text' ? response.content[0].text : ''
}

async function completeOpenAI(
  messages: any[],
  model: string,
  apiKey: string,
  systemPrompt?: string,
  config?: any
): Promise<string> {
  const client = new OpenAI({ apiKey })

  const openaiMessages = systemPrompt
    ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
    : messages

  const response = await client.chat.completions.create({
    model,
    messages: openaiMessages,
    max_tokens: config?.maxTokens || 4096,
    temperature: config?.temperature ?? 1,
  })

  return response.choices[0]?.message?.content || ''
}

async function completeXAI(
  messages: any[],
  model: string,
  apiKey: string,
  systemPrompt?: string,
  config?: any
): Promise<string> {
  const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.x.ai/v1',
  })

  const xaiMessages = systemPrompt
    ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
    : messages

  const response = await client.chat.completions.create({
    model,
    messages: xaiMessages,
    max_tokens: config?.maxTokens || 4096,
    temperature: config?.temperature ?? 1,
  })

  return response.choices[0]?.message?.content || ''
}

async function completeOpenRouter(
  messages: any[],
  model: string,
  apiKey: string,
  systemPrompt?: string,
  config?: any
): Promise<string> {
  const client = new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'https://closedai.app',
      'X-Title': 'closedAI',
    },
  })

  const routerMessages = systemPrompt
    ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
    : messages

  const response = await client.chat.completions.create({
    model,
    messages: routerMessages,
    max_tokens: config?.maxTokens || 4096,
    temperature: config?.temperature ?? 1,
  })

  return response.choices[0]?.message?.content || ''
}

// ============================================================================
// HEALTH API ROUTES
// ============================================================================

// Get current user
app.get('/health/user', (c) => {
  return c.json(mockUser)
})

// Get dashboard summary
app.get('/health/dashboard', (c) => {
  const categories = getCategories()
  const summary = {
    total: mockBiomarkers.length,
    inRange: mockBiomarkers.filter((b) => b.status === 'in_range').length,
    outOfRange: mockBiomarkers.filter((b) => b.status === 'out_of_range').length,
    other: mockBiomarkers.filter((b) => b.status === 'other').length,
  }

  return c.json({
    user: mockUser,
    biologicalAge: mockBiologicalAge,
    biomarkersSummary: summary,
    categories,
    recentNotes: mockNotes.slice(0, 3),
    pendingActions: [
      {
        type: 'questionnaire',
        title: 'Complete Health History',
        description: 'Finish your health questionnaire to get personalized insights',
      },
    ],
  })
})

// Get all categories
app.get('/health/categories', (c) => {
  return c.json(getCategories())
})

// Get category detail with biomarkers
app.get('/health/categories/:categoryId', (c) => {
  const categoryId = c.req.param('categoryId')
  const categories = getCategories()
  const category = categories.find((cat) => cat.id === categoryId)

  if (!category) {
    return c.json({ error: 'Category not found' }, 404)
  }

  const biomarkers = mockBiomarkers.filter((b) => b.categoryId === categoryId)
  const note = mockNotes.find((n) => n.categoryId === categoryId) || null

  return c.json({
    category,
    biomarkers,
    note,
  })
})

// Get all biomarkers
app.get('/health/biomarkers', (c) => {
  const status = c.req.query('status')
  const categoryId = c.req.query('category')

  let filtered = mockBiomarkers

  if (status) {
    filtered = filtered.filter((b) => b.status === status)
  }

  if (categoryId) {
    filtered = filtered.filter((b) => b.categoryId === categoryId)
  }

  return c.json(filtered)
})

// Get single biomarker detail
app.get('/health/biomarkers/:biomarkerId', (c) => {
  const biomarkerId = c.req.param('biomarkerId')
  const biomarker = mockBiomarkers.find((b) => b.id === biomarkerId)

  if (!biomarker) {
    return c.json({ error: 'Biomarker not found' }, 404)
  }

  // Find recommendations linked to this biomarker
  const recommendations = mockRecommendations.flatMap((group) =>
    group.items.filter((rec) => rec.linkedBiomarkerIds.includes(biomarkerId))
  )

  return c.json({
    biomarker,
    recommendations,
  })
})

// Get all notes
app.get('/health/notes', (c) => {
  return c.json(mockNotes)
})

// Get recommendations
app.get('/health/recommendations', (c) => {
  return c.json(mockRecommendations)
})

// Get requisitions/lab visits
app.get('/health/requisitions', (c) => {
  return c.json(mockRequisitions)
})

// Get biological age
app.get('/health/biological-age', (c) => {
  return c.json(mockBiologicalAge)
})

// Get questionnaire status
app.get('/health/questionnaire-status', (c) => {
  return c.json(mockQuestionnaireStatus)
})

export const GET = handle(app)
export const POST = handle(app)
export const OPTIONS = handle(app)
