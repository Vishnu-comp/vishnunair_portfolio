import React from "react";
import { cx } from "../utils/theme";

/**
 * Hand-drawn "doodle" background decorations.
 *
 * A set of wobbly, stroke-only SVG marks (stars, squiggles, spirals, arrows,
 * { } …) scattered at low opacity behind section content. They follow the
 * theme — muted blue on white, warm gold on black — and drift/twinkle gently
 * (the global prefers-reduced-motion rule disables that automatically).
 *
 * `DoodleField` renders a preset layout; `variant` picks which one, and
 * `className` lets a section drop it behind content (e.g. "-z-10").
 *
 * Decorative only: pointer-events-none + aria-hidden, and .no-print keeps
 * them out of the printed card.
 */

const DOODLE_PATHS = {
  star: [
    "M12 2.6 C 12.7 8, 13.6 9.7, 21.4 12 C 13.6 14.3, 12.7 16, 12 21.4 C 11.3 16, 10.4 14.3, 2.6 12 C 10.4 9.7, 11.3 8, 12 2.6 Z",
  ],
  squiggle: [
    "M2 16 C 8 5, 14 5, 20 14 C 26 23, 33 23, 38 12 C 41 6, 44 6, 46 9",
  ],
  spiral: [
    "M14 14.5 C 15.5 13, 17.5 14.5, 16.5 16.5 C 15 19.5, 10.5 18.5, 8.5 15 C 6 10.5, 10 5.5, 15 6 C 21 6.7, 24 13, 21.5 18",
  ],
  arrow: [
    "M3 17 C 9 8, 17 6, 25 9.5",
    "M20.5 6 L 25.5 9.5 L 21.5 14",
  ],
  cross: [
    "M5.5 9.5 C 9.5 8.5, 14.5 14.5, 18.5 13.5",
    "M13.5 5 C 12.5 9, 16.5 13.5, 15.5 18.5",
  ],
  circle: [
    "M12.5 3.5 C 17.5 3, 21.5 7.5, 21 12 C 20.5 16.5, 16 20.5, 11 20 C 6 19.5, 2.5 15, 3.5 10 C 4.3 6, 8 4, 12.5 3.5",
  ],
  zigzag: ["M2 17 L 7.5 8 L 12.5 17 L 17.5 8 L 22.5 17"],
  braces: [
    "M9.5 3.5 C 7 3.5, 7.5 6, 7 8 C 6.5 10, 5 10.5, 3 12 C 5 13.5, 6.5 14, 7 16 C 7.5 18, 7 20.5, 9.5 20.5",
    "M16.5 3.5 C 19 3.5, 18.5 6, 19 8 C 19.5 10, 21 10.5, 23 12 C 21 13.5, 19.5 14, 19 16 C 18.5 18, 19 20.5, 16.5 20.5",
  ],
  slash: [
    "M8.5 6 L 3.5 12 L 8.5 18",
    "M17.5 6 L 22.5 12 L 17.5 18",
    "M14 4.5 L 12 19.5",
  ],
};

const DOODLE_VIEWBOX = {
  star: "0 0 24 24",
  squiggle: "0 0 48 24",
  spiral: "0 0 28 28",
  arrow: "0 0 30 24",
  cross: "0 0 24 24",
  circle: "0 0 24 24",
  zigzag: "0 0 26 22",
  braces: "0 0 26 24",
  slash: "0 0 26 24",
};

/** One hand-drawn mark. `draw` self-animates the strokes on first render. */
export const Doodle = ({ name, className = "", style, draw = false, delay = 0 }) => {
  const paths = DOODLE_PATHS[name];
  if (!paths) return null;

  return (
    <svg
      viewBox={DOODLE_VIEWBOX[name]}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={draw ? 1 : undefined}
          style={
            draw
              ? {
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animationDelay: `${delay + i * 0.35}s`,
                }
              : undefined
          }
          className={draw ? "animate-doodle-draw" : undefined}
        />
      ))}
    </svg>
  );
};

/**
 * Preset scatter layouts. Every entry: doodle name + positioning classes.
 * Percentages keep the scatter proportional on any screen size.
 */
