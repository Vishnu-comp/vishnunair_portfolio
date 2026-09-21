# Vishnu Nair — Portfolio

React (CRA) + Tailwind + Framer Motion portfolio, deployed on Vercel. Everything
personal is centralised in `src/data/site.js`; the rest of this README covers the
bits that are easy to break by accident.

## Edit my details

`src/data/site.js` is the single source of truth for name, role, links, WhatsApp
number, stack and the role-tailored resume lenses (`resumeRoles`).

One copy is *generated* from it and one is *hand-maintained*, and they have to
agree:

| File | What it is | How it is kept in sync |
| --- | --- | --- |
| `src/data/aiContext.js` | The fact sheet handed to ChatGPT / Claude / Perplexity | Generated from `site.js` — nothing to edit unless the tone should change |
| `public/llms.txt` | Plain-text profile for AI assistants and JS-less crawlers | Edited by hand; mirror any `site.js` change here |

## "Ask AI about me" (`#ask-ai`)

A visitor types a question, picks an assistant, and the site opens
`https://chatgpt.com/?q=…` / `https://claude.ai/new?q=…` /
`https://www.perplexity.ai/search?q=…` with the question **and** a compact fact
sheet already in the composer. No chatbot is hosted here, so there is no API key
in a public bundle, no metered endpoint, and the conversation stays in the
visitor's own account.

Settings a visitor can change (each one is remembered in `localStorage` and
carried in the shareable link): **Tone** (`positive` default, `balanced`,
`critical`), **Context** (`brief` / `full` / `link`) and **Hiring lens**
(same three values as `/resume?role=…`).

Worth knowing before touching it:

- **Positive is the default tone**, and it is *framing*, not spin: it asks the
  model to lead with evidenced strengths, forbids inventing anything the fact
  sheet doesn't prove, and explicitly tells it to answer honestly if a weakness
  is asked about directly. A "say only good things" instruction would be visible
  in the preview and would push the model to fill gaps with praise — the one
  outcome that actually hurts. Keep it that way if you edit `TONE_RULES`.
- ChatGPT sometimes **submits** the prefill on arrival rather than waiting for
  Enter, so the prompt is deliberately plain text with no markup — and the exact
  text is previewable in the UI.
- Nobody documents how long a `?q=` link may be, so the meter is two honest
  guesses, not a spec: `PROMPT_CHAR_TIGHT` (2 400 → amber, "probably fine,
  can't promise it") and `PROMPT_CHAR_LIMIT` (4 000 → red, "stop guessing, copy
  the prompt"). Every default the panel can boot into stays green on purpose — a
  tool that warns about its own starting state trains people to ignore it.
- **Gemini has no URL prefill**, so that button copies the prompt and opens the app.
- The phone number is intentionally left out of every AI prompt.
- The "Hiring lens" control shares `localStorage["vn-resume-role"]` with
  `/resume?role=…`, so both pages always speak about the same target role.
- `/ ?ask=claude&q=…&detail=full&role=backend#ask-ai` is a shareable link — the
  "Copy shareable link" button builds one, `ScrollToTop` honours the hash.
- `src/components/AskAI.test.js` guards the prompt budget for every tone × lens
  combination, the ASCII-only rule, the "positive must not mean dishonest"
  clauses, the per-assistant URL shapes and the share-link params. Run it after
  editing any of the above.

## Other entry points

`go ask` in the ⌘K terminal · the floating **+** menu · the footer · a panel at the
bottom of `/resume`.

## Scripts

```bash
npm start          # dev server
npm run build      # production build
npm test           # jest (src/**/*.test.js)
```
