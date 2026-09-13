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
      },
      animation: {
        blob: "blob 9s ease-in-out infinite",
        // Stagger helpers so the two blobs don't move in lockstep.
        "delay-2000": "blob 9s ease-in-out 2s infinite",
        "delay-4000": "blob 9s ease-in-out 4s infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