const FIELDS = [
  // 0 — hero (the showpiece: most marks, two self-drawing strokes)
  [
    { name: "star", cls: "left-[5%] top-[16%] w-7 animate-doodle-float" },
    { name: "squiggle", cls: "left-[1%] top-[44%] w-24", draw: true, delay: 0.25 },
    { name: "circle", cls: "left-[9%] top-[8%] w-8 animate-doodle-twinkle" },
    { name: "arrow", cls: "left-[13%] bottom-[14%] w-14 rotate-6", draw: true, delay: 0.8 },
    { name: "spiral", cls: "right-[6%] top-[18%] w-10 animate-doodle-float-slow" },
    { name: "braces", cls: "right-[10%] bottom-[12%] w-9 animate-doodle-float-delayed" },
    { name: "cross", cls: "right-[3%] top-[56%] w-6 animate-doodle-twinkle-fast" },
    { name: "zigzag", cls: "right-[32%] bottom-[7%] w-14 -rotate-6 animate-doodle-float" },
    { name: "slash", cls: "right-[18%] top-[6%] w-8 animate-doodle-float-delayed" },
    { name: "star", cls: "left-[38%] top-[7%] w-4 animate-doodle-twinkle text-blue-600/35 dark:text-gold-400/45" },
    { name: "star", cls: "right-[42%] bottom-[12%] w-5 hidden md:block animate-doodle-twinkle-fast" },
  ],
  // 1 — calm (education, achievements)
  [
    { name: "star", cls: "left-[3%] top-[14%] w-6 animate-doodle-twinkle" },
    { name: "squiggle", cls: "right-[4%] top-[30%] w-20 rotate-12 animate-doodle-float" },
    { name: "cross", cls: "left-[6%] top-[68%] w-5 animate-doodle-float-delayed" },
    { name: "circle", cls: "right-[8%] bottom-[12%] w-8 animate-doodle-float-slow" },
    { name: "zigzag", cls: "left-[32%] top-[6%] w-12 rotate-3 hidden sm:block animate-doodle-float" },
  ],
  // 2 — codey (internship, contact)
  [
    { name: "braces", cls: "left-[3%] top-[22%] w-8 animate-doodle-float" },
    { name: "star", cls: "right-[5%] top-[14%] w-6 animate-doodle-twinkle" },
    { name: "spiral", cls: "left-[7%] bottom-[14%] w-9 animate-doodle-float-slow" },
    { name: "squiggle", cls: "right-[9%] bottom-[20%] w-16 -rotate-6 animate-doodle-float-delayed" },
    { name: "cross", cls: "right-[30%] top-[8%] w-5 hidden sm:block animate-doodle-twinkle-fast" },
  ],
  // 3 — project-ish (portfolio, work)
  [
    { name: "slash", cls: "left-[4%] top-[16%] w-8 animate-doodle-float" },
    { name: "zigzag", cls: "right-[6%] top-[10%] w-12 rotate-6 animate-doodle-float-delayed" },
    { name: "star", cls: "left-[7%] bottom-[24%] w-5 animate-doodle-twinkle" },
    { name: "arrow", cls: "right-[8%] bottom-[16%] w-12 rotate-12 animate-doodle-float-slow" },
    { name: "circle", cls: "right-[30%] bottom-[8%] w-7 hidden md:block animate-doodle-twinkle-fast" },
  ],
];

/**
 * A scattered doodle layer for one section.
 *
 * The parent section must be `relative` (and usually `overflow-hidden`).
 * Pass `className="-z-10"` when the section's background is a child element
 * (it then sits between the backdrop and the content); otherwise leave it at
 * the default and make sure the section content is above (e.g. `relative z-10`).
 */
const DoodleField = ({ variant = 0, className = "" }) => (
  <div
    aria-hidden="true"
    className={cx(
      "no-print pointer-events-none absolute inset-0 overflow-hidden text-blue-600/20 dark:text-gold-400/25",
      className
    )}
  >
    {(FIELDS[variant % FIELDS.length] || []).map((d, i) => (
      <Doodle key={i} name={d.name} className={d.cls} draw={d.draw} delay={d.delay} />
    ))}
  </div>
);

export default DoodleField;
