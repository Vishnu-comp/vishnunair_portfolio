import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  THEMES,
  applyTheme,
  getInitialTheme,
  getSystemTheme,
  onThemeChange,
  cx,
} from "../utils/theme";

/**
 * Light / Dark toggle.
 *
 * - Reads the pre-paint decision made by the inline script in index.html
 *   (that script prevents the white flash before React mounts).
 * - Persists the choice to localStorage.
 * - Syncs with every other mounted toggle through the THEME_EVENT bus, so the
 *   navbar button and the mobile tab-bar button never disagree.
 * - Until the visitor makes an explicit choice, follows the OS live.
 */
function useTheme() {
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [hasStoredPreference, setHasStoredPreference] = useState(true);

  useEffect(() => {
    setTheme(getInitialTheme());
    let stored = null;
    try {
      stored = window.localStorage.getItem("vn-theme");
    } catch {
      stored = null;
    }
    setHasStoredPreference(Boolean(stored));

    // Another toggle (or the OS) changed the theme — mirror it.
    const off = onThemeChange((next) => setTheme(next));

    let offMedia = () => {};
    if (!stored && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => {
        const next = getSystemTheme();
        setTheme(next);
        applyTheme(next);
      };
      mq.addEventListener("change", onChange);
      offMedia = () => mq.removeEventListener("change", onChange);
    }

    return () => {
      off();
      offMedia();
    };
  }, []);

  const toggle = () => {
    const next = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(next);
    applyTheme(next); // also broadcasts to the other toggle
  };

  return { theme, isDark: theme === THEMES.DARK, toggle, hasStoredPreference };
}

/** Round icon button for the navbar. */
const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cx(
        "group relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full",
        "border border-gray-200 bg-white/80 text-gray-600",
        "transition-all duration-300 hover:scale-110 hover:border-blue-300 hover:text-blue-600",
        "dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-300",
        "dark:hover:border-blue-500 dark:hover:text-blue-400",
        className
      )}
    >
      <Sun
        className={cx(
          "absolute h-5 w-5 transition-all duration-500 ease-out-expo",
          isDark
            ? "translate-y-6 rotate-90 opacity-0"
            : "translate-y-0 rotate-0 opacity-100"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cx(
          "absolute h-5 w-5 transition-all duration-500 ease-out-expo",
          isDark
            ? "translate-y-0 rotate-0 opacity-100"
            : "-translate-y-6 -rotate-90 opacity-0"
        )}
        aria-hidden="true"
      />
    </button>
  );
};

/** Labelled variant sized for the mobile sticky bottom tab bar. */
export const ThemeToggleCompact = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex w-full flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
      <span aria-hidden="true">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;
