/**
 * GitHub data layer for the Activity widget.
 *
 * WHY api.github.com ONLY:
 *   api.github.com returns `Access-Control-Allow-Origin: *`, so it is callable
 *   straight from the browser. github.com HTML, ghchart.rshah.org and the
 *   github-contributions-api all fail CORS (or are unreachable), which is why
 *   nothing here scrapes them.
 *
 * Rate limit: 60 requests/hour per IP when unauthenticated. This module makes
 *   exactly 3 requests and then caches the result in localStorage for
 *   CACHE_TTL_MS, so repeat visitors cost GitHub nothing.
 *
 * Optional: set REACT_APP_GITHUB_TOKEN in a .env file to raise the limit to
 * 5,000/hour. The token stays in the client bundle, so use a read-only,
 * public-data-only token (or a fine-grained one with no repo permissions).
 */

import { site } from "../data/site";

const API = "https://api.github.com";
const CACHE_KEY = "vn-github-cache-v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const WEEKS = 26; // ~6 months of heatmap, matches GitHub's default view
const DAY_MS = 24 * 60 * 60 * 1000;

/** GitHub's own language colours, so the breakdown looks native. */
export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  JSX: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  SQL: "#e38c00",
  PLSQL: "#dad8d8",
  R: "#198CE7",
  "Jupyter Notebook": "#DA5B0B",
  XSLT: "#EB8CEB",
  Dockerfile: "#384d54",
  Vue: "#41b883",
  MDX: "#fcb32c",
  Markdown: "#083fa1",
};

export const colorFor = (lang) => LANGUAGE_COLORS[lang] || "#94a3b8";

function toUTCDate(iso) {
  const d = new Date(iso);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function isoDay(ts) {
  return new Date(ts).toISOString().slice(0, 10);
}

async function gh(path) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "vishnunair-portfolio",
  };
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) {
    const limited = res.status === 403 || res.status === 429;
    throw new Error(
      limited
        ? "GitHub rate limit reached — showing cached data shortly."
        : `GitHub API responded ${res.status}`
    );
  }
  return res.json();
}

function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.savedAt !== "number") return null;
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...data, savedAt: Date.now() })
    );
  } catch {
    /* storage full or disabled — widget still works, just re-fetches */
  }
}

/** Stale data (past TTL) — used as a graceful fallback when the API fails. */
function readStaleCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Derived stats
 * ------------------------------------------------------------------ */

/**
 * Build a GitHub-style contribution calendar.
 *
 * Sources, in order of precision:
 *   1. /events/public  — real per-day activity (last ~90 days, max 300 events).
 *      PushEvents carry payload.size = number of commits pushed.
 *   2. repo.pushed_at  — marks days where a repo was pushed but the event has
 *      already aged out of the feed, so old weeks aren't misleadingly empty.
 *
 * The grid ends on the current week and starts on the Sunday WEEKS back,
 * exactly like github.com.
 */
export function buildContributionGrid(events = [], repos = []) {
  const today = new Date();
  const todayUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );

  // Roll back to the Sunday that starts the current week.
  const startOfWeek = todayUTC - new Date(todayUTC).getUTCDay() * DAY_MS;
  const start = startOfWeek - (WEEKS - 1) * 7 * DAY_MS;

  const counts = new Map();
  const add = (iso, amount) => {
    if (!iso) return;
    const ts = toUTCDate(iso);
    if (ts < start || ts > todayUTC) return;
    counts.set(ts, (counts.get(ts) || 0) + amount);
  };

  let totalContributions = 0;
  events.forEach((e) => {
    const weight = e.type === "PushEvent" ? e.payload?.size || 1 : 1;
    totalContributions += weight;
    add(e.created_at, weight);
  });

  repos.forEach((r) => add(r.pushed_at, 1));

  // Assemble columns (weeks) of 7 days each.
  const weeks = [];
  for (let w = 0; w < WEEKS; w += 1) {
    const days = [];
    for (let d = 0; d < 7; d += 1) {
      const ts = start + (w * 7 + d) * DAY_MS;
      const inFuture = ts > todayUTC;
      days.push({
        date: isoDay(ts),
        ts,
        count: inFuture ? 0 : counts.get(ts) || 0,
        future: inFuture,
      });
    }
    weeks.push(days);
  }

  return { weeks, start, end: todayUTC, totalContributions };
}

