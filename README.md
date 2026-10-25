# Shaniah Reece — Portfolio

Live at **https://reecey22.github.io**

UX research and HCI design portfolio. Purple and orange palette drawn from the DABW slides; name set in Dancing Script, headings in Bricolage Grotesque, body in Instrument Sans.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page: intro, how I work, selected work, about, contact |
| `dabw.html` | Case study: Designing the AfroVerse with Black Women in Computing |
| `style.css` | Shared styles for every page |
| `assets/Niah_Headshot.png` | Hero portrait |

## Add photos to the DABW case study

Put images in `assets/` with these names. Any that are missing stay hidden.

| File | Where it shows |
|---|---|
| `dabw-cover.jpg` | Replaces the illustration on the home page project card |
| `dabw-1.jpg` … `dabw-4.jpg` | Prototypes section of the case study |

## Add a new project

1. Copy `dabw.html` to a new file (for example `my-project.html`) and replace the content.
2. In `index.html`, copy the `<a class="feature">` block under **Selected work**, point it at the new page, and update the text.
3. Delete the "More case studies are on the way" box once you have a second project.

## Update the resume

The resume lives at `assets/Shaniah_Reece_Resume.pdf` and is linked from the hero and contact buttons in `index.html`. To update it, replace that file with a new PDF of the same name.

## Sapphire, the "Ask about Shaniah" assistant

Sapphire, the glittery blob in the bottom-right corner of every page, opens a chat that answers questions about Shaniah. Her look and animations live in `assistant/sapphire.js`; her voice (greeting, celestial `lead` lines, fallback) lives in `knowledge.json`.

| File | What it is |
|---|---|
| `assistant/knowledge.json` | Every question and answer. **Edit this file to change what the assistant says.** |
| `assistant/assistant.js` | The chat widget |
| `assistant/worker.js` | Optional server for live AI answers (not used yet) |

### Edit an answer

In `assistant/knowledge.json`, each entry has:

- `question`: the suggested question shown as a button
- `keywords`: words or phrases that route a typed question to this answer
- `answer`: the reply (simple HTML like `<strong>`, `<ul><li>` and links is fine)
- `related`: ids of the follow-up questions to suggest

Questions that match nothing get the `fallback` reply, which points to the contact form.

### Turn on live AI

Right now answers are scripted (free, no setup). To let Claude answer any question using the facts in `knowledge.json`:

1. Create an API key at [console.anthropic.com](https://console.anthropic.com) and add a few dollars of credit.
2. At [dash.cloudflare.com](https://dash.cloudflare.com) (free account), go to **Workers & Pages > Create > Worker**, name it `ask-shaniah`, deploy, then **Edit code**, paste in `assistant/worker.js` and deploy again.
3. In the Worker, open **Settings > Variables and Secrets**, add a **Secret** named `ANTHROPIC_API_KEY` with your key.
4. In `assistant/assistant.js`, set `AI_ENDPOINT` to the Worker's URL (for example `https://ask-shaniah.yourname.workers.dev`), and bump `assistant.js?v=` in the four HTML files.

The AI only uses facts from `knowledge.json`, so keep that file accurate. If the AI is ever unavailable, the widget falls back to the scripted answers. Set a monthly spend limit in the Anthropic console to cap cost.
