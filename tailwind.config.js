/** @type {import('tailwindcss').Config} */
module.exports = {
  // Class strategy lets the ThemeToggle flip `document.documentElement.classList`
  // and every `dark:` variant below reacts instantly (no page reload).
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add your custom font here
      },
      colors: {
        // Single source of truth for the dark surface palette so every
        // component stays consistent instead of hand-picking slate shades.
        surface: {
          DEFAULT: "#0b1120",
          soft: "#111a2e",
          raised: "#16213a",
        },
      },
      keyframes: {
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
      },
      animation: {
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
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
