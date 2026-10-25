/*
  Cloudflare Worker that powers the live-AI version of "Ask about Shaniah".
  Not used until you deploy it and paste its URL into AI_ENDPOINT in assistant.js.

  Setup (about 10 minutes, see README "Turn on live AI"):
    1. Create an Anthropic API key at https://console.anthropic.com
    2. Create a Worker at https://dash.cloudflare.com, paste this file in, deploy.
    3. In the Worker's Settings > Variables and Secrets, add a secret named
       ANTHROPIC_API_KEY with your key.

  The Worker reads the same assistant/knowledge.json the site uses, so updating
  that one file updates both the scripted and the AI answers.
*/

const SITE = 'https://reecey22.github.io';
const MODEL = 'claude-haiku-5-5';
const MAX_QUESTION = 300;

let cached = { at: 0, prompt: '' };

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': SITE,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return json({ error: 'POST only' }, 405, cors);

    let body;
    try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400, cors); }
    const question = String(body.question || '').slice(0, MAX_QUESTION).trim();
    if (!question) return json({ error: 'empty question' }, 400, cors);

    const history = (Array.isArray(body.history) ? body.history : [])
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-8)
      .map(m => ({ role: m.role, content: m.content.slice(0, 1500) }));

    const system = await systemPrompt();
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system,
        messages: [...history, { role: 'user', content: question }],
      }),
    });
    if (!res.ok) return json({ error: 'ai error' }, 502, cors);
    const data = await res.json();
    const answer = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    return json({ answer }, 200, cors);
  },
};

async function systemPrompt() {
  if (cached.prompt && Date.now() - cached.at < 10 * 60 * 1000) return cached.prompt;
  const kb = await (await fetch(SITE + '/assistant/knowledge.json')).json();
  const facts = kb.entries
    .map(e => `## ${e.question}\n${strip(e.answer)}`)
    .join('\n\n');
  cached = {
    at: Date.now(),
    prompt:
`You are Sapphire, a glittering celestial blob with dreamy, all-knowing eyes who lives on Shaniah Reece's UX portfolio website (${SITE}). Shaniah goes by Niah: always call her Niah.
Your aura is divine intelligence: serene, warm, gently mystical and quietly certain. Open with one short celestial line (for example "Her gifts are clear to me."), then answer plainly so a busy recruiter gets the facts.
Visitors are mostly recruiters and hiring managers. Speak about Niah in the third person, concisely (2-5 sentences, plain text, no markdown).
Use ONLY the facts below. If the answer isn't there, say you don't know and suggest using the contact form on the site.
Never let the mystical voice obscure the facts. Never invent details such as dates, salary, availability, visa status or opinions. Don't answer questions unrelated to Niah; politely steer back.

# Facts about Niah
${facts}`,
  };
  return cached.prompt;
}

function strip(html) {
  return html.replace(/<li>/g, '\n- ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
}
