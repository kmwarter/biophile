// AI Provider types

export type AIProvider = 'anthropic' | 'openai' | 'xai' | 'openrouter';

export type ModelId =
  // Anthropic Claude models
  | 'claude-3-5-sonnet-20241022'
  | 'claude-3-5-haiku-20241022'
  | 'claude-3-opus-20240229'
  // OpenAI models
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'o1-preview'
  | 'o1-mini'
  // xAI Grok models
  | 'grok-2-1212'
  | 'grok-2-vision-1212'
  // OpenRouter (open models)
  | 'meta-llama/llama-3.1-405b-instruct'
  | 'meta-llama/llama-3.1-70b-instruct'
  | 'deepseek/deepseek-chat';

export interface AIModel {
  id: ModelId;
  provider: AIProvider;
  displayName: string;
  description: string;
  maxTokens: number;
  contextWindow: number;
  supportsStreaming: boolean;
  supportsVision: boolean;
  supportsSystemPrompt: boolean;
}

export interface ModelConfig {
  temperature: number;
  maxTokens: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
}

// Available models registry
export const MODELS: Record<ModelId, AIModel> = {
  // Anthropic
  'claude-3-5-sonnet-20241022': {
    id: 'claude-3-5-sonnet-20241022',
    provider: 'anthropic',
    displayName: 'Claude 3.5 Sonnet',
    description: 'Most intelligent model, best for complex tasks',
    maxTokens: 8192,
    contextWindow: 200000,
    supportsStreaming: true,
    supportsVision: true,
    supportsSystemPrompt: true,
  },
  'claude-3-5-haiku-20241022': {
    id: 'claude-3-5-haiku-20241022',
    provider: 'anthropic',
    displayName: 'Claude 3.5 Haiku',
    description: 'Fastest model, great for quick tasks',
    maxTokens: 8192,
    contextWindow: 200000,
    supportsStreaming: true,
    supportsVision: true,
    supportsSystemPrompt: true,
  },
  'claude-3-opus-20240229': {
    id: 'claude-3-opus-20240229',
    provider: 'anthropic',
    displayName: 'Claude 3 Opus',
    description: 'Powerful for complex reasoning',
    maxTokens: 4096,
    contextWindow: 200000,
    supportsStreaming: true,
    supportsVision: true,
    supportsSystemPrompt: true,
  },
  // OpenAI
  'gpt-4o': {
    id: 'gpt-4o',
    provider: 'openai',
    displayName: 'GPT-4o',
    description: 'Most capable GPT model with vision',
    maxTokens: 16384,
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: true,
    supportsSystemPrompt: true,
  },
  'gpt-4o-mini': {
    id: 'gpt-4o-mini',
    provider: 'openai',
    displayName: 'GPT-4o Mini',
    description: 'Fast and affordable',
    maxTokens: 16384,
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: true,
    supportsSystemPrompt: true,
  },
  'gpt-4-turbo': {
    id: 'gpt-4-turbo',
    provider: 'openai',
    displayName: 'GPT-4 Turbo',
    description: 'Previous generation flagship',
    maxTokens: 4096,
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: true,
    supportsSystemPrompt: true,
  },
  'o1-preview': {
    id: 'o1-preview',
    provider: 'openai',
    displayName: 'o1 Preview',
    description: 'Advanced reasoning model',
    maxTokens: 32768,
    contextWindow: 128000,
    supportsStreaming: false,
    supportsVision: false,
    supportsSystemPrompt: false,
  },
  'o1-mini': {
    id: 'o1-mini',
    provider: 'openai',
    displayName: 'o1 Mini',
    description: 'Fast reasoning model',
    maxTokens: 65536,
    contextWindow: 128000,
    supportsStreaming: false,
    supportsVision: false,
    supportsSystemPrompt: false,
  },
  // xAI Grok
  'grok-2-1212': {
    id: 'grok-2-1212',
    provider: 'xai',
    displayName: 'Grok 2',
    description: 'xAI flagship model',
    maxTokens: 131072,
    contextWindow: 131072,
    supportsStreaming: true,
    supportsVision: false,
    supportsSystemPrompt: true,
  },
  'grok-2-vision-1212': {
    id: 'grok-2-vision-1212',
    provider: 'xai',
    displayName: 'Grok 2 Vision',
    description: 'Grok with image understanding',
    maxTokens: 32768,
    contextWindow: 32768,
    supportsStreaming: true,
    supportsVision: true,
    supportsSystemPrompt: true,
  },
  // OpenRouter (open models)
  'meta-llama/llama-3.1-405b-instruct': {
    id: 'meta-llama/llama-3.1-405b-instruct',
    provider: 'openrouter',
    displayName: 'Llama 3.1 405B',
    description: 'Most powerful open model',
    maxTokens: 4096,
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: false,
    supportsSystemPrompt: true,
  },
  'meta-llama/llama-3.1-70b-instruct': {
    id: 'meta-llama/llama-3.1-70b-instruct',
    provider: 'openrouter',
    displayName: 'Llama 3.1 70B',
    description: 'Efficient open model',
    maxTokens: 4096,
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: false,
    supportsSystemPrompt: true,
  },
  'deepseek/deepseek-chat': {
    id: 'deepseek/deepseek-chat',
    provider: 'openrouter',
    displayName: 'DeepSeek Chat',
    description: 'Chinese open model with strong capabilities',
    maxTokens: 4096,
    contextWindow: 64000,
    supportsStreaming: true,
    supportsVision: false,
    supportsSystemPrompt: true,
  },
};

// Get models by provider
export function getModelsByProvider(provider: AIProvider): AIModel[] {
  return Object.values(MODELS).filter(model => model.provider === provider);
}

// Provider display names
export const PROVIDER_NAMES: Record<AIProvider, string> = {
  anthropic: 'Anthropic',
  openai: 'OpenAI',
  xai: 'xAI',
  openrouter: 'Open Models',
};
