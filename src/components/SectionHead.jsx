import React from "react";
import { motion } from "framer-motion";

/**
 * Cosmos-style section opener: a small numbered tag row, then a huge
 * lower-case-feeling display title that slides up when scrolled into view.
 */
const SectionHead = ({ n, tag, title, sub, dark = false }) => (
  <div className="mb-10 md:mb-16">
    <div
      className={`flex items-center gap-3 border-t pt-4 text-xs font-medium uppercase tracking-[0.2em] ${
        dark ? "border-white/20 text-white/60" : "border-ink/20 text-ink/60"
      }`}
    >
      <span className="inline-block h-2.5 w-2.5 bg-neon" aria-hidden="true" />
      <span>{n}</span>
      <span>/</span>
      <span>{tag}</span>
    </div>
    <div className="overflow-hidden">
      <motion.h2
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="cosmos-title mt-6 font-display text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.92] tracking-[-0.05em]"
      >
        {title}
      </motion.h2>
    </div>
    {sub && (
      <p className={`mt-6 max-w-2xl text-lg ${dark ? "text-white/70" : "text-ink/65"}`}>{sub}</p>
    )}
  </div>
);

export default SectionHead;
