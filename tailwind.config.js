/** @type {import('tailwindcss').Config} */
module.exports = {
  // Class strategy lets the ThemeToggle flip `document.documentElement.classList`
  // and every `dark:` variant below reacts instantly (no page reload).
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      borderRadius: { "2xl": "1.5rem", "3xl": "2rem" },
      fontFamily: {
        // Body text — Inter: a crisp, modern neutral that reads far better
        // on screen than the old Roboto fallback.
        sans: ["Switzer", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        // Headings / display type — Space Grotesk: geometric, slightly
        // technical character that gives the portfolio its own voice.
        display: ["Switzer", "Inter", "ui-sans-serif", "sans-serif"],
        // Code, kbd chips and the dev terminal easter egg.
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        // Single source of truth for the dark surface palette so every
        // component stays consistent instead of hand-picking slate shades.
        // Dark mode is a true BLACK theme (not navy).
        surface: {
          DEFAULT: "#000000",
          soft: "#0a0a0a",
          raised: "#161616",
        },
        // The dark UI is built on the `slate-*` scale (always via dark:
        // variants), so remap it to a pure neutral/black scale here — one
        // change re-points every dark surface, border and muted text in the
        // app from navy to black without touching the components.
        slate: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        // Dark-mode accent: warm cream→bronze gold. Anchored on the exact
        // gradient stops used by `bg-gold-gradient` (#fff3ca / #bb985b).
        gold: {
          50: "#f7ffe2",
          100: "#eaffb8",
          200: "#dcff8f",
          300: "#cdff5c",
          400: "#bdf536",
          500: "#a8e61a",
          600: "#8cc40e",
          700: "#6f9e0b",
          800: "#587d0a",
          900: "#455f0a",
        },
        // Light-mode accent scale: replaces the old blue. Light steps are warm
        // paper greys, 300-400 are the neon-green accent, 600+ is ink.
        blue: {
          50: "#f3f3f0",
          100: "#eaeae6",
          200: "#dcdcd6",
          300: "#c8f64a",
          400: "#9fdc12",
          500: "#4f9d00",
          600: "#0f1011",
          700: "#1c1d1f",
          800: "#2a2b2d",
          900: "#0f1011",
        },
        gray: {
          50: "#f7f7f5",
          100: "#efefec",
          200: "#e2e2de",
          300: "#cfcfca",
          400: "#9a9b9d",
          500: "#6b6c6f",
          600: "#4d4e51",
          700: "#35363a",
          800: "#1c1d1f",
          900: "#0f1011",
        },
        ink: "#0f1011",
        paper: "#f5f5f5",
        neon: "#c8f64a",
        ember: "#ff6a2b",
      },
      backgroundImage: {
        // The dark-mode accent gradient (used as bg + gradient text).
        "gold-gradient": "linear-gradient(127.56deg, #dcff8f -6.75%, #9be000 105.89%)",
      },
      keyframes: {
        pxIn: { from: { opacity: "0", transform: "scale(0.2)" }, to: { opacity: "1", transform: "scale(1)" } },
        pxGlitch: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.15" } },
        // Referenced by ContactForm.jsx background blobs — this keyframe was
        // previously undefined, so `animate-blob` silently did nothing.
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-9px)" },
        },
        caret: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        // Doodle background marks: gentle drift + twinkle. The float keyframe
        // re-applies the Tailwind rotate var so `rotate-*` utilities survive
        // the animation (a plain transform would override them).
        doodleFloat: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--tw-rotate, 0deg))" },
          "50%": { transform: "translateY(-7px) rotate(var(--tw-rotate, 0deg))" },
        },
        doodleTwinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        // Strokes draw themselves in (pairs with pathLength=1 on the path).
        doodleDraw: {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "px-in": "pxIn 0.5s steps(3, end) both",
        "px-glitch": "pxGlitch 2.4s steps(2, end) infinite",
        blob: "blob 9s ease-in-out infinite",
        // Stagger helpers so the two blobs don't move in lockstep.
        "delay-2000": "blob 9s ease-in-out 2s infinite",
        "delay-4000": "blob 9s ease-in-out 4s infinite",
        // Hero: floating credential cards over the headshot.
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 1.2s infinite",
        // Hero: slow-rotating gradient ring behind the headshot.
        "spin-slow": "spin 16s linear infinite",
        // Hero: typewriter caret.
        caret: "caret 1.1s steps(2, start) infinite",
        // Doodle background marks (negative delays desync the loops so the
        // scatter never moves in lockstep).
        "doodle-float": "doodleFloat 7s ease-in-out infinite",
        "doodle-float-delayed": "doodleFloat 8.5s ease-in-out -2.5s infinite",
        "doodle-float-slow": "doodleFloat 10.5s ease-in-out -4s infinite",
        "doodle-twinkle": "doodleTwinkle 3.4s ease-in-out infinite",
        "doodle-twinkle-fast": "doodleTwinkle 2.2s ease-in-out -0.8s infinite",
        "doodle-draw": "doodleDraw 1.3s ease-out forwards",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