/**
 * Current streak = consecutive active days ending today or yesterday
 * (GitHub keeps a streak alive until the day is over).
 * Best streak = longest run anywhere in the observable window.
 */
export function computeStreaks(grid) {
  const active = new Set();
  grid.weeks.forEach((week) =>
    week.forEach((day) => {
      if (!day.future && day.count > 0) active.add(day.ts);
    })
  );

  let current = 0;
  let cursor = grid.end;
  if (!active.has(cursor)) cursor -= DAY_MS; // today not started yet
  while (active.has(cursor)) {
    current += 1;
    cursor -= DAY_MS;
  }

  let best = 0;
  let run = 0;
  for (let ts = grid.start; ts <= grid.end; ts += DAY_MS) {
    if (active.has(ts)) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 0;
    }
  }

  return { current, best, activeDays: active.size };
}

/** Aggregate primary language across all non-fork repos. */
export function buildLanguageBreakdown(repos = []) {
  const totals = new Map();
  repos
    .filter((r) => !r.fork)
    .forEach((r) => {
      if (!r.language) return;
      totals.set(r.language, (totals.get(r.language) || 0) + 1);
    });

  const entries = [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);
  const sum = entries.reduce((acc, [, n]) => acc + n, 0) || 1;

  return entries.map(([language, count]) => ({
    language,
    count,
    percent: Math.round((count / sum) * 100),
    color: colorFor(language),
  }));
}

/**
 * Most notable repos: starred/forked first, then most recently pushed.
 *
 * Empty placeholder repos (created on github.com and never pushed to) are
 * filtered out — they have no code and would otherwise occupy a card.
 */
export function buildTopRepos(repos = [], limit = 6) {
  return repos
    .filter((r) => !r.fork)
    .filter((r) => (r.size || 0) >= 1) // size is in KB; 0 == empty repo
    .sort((a, b) => {
      const score = (r) => r.stargazers_count * 3 + r.forks_count * 2;
      if (score(b) !== score(a)) return score(b) - score(a);
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    })
    .slice(0, limit)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description,
      language: r.language,
      color: colorFor(r.language),
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
      isPortfolio: r.name === "vishnunair_portfolio",
    }));
}

/* ------------------------------------------------------------------ *
 * Public entry point
 * ------------------------------------------------------------------ */

export async function getGithubSnapshot(username = site.githubUsername) {
  const cached = readCache();
  if (cached) return { ...cached, fromCache: true };

  let user;
  let repos;
  let events;

  try {
    // 3 parallel requests, then cached for an hour.
    [user, repos, events] = await Promise.all([
      gh(`/users/${username}`),
      gh(`/users/${username}/repos?per_page=100&sort=pushed`),
      gh(`/users/${username}/events/public?per_page=100`).catch(() => []),
    ]);
  } catch (error) {
    const stale = readStaleCache();
    if (stale) return { ...stale, fromCache: true, stale: true };
    throw error;
  }

  const owned = (repos || []).filter((r) => !r.fork);
  const grid = buildContributionGrid(events || [], owned);
  const streaks = computeStreaks(grid);

  const snapshot = {
    username,
    profile: {
      name: user?.name || username,
      login: user?.login || username,
      avatar: user?.avatar_url,
      url: user?.html_url || `https://github.com/${username}`,
      publicRepos: user?.public_repos ?? owned.length,
      followers: user?.followers ?? 0,
      following: user?.following ?? 0,
      joined: user?.created_at,
    },
    totals: {
      stars: owned.reduce((n, r) => n + r.stargazers_count, 0),
      forks: owned.reduce((n, r) => n + r.forks_count, 0),
      contributions: grid.totalContributions,
    },
    grid,
    streaks,
    languages: buildLanguageBreakdown(owned),
    topRepos: buildTopRepos(repos || []),
  };

  writeCache(snapshot);
  return { ...snapshot, fromCache: false };
}
