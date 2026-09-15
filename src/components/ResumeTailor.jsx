import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Palette, Server, Sparkles, ArrowUpRight } from "lucide-react";
import { resumeRoles } from "../data/site";

/**
 * Role-tailored resume switcher.
 *
 * A recruiter scanning for a Frontend hire shouldn't have to dig through the
 * whole PDF to find the relevant bullets — this panel spotlights the skills,
 * work and projects that matter for the role they clicked. The full PDF stays
 * embedded underneath as the canonical document.
 *
 * Selection lives in the parent (Resume.jsx): URL param `?role=` for
 * shareability + localStorage for stickiness.
 */

const ROLE_ICONS = {
  fullstack: Layers,
  frontend: Palette,
  backend: Server,
};

const ROLE_THEME = {
  fullstack: {
    accent: "text-blue-600 dark:text-gold-300",
    chip: "border-blue-200 bg-blue-50 text-blue-700 dark:border-gold-500/25 dark:bg-gold-500/10 dark:text-gold-200",
    badge: "bg-blue-100 text-blue-700 dark:bg-gold-500/15 dark:text-gold-200",
    arrow: "text-gray-300 group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-gold-300",
  },
  frontend: {
    accent: "text-sky-600 dark:text-sky-400",
    chip: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    arrow: "text-gray-300 group-hover:text-sky-500 dark:text-slate-600 dark:group-hover:text-sky-400",
  },
  backend: {
    accent: "text-emerald-600 dark:text-emerald-400",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    arrow: "text-gray-300 group-hover:text-emerald-500 dark:text-slate-600 dark:group-hover:text-emerald-400",
  },
};

const ResumeTailor = ({ role, setRole }) => {
  const active = resumeRoles.find((r) => r.id === role) || resumeRoles[0];
  const Icon = ROLE_ICONS[active.id] || Layers;
  const theme = ROLE_THEME[active.id] || ROLE_THEME.fullstack;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      {/* ---- header: label + segmented role chips ---- */}
      <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-slate-400">
          <Sparkles className={`h-4 w-4 ${theme.accent}`} aria-hidden="true" />
          Tailored view — pick the role you&apos;re hiring for
        </div>

        <div
          className="flex gap-1 self-start rounded-full bg-gray-100 p-1 sm:self-auto dark:bg-slate-800"
          role="tablist"
          aria-label="Tailor resume by role"
        >
          {resumeRoles.map((r) => {
            const RIcon = ROLE_ICONS[r.id];
            const selected = r.id === active.id;
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setRole(r.id)}
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                  selected
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="resume-role-pill"
                    className="absolute inset-0 rounded-full bg-white shadow dark:bg-slate-700"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <RIcon className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
                <span className="relative z-10">{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- body: cross-fades between roles ---- */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="px-5 py-6 sm:px-6"
        >
          <div className="mb-1 flex items-center gap-2.5">
            <Icon className={`h-5 w-5 ${theme.accent}`} aria-hidden="true" />
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
              {active.tagline}
            </h2>
          </div>
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base dark:text-slate-400">
            {active.summary}
          </p>

          {/* skills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {active.skills.map((s) => (
              <span
                key={s}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${theme.chip}`}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* role-relevant work */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                What I&apos;d own
              </h3>
              <ul className="space-y-3">
                {active.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                    <span
                      className={`mt-0.5 h-fit shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${theme.badge}`}
                    >
                      {b.org}
                    </span>
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* proof projects */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                Proof, live on the internet
              </h3>
              <ul className="space-y-2">
                {active.projects.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-3.5 py-2.5 transition-colors hover:border-gray-200 hover:bg-gray-50 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">
                          {p.name}
                        </span>
                        <span className="block truncate text-xs text-gray-500 dark:text-slate-400">
                          {p.note}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={`h-4 w-4 shrink-0 transition-colors ${theme.arrow}`}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ResumeTailor;
