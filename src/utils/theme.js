/**
 * Dark-mode plumbing.
 *
 * The initial theme is applied by an inline script in public/index.html BEFORE
 * the bundle loads (see the "Prevent FOUC" block) so there is no white flash on
 * first paint. This module owns everything that happens after React mounts.
 */

export const THEME_KEY = "vn-theme";
export const THEMES = { LIGHT: "light", DARK: "dark" };
/** Fired after any toggle changes the theme so every control stays in sync. */
export const THEME_EVENT = "vn-theme-change";

const getRoot = () =>
  typeof document !== "undefined" ? document.documentElement : null;

export function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return THEMES.LIGHT;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

/** Theme currently painted on <html> — the source of truth, not localStorage. */
export function getInitialTheme() {
  const root = getRoot();
  if (root && root.classList.contains("dark")) return THEMES.DARK;
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === THEMES.DARK || stored === THEMES.LIGHT) return stored;
  } catch {
    /* private mode / storage disabled */
  }
  return getSystemTheme();
}

export function applyTheme(theme) {
  const root = getRoot();
  if (!root) return;
  root.classList.toggle("dark", theme === THEMES.DARK);
  // Keeps browser UI (scrollbars, form controls, PDF embeds) in sync.
  root.style.colorScheme = theme === THEMES.DARK ? "dark" : "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === THEMES.DARK ? "#0b1120" : "#ffffff");
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
  // Notify every mounted ThemeToggle (navbar + mobile tab bar).
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

/** Subscribe to theme changes coming from any other toggle. Returns cleanup. */
export function onThemeChange(handler) {
  if (typeof window === "undefined") return () => {};
  const listener = (e) => handler(e.detail);
  window.addEventListener(THEME_EVENT, listener);
  return () => window.removeEventListener(THEME_EVENT, listener);
}

/** Tiny classnames helper — avoids pulling in a dependency for `clsx`. */
export const cx = (...parts) => parts.filter(Boolean).join(" ");
