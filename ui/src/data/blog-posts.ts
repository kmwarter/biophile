export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  content: BlogContent[];
}

export interface BlogContent {
  id: string;
  type: 'h1' | 'h2' | 'h3' | 'p' | 'quote';
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'why-you-should-own-your-health-data',
    title: 'Why You Should Own Your Health Data',
    date: '2025-01-15T12:00:00Z',
    author: 'Thing Team',
    content: [
      {
        id: '0',
        type: 'h1',
        content: 'Why You Should Own Your Health Data',
      },
      {
        id: '1',
        type: 'p',
        content: `Your health data is arguably the most personal information that exists about you. It tells the story of your body, your vulnerabilities, your family history, and potentially your future. Yet most people have no idea where their health data lives, who has access to it, or how it might be used against them.`,
      },
      {
        id: '2',
        type: 'p',
        content: `We built Thing because we believe this needs to change. The 21st Century Cures Act gave every American the legal right to access their health records through standard APIs. But having the right to access your data is meaningless if you don't have good tools to actually use it.`,
      },
      {
        id: '3',
        type: 'h2',
        content: 'The Problem with Current Health Apps',
      },
      {
        id: '4',
        type: 'p',
        content: `Most health apps today follow the same playbook: they ask you to upload your health data to their servers, then they use that data to train AI models, sell insights to pharmaceutical companies, or target you with ads. Even the "good" ones store your data in ways that could be subpoenaed, hacked, or sold in a bankruptcy.`,
      },
      {
        id: '5',
        type: 'p',
        content: `We took a different approach. Thing never stores your health data on our servers. We're a visualization layer that connects directly to the APIs that already exist—Quest, LabCorp, your doctor's patient portal. Your data flows from the source directly to your device, where it's rendered and analyzed locally.`,
      },
      {
        id: '6',
        type: 'quote',
        content: `"We can't sell what we don't have. We can't be hacked for data we don't store. We can't be subpoenaed for records we've never seen."`,
      },
      {
        id: '7',
        type: 'h2',
        content: 'What This Means for You',
      },
      {
        id: '8',
        type: 'p',
        content: `When you use Thing, you get the benefits of modern health tracking—beautiful visualizations, trend analysis, and AI-powered insights—without any of the privacy risks. You can share your data with your doctor using a one-time link that pulls fresh data directly from the source. For AI analysis, connect any provider you trust—OpenAI, Anthropic, Google—using your own API key. Or go fully private with local models like Ollama that run entirely on your device. Your data never has to leave your machine.`,
      },
      {
        id: '9',
        type: 'p',
        content: `This is what health technology should have been from the start. Your data, owned by you.`,
      },
    ],
  },
  {
    id: 'the-question-that-changed-everything',
    title: 'The Question That Changed Everything',
    date: '2025-01-10T12:00:00Z',
    author: 'Keith W.',
    content: [
      {
        id: '0',
        type: 'h1',
        content: 'The Question That Changed Everything',
      },
      {
        id: '1',
        type: 'p',
        content: `My dad had atrial fibrillation. He was also due to receive $300,000 from his pension. The doctors told him surgery carried risks, and he was worried he might not survive it. So he wanted to wait until after he got the pension money out before going under the knife.`,
      },
      {
        id: '2',
        type: 'p',
        content: `Meanwhile, he was shaking and barely making it through the day. When you have atrial fibrillation, your heart works overtime to pump blood. Your body trembles from the effort. I watched him struggle and asked a simple question: What's the risk of dying in the surgery versus the risk of dying from the fibrillation itself?`,
      },
      {
        id: '3',
        type: 'p',
        content: `He didn't know the answer. And honestly, why would he? It seems like an obvious question in retrospect, but my dad is an artist not a scientist. He has a pretty epic IMDB page and worked on movies you've probably seen—including Lion King II. But math and science and asking these kinds of analytical questions? That was never his thing. He was too busy drawing.`,
      },
      {
        id: '4',
        type: 'p',
        content: `In that moment, I realized I could just ask ChatGPT: "What are the statistical odds of dying in atrial fibrillation surgery versus the likelihood of dying from the disease itself?" The answer came back fast. The surgery risk was something like 0.01%. The risk of a heart attack from untreated AFib? Around 40%. It wasn't even close.`,
      },
      {
        id: '5',
        type: 'p',
        content: `When I showed my dad those numbers, he signed up for the surgery.`,
      },
      {
        id: '6',
        type: 'h2',
        content: 'The Unknowable',
      },
      {
        id: '7',
        type: 'p',
        content: `The thing about health is that if you do it right, you can never know what could have happened. Maybe he would have been fine if he'd waited. Maybe that conversation with ChatGPT saved his life. What we can know is that waiting made it roughly 40% more likely he would have died. That's not a small number.`,
      },
      {
        id: '8',
        type: 'quote',
        content: `"These tools exist now. But we need to give everyone access. It can't just be for a select few. It shouldn't be something you pay extra for."`,
      },
      {
        id: '9',
        type: 'h2',
        content: 'A Different Business Model',
      },
      {
        id: '10',
        type: 'p',
        content: `There are plenty of ways to build integrated services for doctors that make money. We don't need to extract wealth from people's health data. We don't need to hold people's health data for ransom. We can help them get access to what's already legally theirs through FHIR—the standard that makes your health records portable.`,
      },
      {
        id: '11',
        type: 'p',
        content: `That's why we built Thing. Not to profit from your data, but to give you the tools to understand it. The same tools that might have saved my dad's life should be available to everyone.`,
      },
    ],
  },
];
