/**
 * The brain behind "Ask AI about me".
 *
 * There is deliberately no chatbot on this site. Instead, a visitor clicks
 * through to ChatGPT / Claude / Perplexity (or Gemini, with the prompt put on
 * their clipboard) with a question that already carries a fact sheet about me.
 * That shape has three wins over a hosted widget:
 *   1. nothing to pay for, run, or keep secure — no API key in a JS bundle;
 *   2. the conversation, its history and any follow-ups live in the visitor's
 *      own account, so nobody is asked to hand their questions to my server;
 *   3. the model answers from text I wrote instead of guessing about a person
 *      it has never heard of — which is the difference between a useful reply
 *      and a confident fabrication.
 *
 * Every string is composed from `src/data/site.js` (and the `resumeRoles`
 * entries that power /resume), so editing the data in one place keeps the
 * site, these prompts and public/llms.txt telling the same story.
 *
 * The prompt is plain prose on purpose: no markup, no zero-width characters,
 * no hidden instructions. Anyone can read the whole thing before pressing
 * Enter, and it should stay that way.
 */

import { resumeRoles, site } from "./site";

/** Canonical absolute origin for every link an AI is asked to verify. */
export const SITE_BASE = site.links.live.replace(/\/+$/, "");

export const AI_LINKS = {
  home: `${SITE_BASE}/`,
  ask: `${SITE_BASE}/#ask-ai`,
  work: `${SITE_BASE}/work`,
  resume: `${SITE_BASE}/resume`,
  portfolio: `${SITE_BASE}/#portfolio`,
  /** Machine-readable copy of the same fact sheet, served from /public. */
  llms: `${SITE_BASE}/llms.txt`,
  github: site.links.github,
  linkedin: site.links.linkedin,
};

/**
 * How long a prompt may get before the UI starts warning about it.
 *
 * There is no published number for this anywhere: browsers accept URLs vastly
 * longer than either threshold (Chrome ~2 MB, Safari ~80 k chars), so the only
 * real risk is whatever an assistant's own client does when it reads `?q=` on
 * load — and nobody documents that. So these are honest guesses with honest
 * labels rather than a fake spec:
 *
 *   ≤ 2 400  green. Where prompt-link builders keep themselves; every default
 *            this section can be in (any tone × any lens × short facts) fits,
 *            which matters more than the exact number — a tool that warns on its
 *            own out-of-the-box state is a tool nobody trusts.
 *   > 2 400  amber. "Probably fine, can't promise it." Full facts lands here.
 *   > 4 000  red. "Stop guessing — copy the prompt instead."
 *
 * The meter's job is not to certify safety; it is to make the escape hatch
 * obvious before someone emails a truncated link to a candidate.
 */
export const PROMPT_CHAR_TIGHT = 2400;
export const PROMPT_CHAR_LIMIT = 4000;

/** The tone an unset panel uses, and the one share links omit. */
export const DEFAULT_TONE = "positive";

/** Asked when the visitor hasn't typed anything — broad but still answerable. */
export const DEFAULT_QUESTION =
  "Give me a quick read on Vishnu: what he's genuinely strong at, which role he should be hired into, and what I should probe in an interview.";

export const SUGGESTED_QUESTIONS = [
  "Which of his projects best proves he can ship production code?",
  "Is he ready for a mid-level full-stack role on a React + Spring Boot team?",
  "What should I ask him in a technical interview to test his backend depth?",
  "What's missing or weakest in this profile?",
  "Summarise his experience in three bullets for a hiring manager.",
  "Would you hire him for a frontend-heavy role? Why or why not?",
];

const enc = encodeURIComponent;

/**
 * URLs carry the prompt, and encodeURIComponent turns every en-dash into nine
 * characters (%E2%80%93). Flattening the typography to ASCII keeps the link
 * roughly 15% shorter and dodges the clients that mangle multi-byte query
 * strings. Line breaks are preserved — every assistant renders them.
 */
const flatten = (text) =>
  text
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00b7/g, "|")
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n");

/* ------------------------------------------------------------------ *
 * Fact sheet
 * ------------------------------------------------------------------ */

const roleById = (id) => resumeRoles.find((r) => r.id === id) || resumeRoles[0];

/*
 * The fact-sheet lines are *composed* from src/data/site.js and the `resumeRoles`
 * lens data on purpose: site.js advertises itself as the single source of truth
 * for personal details, and a hand-copied summary is exactly the thing that goes
 * stale in a prompt nobody re-reads. Three facts are literal here, each tagged
 * with the page it mirrors:
 */

/** Mirrors src/components/Internship.jsx, which owns the internship timeline. */
const EARLIER_ROLE = {
  org: "ICIER",
  title: "Junior Software Development Intern",
  period: "May 2024 - Jul 2024",
};

/**
 * Tools site.js can't list because GitHub buckets them under the host language
 * (Socket.io server code, Python/Flask in Intervo) — see `stackLanguages`.
 */
const EXTRA_STACK = ["Socket.io", "Redux", "Python"];

