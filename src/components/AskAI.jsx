import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { ASK_AI_EVENTS, safeTrack } from "../utils/analytics";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  ClipboardPaste,
  Eye,
  EyeOff,
  FileText,
  Info,
  Link2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import DoodleField from "./Doodles";
import {
  AI_LINKS,
  AI_PROVIDERS,
  DEFAULT_QUESTION,
  PROMPT_CHAR_LIMIT,
  PROMPT_LEVELS,
  SUGGESTED_QUESTIONS,
  buildPrompt,
  parseShareParams,
  providerById,
  shareLink,
} from "../data/aiContext";
import { resumeRoles, site } from "../data/site";
import copyText from "../utils/clipboard";
import { cx } from "../utils/theme";

/**
 * "Ask AI about me".
 *
 * The premise: a recruiter who is curious about me should get an answer in ten
 * seconds, without pasting my details around and without handing them to a
 * widget I host. So instead of a chatbot (API key in a public bundle, a metered
 * endpoint, my cost, my liability, someone else's chat UI), the section hands
 * the visitor a *link* that opens ChatGPT / Claude / Perplexity with the
 * question and a fact sheet already typed in. Gemini gets the same prompt on
 * the clipboard, because it has no URL prefill.
 *
 * Design rules this component has to keep:
 *  • Everything shown is editable and nothing is sent from this page — the only
 *    network request is the visitor navigating to their own assistant.
 *  • The exact text being sent is previewable, so the flow stays honest.
 *  • Long URLs get truncated by some clients, so the length is metered and the
 *    clipboard is one click away in every state.
 *  • The visitor's role lens is shared with /resume via the same localStorage
 *    key, so the two pages never tell different stories about the same person.
 */

const DETAIL_KEY = "vn-ask-detail";
const PROVIDER_KEY = "vn-ask-provider";
const ROLE_KEY = "vn-resume-role"; // deliberately shared with src/components/Resume.jsx
const ROLE_IDS = resumeRoles.map((r) => r.id);

const read = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode — the feature still works, just without memory */
  }
};

/* ------------------------------------------------------------------ *
 * Marks
 * ------------------------------------------------------------------ *

 * Abstract geometric glyphs rather than the assistants' logos: they read at a
 * glance next to the name, they don't ship a trademarked asset, and they stay
 * legible in both themes because each one inherits the provider's colour.
 */

const rayPath = (count, outer, inner = 0, startDeg = 0) =>
  Array.from({ length: count }, (_, i) => {
    const a = ((startDeg + (360 / count) * i) * Math.PI) / 180;
    const x1 = (12 + inner * Math.sin(a)).toFixed(2);
    const y1 = (12 - inner * Math.cos(a)).toFixed(2);
    const x2 = (12 + outer * Math.sin(a)).toFixed(2);
    const y2 = (12 - outer * Math.cos(a)).toFixed(2);
    return `M${x1} ${y1} L${x2} ${y2}`;
  }).join(" ");

const SPARKLE =
  "M12 2.8 C12.7 8.3 14.6 10.5 21.2 12 C14.6 13.5 12.7 15.7 12 21.2 C11.3 15.7 9.4 13.5 2.8 12 C9.4 10.5 11.3 8.3 12 2.8 Z";

const ProviderMark = ({ id, className }) => {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {id === "chatgpt" &&
        petals.map((deg) => (
          <ellipse
            key={deg}
            cx="12"
            cy="7.6"
            rx="2"
            ry="4.4"
            transform={`rotate(${deg} 12 12)`}
          />
        ))}
      {id === "claude" && <path d={rayPath(8, 9.6, 2.6)} />}
      {id === "perplexity" && <path d={SPARKLE} />}
      {id === "gemini" && (
        <>
          <path d={SPARKLE} />
          <path d={SPARKLE} transform="translate(6.2 -6.4) scale(0.42)" />
        </>
      )}
    </svg>
  );
};

/* ------------------------------------------------------------------ *
 * Small pieces
 * ------------------------------------------------------------------ *

 * `OptionRow` is the shared shell for the two segmented controls so the
 * "context" and "lens" pickers behave identically (radiogroup semantics,
 * arrow-key friendly because they are real buttons, animated active pill).
 */

