import OpenAI from 'openai';

let client = null;

function usingMock() {
  return !process.env.OPENAI_API_KEY;
}

async function safeCompletion(prompt, system = 'You are a helpful assistant.') {
  if (usingMock()) {
    return {
      text: '[mocked] ' + prompt.slice(0, 120)
    };
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  });
  const text = response.choices?.[0]?.message?.content ?? '';
  return { text };
}

export const aiService = {
  async expandNode({ title, content }) {
    const prompt = `Generate 6-10 concise child ideas for a mind map node.\nNode title: ${title}\nContext: ${content}`;
    const { text } = await safeCompletion(prompt, 'You generate structured ideas for mind maps.');
    const items = text
      .split(/\n|\*/)
      .map(s => s.trim().replace(/^[-•]\s?/, ''))
      .filter(Boolean)
      .slice(0, 10);
    return items;
  },
  async summarizeNode({ title, content }) {
    const prompt = `Summarize this node in 1-2 sentences for a mind map.\nTitle: ${title}\nContent: ${content}`;
    const { text } = await safeCompletion(prompt, 'You summarize concisely.');
    return text.trim();
  },
  async suggestRelatedNodes({ title, content }) {
    const prompt = `Suggest 5 related concepts or references for a node.\nTitle: ${title}\nContent: ${content}`;
    const { text } = await safeCompletion(prompt, 'You suggest related concepts.');
    const items = text
      .split(/\n|\*/)
      .map(s => s.trim().replace(/^[-•]\s?/, ''))
      .filter(Boolean)
      .slice(0, 5);
    return items;
  },
  async textToMap({ text }) {
    const prompt = `Convert the following text into a simple JSON mind map with nodes and links.\nText:\n${text}\nReturn JSON strictly in this shape: { nodes: [{ title, content }], links: [{ sourceIndex, targetIndex, relationship_type }] }.`;
    const { text: out } = await safeCompletion(prompt, 'You output strict JSON for mind maps.');
    try {
      const jsonStart = out.indexOf('{');
      const jsonEnd = out.lastIndexOf('}');
      const slice = jsonStart >= 0 ? out.slice(jsonStart, jsonEnd + 1) : '{}';
      const parsed = JSON.parse(slice);
      return parsed;
    } catch {
      return { nodes: [], links: [] };
    }
  }
};