/** Mirrors src/components/Education.jsx (percentages as displayed there). */
const EDUCATION =
  "MCA, Christ (Deemed to be University), Bengaluru, 2023-2025 (73%). " +
  "BCA, Kristu Jayanti College, Bengaluru, 2020-2023 (83%).";

/** A trailing period turns a bulleted list into one dense line per section. */
const sentence = (text) => String(text).trim().replace(/\.+$/, "");

/** "Shoffr (Feb 2025 - Present): x; y. Intern at ICIER (...): z." */
function workLine(lens) {
  const [currentOrg, currentPeriod = ""] = site.currentRole.org.split(" \u00b7 ").map((s) => s.trim());

  const bulletsFor = (org) =>
    lens.bullets
      .filter((b) => b.org.toLowerCase() === org.toLowerCase())
      .map((b) => sentence(b.text));

  return (
    [
      `${site.currentRole.title} at ${currentOrg} (${currentPeriod}): ${bulletsFor(currentOrg).join("; ")}`,
      `${EARLIER_ROLE.title} at ${EARLIER_ROLE.org} (${EARLIER_ROLE.period}): ${bulletsFor(EARLIER_ROLE.org).join("; ")}`,
    ]
      // A section that stops being filled in shouldn't print an empty heading.
      .filter((part) => !/: $/.test(part))
      .join(". ") + "."
  );
}

/** "Food ordering w/ real-time stock (React + Spring Boot)" -> the note alone. */
const shortNote = (note) => String(note).replace(/\s*\([^)]*\)\s*$/, "").trim();

/** Names + notes for the short version; plus live URLs for the deep one. */
function projectLine(projects, withUrl) {
  return projects
    .filter((p) => !/^this portfolio$/i.test(p.name))
    .map((p) =>
      withUrl
        ? `${p.name} (${p.note}) ${p.url}`
        : `${p.name} (${shortNote(p.note)})`
    )
    .join(", ");
}


/**
 * How much of the fact sheet travels inside the link. Levels, in the order the
 * UI offers them:
 *
 *   brief — everything needed to answer "who is he / is he a fit", small enough
 *           to survive a URL comfortably. Default.
 *   full  — adds the role-specific skills, bullets and live project links. The
 *           link goes past the budget some clients tolerate, so the UI says so
 *           and offers the clipboard instead of pretending it will work.
 *   link  — no facts inline, just a pointer to /llms.txt. Shortest option, right
 *           for a long custom question or a pasted job spec, but it only pays
 *           off when the assistant can actually browse.
 */
export const PROMPT_LEVELS = [
  {
    id: "brief",
    label: "Short facts",
    note: "1.8-2.1k chars. Answers well even with browsing switched off.",
  },
  {
    id: "full",
    label: "Full facts",
    note: "Adds the role lens, every skill and live project URLs. Long link.",
  },
  {
    id: "link",
    label: "Link only",
    note: "Shortest link; needs an assistant that can open URLs.",
  },
];

/** Same idea for the fact sheet itself, which `buildPrompt` wraps in rules. */
export function factSheet({ level = "brief", role = "fullstack" } = {}) {
  const r = roleById(role);
  const lens = roleById("fullstack"); // the undifferentiated view of his work
  const focus =
    r.id === "fullstack"
      ? null
      : `FOCUS: I'm evaluating him for a ${r.label.toLowerCase()} role.`;

  const brief = [
    `WHO: ${site.name}. Currently: ${site.availability}.`,
    "WORK: " + workLine(lens),
    "STACK: " + site.stackLanguages.concat(EXTRA_STACK).join(", ") + ".",
    "PROJECTS: " + projectLine(lens.projects, false) + ".",
    "EDUCATION: " + EDUCATION,
    `PROOF: GitHub ${AI_LINKS.github} (${site.stats[2].value} public repos) | portfolio ${AI_LINKS.home} | ${site.email}.`,
    focus,
  ].filter(Boolean);

  if (level !== "full") return flatten(brief.join("\n"));

  const detail = [
    `ROLE LENS (${r.label}): ${r.summary}`,
    "SKILLS: " + r.skills.join(", "),
    "OWNED: " + r.bullets.map((b) => `${b.org}: ${sentence(b.text)}`).join(" | "),
    "LIVE: " + projectLine(r.projects, true),
    "MORE: the complete, hand-maintained version lives at " + AI_LINKS.llms +
      " (education, certifications and the itemised Shoffr work list); if you can browse, read it before answering.",
  ];

  return flatten([...brief.filter((line) => !line.startsWith("PROJECTS")), ...detail].join("\n"));
}

/**
 * Rules sent with every prompt. The first three are non-negotiable and
 * tone-independent: a model holding a fact sheet will happily extrapolate a
 * salary expectation, a job title or a year of experience that was never
 * stated unless it is told not to.
 *
 * `TONE_RULES` is what the visitor chooses. Note what "positive" is *not*: it
 * is not "only say good things". This site shows the reader the exact prompt
 * before it is sent, so an instruction to hide weaknesses would (a) be visible
 * and cost the section all its credibility and (b) push the model to fill the
 * gaps with invented praise - the one outcome that actually damages him. So
 * the positive tone is strengths-first *framing* plus an explicit order to
 * answer honestly if a gap is asked about directly.
 */
