import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Download, GraduationCap } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "../data/site";
import { scrollToSection } from "../hooks/useNavigation";

/**
 * Types → holds → deletes → next role. Respects prefers-reduced-motion by
 * rendering the first role statically (no animation at all).
 */
function useTypewriter(words, { typeMs = 65, deleteMs = 35, holdMs = 1700 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return undefined;
    }
    const word = words[index % words.length];
    const delay =
      phase === "typing" ? typeMs : phase === "holding" ? holdMs : deleteMs;

    const timer = setTimeout(() => {
      if (phase === "typing") {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setPhase("holding");
      } else if (phase === "holding") {
        setPhase("deleting");
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setPhase("typing");
          setIndex((i) => i + 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, phase, index, words, reduced, typeMs, deleteMs, holdMs]);

  return text;
}

const Hero = () => {
  const [headshotFailed, setHeadshotFailed] = useState(false);
  const typedRole = useTypewriter(site.roles);

  /** Click-to-chat link; hidden entirely if no number is configured. */
  const waHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        site.whatsappMessage
      )}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100/70 dark:from-slate-950 dark:via-[#0b1120] dark:to-slate-900 min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 lg:px-28 pt-28 pb-24 overflow-hidden"
    >
      {/* Decorative backdrop: dot grid + soft blobs */}
      <div className="pointer-events-none absolute inset-0 bg-dots" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" aria-hidden="true" />

      {/* ---------------- Left: copy ---------------- */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 text-left space-y-7 relative z-10"
      >
        {/* Availability pill */}
        <motion.span
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          {site.availability}
        </motion.span>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            Hi, I am{" "}
            <span className="text-blue-600 dark:text-blue-400 relative isolate">
              Vishnu Nair
              <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-200 dark:bg-blue-500/30 -z-10 transform -rotate-2"></div>
            </span>
          </h1>

          {/* Typewriter role line — fixed height so nothing shifts while typing */}
          <div className="h-8 md:h-10 flex items-center" aria-live="off">
            <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-slate-300 truncate">
              {typedRole}
              <span
                className="ml-1 inline-block h-6 md:h-7 w-[3px] translate-y-1 rounded-full bg-blue-500 dark:bg-blue-400 animate-caret"
                aria-hidden="true"
              />
            </p>
          </div>
        </div>

        <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 leading-relaxed max-w-xl">
          Building scalable, high-performance web applications with{" "}
          <span className="font-medium text-blue-600 dark:text-blue-400">React & Next.js</span>{" "}
          on the front end and{" "}
          <span className="font-medium text-blue-600 dark:text-blue-400">
            Java, Python & Node.js
          </span>{" "}
          behind it — currently engineering ride workflows at Shoffr.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToSection("#portfolio")}
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/60"
          >
            View My Work
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-7 py-3.5 font-semibold text-blue-700 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/40 dark:border-slate-700 dark:bg-slate-800/60 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-800"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
            Download Resume
          </Link>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex space-x-5 pt-2"
        >
          <a
            href={`mailto:${site.email}`}
            aria-label="Email Vishnu Nair"
            title="Email"
            className="p-3 bg-white dark:bg-slate-800 dark:text-slate-200 shadow-md rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 hover:scale-110 transition-all duration-300"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>

          <a
            href="https://github.com/Vishnu-comp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vishnu Nair on GitHub"
            title="GitHub"
            className="p-3 bg-white dark:bg-slate-800 dark:text-slate-200 shadow-md rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 hover:scale-110 transition-all duration-300"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
              />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/vishnu-nair-aa462b245/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vishnu Nair on LinkedIn"
            title="LinkedIn"
            className="p-3 bg-white dark:bg-slate-800 dark:text-slate-200 shadow-md rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 hover:scale-110 transition-all duration-300"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69s-1.69.76-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Vishnu Nair on WhatsApp"
              title="WhatsApp"
              className="p-3 bg-white dark:bg-slate-800 dark:text-slate-200 shadow-md rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-110 transition-all duration-300"
            >
              <FaWhatsapp className="w-6 h-6" aria-hidden="true" />
            </a>
          )}
        </motion.div>

        {/* Stat strip */}
        <motion.dl
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex divide-x divide-gray-200 dark:divide-slate-700/60 pt-4"
        >
          {site.stats.map((stat, i) => (
            <div key={stat.label} className={`flex flex-col ${i === 0 ? "pr-6 md:pr-10" : "px-6 md:px-10"}`}>
              <dt className="order-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-slate-400">
                {stat.label}
              </dt>
              <dd className="order-1 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* ---------------- Right: headshot ---------------- */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 flex justify-center items-center mb-14 md:mb-0 relative z-10"
      >
        <div className="relative w-72 md:w-[26rem] aspect-square">
          {/* Rotating gradient ring */}
          <div
            className="absolute -inset-4 rounded-full bg-[conic-gradient(from_0deg,#3b82f6,#818cf8,#38bdf8,#3b82f6)] opacity-25 dark:opacity-20 blur-md animate-spin-slow"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/25 rounded-full animate-pulse" aria-hidden="true" />

          {headshotFailed ? (
            /* Local monogram — the hero never shows an empty column again */
            <div
              role="img"
              aria-label={`${site.name} monogram`}
              className="relative z-10 flex w-full h-full items-center justify-center rounded-full border-8 border-white dark:border-slate-700 shadow-2xl shadow-blue-500/10 bg-gradient-to-br from-blue-500 to-blue-700"
            >
              <span className="text-7xl md:text-8xl font-extrabold tracking-tight text-white select-none">
                VN
              </span>
            </div>
          ) : (
            <img
              src="https://image2url.com/images/1758396995163-658d63fc-b4c6-4667-b54c-7a2f456cb3fe.jpg"
              decoding="async"
              onError={() => setHeadshotFailed(true)}
              alt="Professional headshot of Vishnu Nair"
              className="relative z-10 w-full h-full object-cover rounded-full border-8 border-white dark:border-slate-700 shadow-2xl shadow-blue-500/10"
            />
          )}

          {/* Floating credential card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="absolute -left-3 bottom-10 md:-left-12 z-20 animate-float"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white/95 px-4 py-3 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/95 dark:shadow-black/30">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                <Briefcase className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-gray-900 dark:text-white">
                  {site.currentRole.title}
                </span>
                <span className="block text-xs text-gray-500 dark:text-slate-400">
                  {site.currentRole.org}
                </span>
              </span>
            </div>
          </motion.div>

          {/* Floating education chip */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="absolute -right-2 top-8 md:-right-8 z-20 animate-float-delayed"
          >
            <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white/95 px-4 py-2 shadow-lg shadow-slate-900/10 backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/95 dark:shadow-black/30">
              <GraduationCap className="h-4 w-4 text-blue-500 dark:text-blue-400" aria-hidden="true" />
              <span className="text-xs font-semibold text-gray-700 dark:text-slate-200">
                {site.educationChip}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("#education")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label="Scroll to education section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-current p-1">
          <span className="h-2 w-1 rounded-full bg-current animate-bounce" />
        </span>
      </motion.button>
    </motion.div>
  );
};

export default Hero;
