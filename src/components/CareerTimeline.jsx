import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { GraduationCap, Briefcase, MapPin, Check, Sparkles } from "lucide-react";
import { site } from "../data/site";
import { cx } from "../utils/theme";

/**
 * Scrollytelling career timeline.
 *
 * A single scroll-driven narrative replaces the old flat Education +
 * Internship cards:
 *   - the centre line DRAWS ITSELF as you scroll (scaleY bound to scroll
 *     progress through the section),
 *   - a sticky status chip with an SVG progress ring tracks which era you're
 *     reading and how far through the journey you are,
 *   - milestone dots ignite (and the current role pulses) as they enter view,
 *   - cards alternate left/right on desktop, single column on mobile.
 */
const CareerTimeline = () => {
  const sectionRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [percent, setPercent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = site.journey.length;
    setStage(Math.max(0, Math.min(n - 1, Math.floor(v * n))));
    setPercent(Math.round(Math.max(0, Math.min(1, v)) * 100));
  });

  const current = site.journey[stage];

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-white py-24 dark:bg-[#0b1120]"
    >
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-500/8" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-500/8" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 md:text-5xl dark:text-white">
            The Journey
          </h2>
          <span className="mx-auto mt-4 block h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-slate-400">
            Four chapters, one direction: from first C program to shipping
            product at scale. Scroll — the line draws itself.
          </p>
        </motion.div>

        {/* Sticky progress chip */}
        <div className="pointer-events-none sticky top-24 z-10 mt-10 flex justify-center md:justify-end">
          <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white/90 py-2 pl-2 pr-4 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/90 dark:shadow-black/20">
            <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15" fill="none" strokeWidth="4" className="stroke-gray-200 dark:stroke-slate-700" />
              <motion.circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="#3b82f6"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                {percent}% through the story
              </p>
              <p className="text-sm font-bold text-gray-800 dark:text-slate-100">
                {current.period.split("–")[0].trim()} · {current.kind === "education" ? current.org.split("(")[0].trim() : current.org.split("—")[0].trim()}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-6 max-w-5xl">
          {/* track + drawn progress line */}
          <div className="absolute bottom-0 left-[19px] top-0 w-px -translate-x-1/2 bg-gray-200 dark:bg-slate-700/60" aria-hidden="true" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-0 left-[19px] top-0 w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700"
            aria-hidden="true"
          />

          {site.journey.map((m, i) => {
            const Icon = m.kind === "education" ? GraduationCap : Briefcase;
            const right = i % 2 === 1;
            return (
              <div key={m.title} className="relative pb-14 last:pb-0 md:grid md:grid-cols-2 md:gap-16">
                {/* node dot */}
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={cx(
                    "absolute left-[19px] top-2 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-white dark:ring-[#0b1120]",
                    m.current ? "bg-emerald-500" : "bg-blue-500"
                  )}
                >
                  {m.current && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  )}
                </motion.span>

                {/* card */}
                <motion.article
                  initial={{ opacity: 0, x: right ? 40 : -40, y: 12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={cx(
                    "ml-12 md:ml-0",
                    right ? "md:col-start-2" : "md:col-start-1"
                  )}
                >
                  <div className="group rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/70 dark:shadow-black/20 dark:hover:border-blue-500/40">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cx(
                          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                          m.kind === "education"
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400"
                            : "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-slate-800 dark:text-slate-300">
                        {m.period}
                      </span>
                      {m.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          Right now
                        </span>
                      )}
                      {m.score && (
                        <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                          {m.score}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {m.title}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600 dark:text-slate-400">
                      <span className="font-medium">{m.org}</span>
                      <span className="inline-flex items-center gap-1 text-gray-400 dark:text-slate-500">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {m.location}
                      </span>
                    </p>
                    <p className="mt-3 text-sm italic text-gray-500 dark:text-slate-500">
                      {m.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-slate-300">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                            <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {m.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1 text-xs font-medium text-blue-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-blue-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