const Segmented = ({ label, value, options, onChange, name }) => (
  <div className="min-w-0">
    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
      {label}
    </span>
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex flex-wrap gap-1 rounded-full bg-gray-100 p-1 dark:bg-slate-800"
    >
      {options.map((opt) => {
        const selected = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            name={name}
            title={opt.note}
            onClick={() => onChange(opt.id)}
            className={cx(
              "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              selected
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            {selected && (
              <motion.span
                layoutId={`ask-pill-${label}`}
                className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-slate-700"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const HintLine = ({ icon: Icon, title, children }) => (
  <li className="flex gap-3">
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-gold-500/10 dark:text-gold-300">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    </span>
    <span className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
      <span className="font-semibold text-gray-800 dark:text-slate-200">{title}</span>{" "}
      {children}
    </span>
  </li>
);

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */

const AskAI = () => {
  const [params, setParams] = useSearchParams();

  /*
   * A shared link (/ ?ask=claude&q=...&detail=full&role=backend#ask-ai) seeds
   * the whole panel. Parsed once, on purpose: later param writes are the *result*
   * of interacting, and feeding them back in would fight the visitor's edits.
   */
  const [seed] = useState(() => parseShareParams(params.toString()));

  const [question, setQuestion] = useState(seed.question || DEFAULT_QUESTION);
  const [level, setLevel] = useState(() => {
    if (seed.level) return seed.level;
    const stored = read(DETAIL_KEY);
    return PROMPT_LEVELS.some((l) => l.id === stored) ? stored : "brief";
  });
  const [role, setRole] = useState(() => {
    if (ROLE_IDS.includes(seed.role)) return seed.role;
    const stored = read(ROLE_KEY);
    return ROLE_IDS.includes(stored) ? stored : "fullstack";
  });
  const [showPrompt, setShowPrompt] = useState(false);
  const [feedback, setFeedback] = useState(null); // { tone, text }
  const feedbackTimer = useRef(null);

  const prompt = useMemo(() => buildPrompt({ question, level, role }), [question, level, role]);
  // Measured against the real thing rather than an estimate.
  const urlChars = useMemo(() => AI_PROVIDERS[0].href(prompt).length, [prompt]);
  const overLimit = prompt.length > PROMPT_CHAR_LIMIT;
  const isDefault = question.trim() === DEFAULT_QUESTION;

  /* Feedback is a single transient line — simpler than four independent
     "copied!" states, and it also carries the clipboard warnings. */
  const say = useCallback((text, tone = "good") => {
    setFeedback({ text, tone });
    window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setFeedback(null), 4200);
  }, []);
  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  /* Keep the URL shareable in the same spirit as /resume?role=... */
  const persist = useCallback(
    (next) => {
      const merged = { ask: next.provider ?? null, q: next.question ?? null, detail: next.level ?? null, role: next.role ?? null };
      const search = new URLSearchParams();
      if (merged.ask) search.set("ask", merged.ask);
      if (merged.q && merged.q !== DEFAULT_QUESTION) search.set("q", merged.q);
      if (merged.detail && merged.detail !== "brief") search.set("detail", merged.detail);
      if (merged.role && merged.role !== "fullstack") search.set("role", merged.role);
      setParams(search, { replace: true });
    },
    [setParams]
  );

  const togglePreview = () => {
    setShowPrompt((v) => {
      safeTrack(ASK_AI_EVENTS.preview, { open: String(!v) });
      return !v;
    });
  };

  const changeLevel = (id) => {
    setLevel(id);
    write(DETAIL_KEY, id);
    persist({ level: id, provider: params.get("ask"), question, role });
  };

  const changeRole = (id) => {
    setRole(id);
    write(ROLE_KEY, id); // /resume reads the same key, so both pages follow this choice
    persist({ role: id, provider: params.get("ask"), question, level });
  };

  const openIn = (provider) => {
    write(PROVIDER_KEY, provider.id);
    // Which assistant gets used, and whether people stick to the short prompt,
    // is the only way to know if this section earns its place on the page.
    safeTrack(ASK_AI_EVENTS.open, { provider: provider.id, level });
    persist({ provider: provider.id, question, level, role });
    if (provider.pastes) {
      // Gemini ignores query params, so the prompt has to travel by clipboard.
      copyText(prompt).then((ok) =>
        say(
          ok
            ? `${provider.name} has no URL prefill — the prompt is on your clipboard. Paste it with Ctrl/Cmd + V.`
            : `Could not reach the clipboard — open the preview below and copy the prompt manually.`,
          ok ? "info" : "warn"
        )
      );
    } else if (overLimit) {
      say(
        `This link is ${urlChars.toLocaleString()} chars. Some clients truncate very long URLs — "Copy prompt" is the safe route.`,
        "warn"
      );
    }
  };

  const copy = async (text, label) => {
    const ok = await copyText(text);
    safeTrack(ASK_AI_EVENTS.copy, { what: label.toLowerCase(), ok: String(ok) });
    say(ok ? `${label} copied to your clipboard.` : "Clipboard blocked — select the text in the preview and copy it yourself.", ok ? "good" : "warn");
    return ok;
  };

  const providerList = useMemo(() => {
    const preferred =
      providerById(params.get("ask")) || providerById(read(PROVIDER_KEY)) || AI_PROVIDERS[0];
    // Preferred first: the assistant a visitor arrived with shouldn't be buried.
    return [preferred, ...AI_PROVIDERS.filter((p) => p.id !== preferred.id)];
  }, [params]);

  return (
    /* The `id` lives on the wrapper in App.js, like every other home section,
       so the navbar / footer anchors and the scroll-spy stay consistent. */
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/60 via-white to-blue-50/30 dark:from-slate-900/60 dark:via-transparent dark:to-slate-900/40" />
      <DoodleField variant={2} />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ---------- heading ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-gold-500/25 dark:bg-gold-500/10 dark:text-gold-200">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            No chatbot, no tracking
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Ask an AI about me
          </h2>
          <span className="mx-auto mt-4 block h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 dark:bg-gold-gradient" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-slate-400">
            Curious whether I&apos;m worth a conversation? Send the question to
            ChatGPT, Claude, Perplexity or Gemini with a short fact sheet about
            me already typed in — every word stays editable before it is sent,
            and the chat lives in your account, not on this site.
          </p>
        </motion.div>

        {/* ---------- main card ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
        >
          {/* options */}
          <div className="flex flex-col gap-5 border-b border-gray-100 bg-gray-50/60 px-5 py-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between dark:border-slate-800 dark:bg-slate-950/40">
            <Segmented
              label="Context sent with the question"
              value={level}
              options={PROMPT_LEVELS}
              onChange={changeLevel}
              name="ask-level"
            />
            <Segmented
              label="Hiring lens"
              value={role}
              options={resumeRoles.map((r) => ({ id: r.id, label: r.label, note: r.tagline }))}
              onChange={changeRole}
              name="ask-role"
            />
          </div>

          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            {/* ---- composer ---- */}
            <div className="min-w-0">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="ask-question"
                  className="text-sm font-semibold text-gray-900 dark:text-white"
                >
                  1 · What do you want to know?
                </label>
                {/*
                 * A sibling of the label, never a descendant: a control inside
                 * a <label> also activates the field it labels, so "Reset"
                 * would have focused the textarea at the same time.
                 */}
                {!isDefault && (
                  <button
                    type="button"
                    onClick={() => setQuestion(DEFAULT_QUESTION)}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                    Reset
                  </button>
                )}
              </div>

              <textarea
                id="ask-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={5}
                maxLength={2000}
                placeholder="e.g. Does his Spring Boot experience cover async messaging?"
                className="w-full resize-y rounded-xl border border-gray-200 bg-white/70 p-3.5 text-sm leading-relaxed text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/70 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-gold-500 dark:focus:ring-gold-500/25"
              />

              <div className="mt-3 flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuestion(s)}
                    className={cx(
                      "rounded-full border px-2.5 py-1 text-left text-xs transition-colors",
                      question.trim() === s
                        ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-gold-500/40 dark:bg-gold-500/10 dark:text-gold-200"
                        : "border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-gold-500/30 dark:hover:bg-gold-500/5 dark:hover:text-gold-200"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* length meter — the honest part of the trick */}
              <div className="mt-4 rounded-xl border border-gray-100 px-3.5 py-3 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-gray-600 dark:text-slate-400">
                    Prompt the assistant receives
                  </span>
                  <span
                    className={cx(
                      "font-mono tabular-nums",
                      overLimit
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-gray-500 dark:text-slate-500"
                    )}
                  >
                    {prompt.length.toLocaleString()} / {PROMPT_CHAR_LIMIT.toLocaleString()} chars ·{" "}
                    {urlChars.toLocaleString()}-char link
                  </span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800"
                  role="progressbar"
                  aria-valuenow={Math.min(100, Math.round((prompt.length / PROMPT_CHAR_LIMIT) * 100))}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Prompt length against the safe URL budget"
                >
                  <span
                    className={cx(
                      "block h-full rounded-full transition-all duration-300",
                      overLimit
                        ? "bg-gradient-to-r from-amber-400 to-rose-500"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gold-400 dark:to-gold-600"
                    )}
                    style={{
                      width: `${Math.min(100, (prompt.length / PROMPT_CHAR_LIMIT) * 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-500 dark:text-slate-500">
                  {overLimit ? (
                    <>
                      Over the ~{PROMPT_CHAR_LIMIT.toLocaleString()}-char budget some clients allow in a
                      query string, so the question may arrive cut off. Use{" "}
                      <span className="font-semibold text-gray-600 dark:text-slate-300">Copy prompt</span>{" "}
                      instead, or switch the context level.
                    </>
                  ) : (
                    <>
                      Includes the fact sheet plus your question. Nothing is stored or sent by this
                      site — the text only travels inside the link you are about to open.
                    </>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={togglePreview}
                aria-expanded={showPrompt}
                aria-controls="ask-prompt-preview"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800 dark:text-gold-300 dark:hover:text-gold-200"
              >
                {showPrompt ? (
                  <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {showPrompt ? "Hide" : "Read"} exactly what gets sent
              </button>

              <AnimatePresence initial={false}>
                {showPrompt && (
                  <motion.div
                    id="ask-prompt-preview"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-gray-200 bg-gray-50 p-3.5 font-mono text-[11px] leading-relaxed text-gray-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
                      {prompt}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ---- assistants ---- */}
            <div className="min-w-0">
              <span className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                2 · Open it in your assistant
              </span>

              <div className="space-y-2">
                {providerList.map((provider) => {
                  return (
                    <a
                      key={provider.id}
                      href={provider.href(prompt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => openIn(provider)}
                      className="group flex items-start gap-3 rounded-xl border border-gray-200 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 dark:border-slate-700 dark:hover:border-slate-600"
                      style={{ boxShadow: `inset 3px 0 0 0 ${provider.color}40` }}
                    >
                      <span
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ color: provider.color, backgroundColor: provider.color + "1a" }}
                      >
                        <ProviderMark id={provider.id} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {provider.name}
                          </span>
                          {provider.pastes && (
                            <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:bg-slate-800 dark:text-slate-400">
                              paste
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-gray-500 dark:text-slate-400">
                          {provider.tagline}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gray-500 dark:text-slate-600 dark:group-hover:text-slate-300"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copy(prompt, "Prompt")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-gold-500/50 dark:hover:text-gold-200"
                >
                  <ClipboardPaste className="h-3.5 w-3.5" aria-hidden="true" />
                  Copy prompt
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copy(
                      shareLink({
                        provider: params.get("ask") || providerList[0].id,
                        question,
                        level,
                        role,
                      }),
                      "Link to this section"
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-gold-500/50 dark:hover:text-gold-200"
                >
                  <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Copy shareable link
                </button>
                <a
                  href={AI_LINKS.llms}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-gold-500/50 dark:hover:text-gold-200"
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  Plain-text fact sheet
                </a>
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    role="status"
                    className={cx(
                      "mt-3 flex items-start gap-2 rounded-xl px-3 py-2 text-xs font-medium leading-relaxed",
                      feedback.tone === "good" &&
                        "bg-blue-50 text-blue-800 dark:bg-gold-500/10 dark:text-gold-100",
                      feedback.tone === "info" &&
                        "bg-gray-50 text-gray-600 dark:bg-slate-800/60 dark:text-slate-300",
                      feedback.tone === "warn" &&
                        "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200"
                    )}
                  >
                    {feedback.tone === "good" ? (
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    ) : feedback.tone === "warn" ? (
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    )}
                    {feedback.text}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="mt-3 border-t border-gray-100 pt-3 text-[11px] leading-relaxed text-gray-500 dark:border-slate-800 dark:text-slate-500">
                You&apos;ll need to be signed in to the assistant. It can&apos;t open my resume
                PDF or private repositories — it only sees the text in this prompt,
                {" "}
                {level === "link" ? "plus the link it is told to read." : "and whatever it can browse."}{" "}
                Prefer asking me directly?{" "}
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Your portfolio — question")}`}
                  className="font-semibold text-blue-600 hover:underline dark:text-gold-300"
                >
                  Email works too.
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ---------- why it is built this way ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 grid gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5 backdrop-blur-sm sm:grid-cols-3 sm:p-6 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <HintLine icon={ShieldCheck} title="Nothing is hosted here.">
            No chatbot, no key in a public bundle, no analytics on your question. The only
            request is you opening your own assistant in a new tab.
          </HintLine>
          <HintLine icon={Sparkles} title="A prefill, not a sent message.">
            Most assistants wait for Enter; ChatGPT sometimes submits straight away — which
            is why the exact text is readable above before you click.
          </HintLine>
          <HintLine icon={FileText} title="Facts, not my opinions.">
            The sheet is written by me, so it is flattering by construction. The verdict is
            the model&apos;s: treat it as a starting point and check the links it cites.
          </HintLine>
        </motion.div>
      </div>
    </section>
  );
};

export default AskAI;
