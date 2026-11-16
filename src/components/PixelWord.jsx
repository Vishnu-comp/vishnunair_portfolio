import React, { useMemo } from "react";

/**
 * Chunky pixel lettering built from a 5x7 bitmap font. Each lit cell is a
 * square that pops in on a staggered delay, so the word "assembles" itself.
 * A few cells are tinted neon green for a glitch feel. Fully decorative when
 * `label` is given the wrapper exposes it as an accessible image name.
 */
const GLYPHS = {
  V: ["10001", "10001", "10001", "10001", "01010", "01010", "00100"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10101", "10011", "10001", "10001"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
};

// Tiny deterministic PRNG so server/client and re-renders agree.
const rand = (n) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const PixelWord = ({ text, label, className = "" }) => {
  const cells = useMemo(() => {
    const out = [];
    let col = 0;
    [...text.toUpperCase()].forEach((ch, li) => {
      const g = GLYPHS[ch];
      if (!g) {
        col += 3;
        return;
      }
      g.forEach((row, y) =>
        [...row].forEach((v, x) => {
          if (v === "1") {
            const id = li * 100 + y * 5 + x;
            out.push({
              x: col + x,
              y,
              delay: Math.round(rand(id) * 900),
              neon: rand(id + 7) > 0.9,
            });
          }
        })
      );
      col += 6;
    });
    return { list: out, width: col - 1 };
  }, [text]);

  return (
    <svg
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      viewBox={`0 0 ${cells.width} 7`}
      className={className}
      shapeRendering="crispEdges"
    >
      {cells.list.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x + 0.04}
          y={c.y + 0.04}
          width="0.92"
          height="0.92"
          className={`animate-px-in ${c.neon ? "fill-neon" : "fill-ink dark:fill-white"}`}
          style={{ animationDelay: `${c.delay}ms`, transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
};

export default PixelWord;
