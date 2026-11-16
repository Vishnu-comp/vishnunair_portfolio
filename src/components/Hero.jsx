import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "../data/site";
import { scrollToSection } from "../hooks/useNavigation";
import PixelWord from "./PixelWord";

/** Random neon pixel blocks that blink in the panel corner. */
const PixelGlitch = () => {
  const cells = Array.from({ length: 70 }, (_, i) => {
    const r = (n) => { const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x); };
    return { left: 55 + r(1) * 45, top: r(2) * 100, size: 6 + Math.floor(r(3) * 3) * 6, delay: r(4) * 2400 };
  });
  return (
    <>
      {cells.map((c, i) => (
        <span key={i} className="absolute animate-px-glitch bg-neon" style={{ left: `${c.left}%`, top: `${c.top}%`, width: c.size, height: c.size, animationDelay: `${c.delay}ms`, opacity: 0.55 }} />
      ))}
    </>
  );
};

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
    <div className="relative overflow-hidden bg-paper px-4 pb-16 pt-28 dark:bg-black sm:px-6 md:px-10 md:pt-32">
      {/* ---------- Pixel wordmark ---------- */}
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-ink/60 dark:text-slate-400">
          <span>Portfolio {new Date().getFullYear()}</span>
          <span className="hidden sm:inline">Bengaluru, India</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neon ring-2 ring-ink/10 animate-pulse" aria-hidden="true" />
            Open to work
          </span>
        </div>
        <h1 className="sr-only">{site.name}</h1>
        <PixelWord text="VISHNU" label={site.name} className="mt-5 w-full" />
      </div>

      {/* ---------- Black panel with the intro ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="relative mx-auto mt-8 flex max-w-[1400px] flex-col-reverse items-center justify-between gap-10 overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-white md:flex-row md:gap-14 md:px-14 md:py-16"
      >
        {/* neon pixel glitch corner */}
        <div className="pointer-events-none absolute inset-0 hidden opacity-60 md:block" aria-hidden="true">
          <PixelGlitch />
        </div>

        {/* ---------------- Left: copy ---------------- */}
        <div className="relative z-10 flex-1 space-y-7 text-left">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neon">
            Hi, I am Vishnu Nair
          </p>

          {/* Typewriter role line — fixed height so nothing shifts while typing */}
          <div className="h-8 md:h-10 flex items-center" aria-live="off">
            <p className="text-2xl md:text-4xl font-medium text-white truncate">
              {typedRole}
              <span
                className="ml-1 inline-block h-6 md:h-7 w-[3px] translate-y-1 rounded-full bg-neon animate-caret"
                aria-hidden="true"
              />
            </p>
          </div>
        </div>

        <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-xl">
          Building scalable, high-performance web applications with{" "}
          <span className="font-medium text-neon">React, Next.js & TypeScript</span>{" "}
          on the front end and{" "}
          <span className="font-medium text-neon">
            Java, Spring Boot Python & Node.js
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
            className="group inline-flex items-center gap-2 rounded-full bg-neon px-7 py-3.5 font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/60"
          >
            View My Work
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-neon hover:text-neon focus:outline-none focus-visible:ring-4 focus-visible:ring-neon/40"
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
            className="p-3 bg-white/10 text-white rounded-xl hover:bg-neon hover:text-ink hover:scale-110 transition-all duration-300"
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
            className="p-3 bg-white/10 text-white rounded-xl hover:bg-neon hover:text-ink hover:scale-110 transition-all duration-300"
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
            className="p-3 bg-white/10 text-white rounded-xl hover:bg-neon hover:text-ink hover:scale-110 transition-all duration-300"
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
              className="p-3 bg-white/10 text-white rounded-xl hover:bg-neon hover:text-ink hover:scale-110 transition-all duration-300"
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
          className="flex divide-x divide-white/15 pt-4"
        >
          {site.stats.map((stat, i) => (
            <div key={stat.label} className={`flex flex-col ${i === 0 ? "pr-6 md:pr-10" : "px-6 md:px-10"}`}>
              <dt className="order-2 text-xs font-medium uppercase tracking-wider text-white/60">
                {stat.label}
              </dt>
              <dd className="order-1 text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
        </div>

      {/* ---------------- Right: headshot ---------------- */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 flex justify-center items-center mb-14 md:mb-0 relative z-10"
      >
        <div className="relative w-64 sm:w-72 md:w-[22rem] aspect-square">
          {headshotFailed ? (
            /* Local monogram — the hero never shows an empty column again */
            <div
              role="img"
              aria-label={`${site.name} monogram`}
              className="relative z-10 flex w-full h-full items-center justify-center rounded-[2rem] bg-neon"
            >
              <span className="text-7xl md:text-8xl font-extrabold tracking-tight text-ink select-none">
                VN
              </span>
            </div>
          ) : (
            <img
              src="https://image2url.com/images/1758396995163-658d63fc-b4c6-4667-b54c-7a2f456cb3fe.jpg"
              decoding="async"
              onError={() => setHeadshotFailed(true)}
              alt="Professional headshot of Vishnu Nair"
              className="relative z-10 w-full h-full object-cover rounded-[2rem] border-4 border-neon"
            />
          )}
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-neon"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-current p-1">
          <span className="h-2 w-1 rounded-full bg-current animate-bounce" />
        </span>
      </motion.button>
    </motion.div>
    </div>
  );
};

export default Hero;
