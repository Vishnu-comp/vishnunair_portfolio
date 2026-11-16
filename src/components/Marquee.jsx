import React from "react";
import { site } from "../data/site";

/** Infinite horizontal ticker of the stack, between hero and first section. */
const WORDS = [
  "React", "Next.js", "TypeScript", "Java", "Spring Boot", "Node.js", "MySQL",
  "MongoDB", "Tailwind CSS", "Python", "Docker", "Express",
];

const Marquee = () => {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="no-print overflow-hidden border-y border-ink/15 bg-neon py-4 text-ink" aria-label={`${site.name}'s stack`}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-2xl font-medium tracking-tight md:text-4xl">
        {row.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            {w}
            <span className="inline-block h-3 w-3 bg-ink" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