const BASE_RULES = [
  "Use only the fact sheet below and the links it cites.",
  "If something isn't covered, say so - never invent employers, dates, titles or numbers.",
  "Answer in the language of my question, and never speak as if you were him.",
];

export const PROMPT_TONES = [
  {
    id: "positive",
    label: "Positive",
    note: "Default. Strengths first, evidence over adjectives; anything unproven is posed as a question for him.",
  },
  {
    id: "balanced",
    label: "Balanced",
    note: "Strengths and thin spots side by side - what the section shipped with originally.",
  },
  {
    id: "critical",
    label: "Critical",
    note: "For self-review before an interview: stress-test the profile, hold nothing back.",
  },
];

const TONE_RULES = {
  positive:
    "Lead with his strengths and why they matter to the team asking, citing evidence from the sheet rather than adjectives. Anything the sheet does not prove is a question to ask him, not a claim he holds, and if I ask about a weakness or gap, answer that honestly. End with 2-3 talking points for a follow-up conversation.",
  balanced:
    "Honest assessment beats flattery: name strengths, gaps and the questions worth asking.",
  critical:
    "Be demanding, the way a tough interviewer would: what is thin, what is unproven, what would make you pass. This is self-review, so encouragement is not wanted.",
};

const toneRules = (tone) => BASE_RULES.concat(TONE_RULES[tone] || TONE_RULES.positive).join(" ");

/** Final text handed to the assistant: rules → facts → the actual question. */
export function buildPrompt({ question, level, role, tone } = {}) {
  const q = ((question || "").trim() || DEFAULT_QUESTION).replace(/\s+/g, " ");
  const head = [
    `I'd like to know about a real person: ${site.name}, ${site.role}.`,
    toneRules(tone),
  ];

  if (level === "link") {
    return flatten(
      [
        ...head,
        `FACT SHEET (written by him, ${new Date().getFullYear()}): read ${
          AI_LINKS.llms
        } before answering - it is the plain-text summary of his portfolio and resume. If you cannot open links, say so instead of guessing.`,
        "MY QUESTION: " + q,
      ].join("\n\n")
    );
  }

  return flatten(
    [
      ...head,
      "FACT SHEET (written by him, " + new Date().getFullYear() + "):",
      factSheet({ level, role }),
      "MY QUESTION: " + q,
    ].join("\n\n")
  );
}

/* ------------------------------------------------------------------ *
 * Assistants
 * ------------------------------------------------------------------ */

/**
 * `href` is what the button opens. `pastes` marks clients that do not accept
 * a prefill parameter at all — for those we put the prompt on the clipboard
 * and let the visitor paste it, which is the honest version of the same trick.
 */
export const AI_PROVIDERS = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    tagline: "Prompt is pre-filled — and may send on its own",
    color: "#10a37f",
    href: (prompt) => `https://chatgpt.com/?q=${enc(prompt)}`,
  },
  {
    id: "claude",
    name: "Claude",
    tagline: "Pre-filled in a new chat; press Enter to send",
    color: "#d97757",
    href: (prompt) => `https://claude.ai/new?q=${enc(prompt)}`,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    tagline: "Best when you want the answer cross-checked against the live web",
    color: "#20808d",
    href: (prompt) => `https://www.perplexity.ai/search?q=${enc(prompt)}`,
  },
  {
    id: "gemini",
    name: "Gemini",
    tagline: "No URL prefill — prompt is copied for you to paste",
    color: "#4285f4",
    pastes: true,
    href: () => "https://gemini.google.com/app",
  },
];

export const providerById = (id) => AI_PROVIDERS.find((p) => p.id === id);

/**
 * A link to *this* section with the question + assistant already chosen, so
 * the "ask me" flow can be dropped in a LinkedIn message or an email instead
 * of pasting the raw provider URL.
 */
export function shareLink({ question, provider, level, role, tone }) {
  const params = new URLSearchParams();
  const q = (question || "").trim();
  if (q && q !== DEFAULT_QUESTION) params.set("q", q);
  if (provider) params.set("ask", provider);
  if (level && level !== "brief") params.set("detail", level);
  if (tone && tone !== DEFAULT_TONE) params.set("tone", tone);
  if (role && role !== "fullstack") params.set("role", role);
  const qs = params.toString();
  return `${AI_LINKS.home.replace(/#.*$/, "")}${qs ? `?${qs}` : ""}#ask-ai`;
}

/** Parses the same params back out of a location.search string. */
export function parseShareParams(search) {
  const params = new URLSearchParams(search || "");
  const ROLE_IDS = resumeRoles.map((r) => r.id);
  const ask = params.get("ask");
  const role = params.get("role");
  return {
    question: (params.get("q") || "").trim() || null,
    provider: providerById(ask) ? ask : null,
    level: ["brief", "full", "link"].includes(params.get("detail"))
      ? params.get("detail")
      : null,
    tone: PROMPT_TONES.some((t) => t.id === params.get("tone")) ? params.get("tone") : null,
    role: ROLE_IDS.includes(role) ? role : null,
  };
}
