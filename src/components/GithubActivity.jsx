import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  GitFork,
  Github,
  RefreshCw,
  Star,
  Users,
  Flame,
  CalendarDays,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { getGithubSnapshot } from "../utils/github";
import { site } from "../data/site";
import { cx } from "../utils/theme";

/* ------------------------------------------------------------------ *
 * Contribution heatmap cell colours (light + dark aware via classes)
 * ------------------------------------------------------------------ */
function levelClass(count) {
  if (count <= 0) return "bg-slate-200/80 dark:bg-slate-700/40";
  if (count <= 2) return "bg-emerald-300 dark:bg-emerald-700";
  if (count <= 5) return "bg-emerald-400 dark:bg-emerald-600";
  if (count <= 9) return "bg-emerald-500 dark:bg-emerald-500";
  return "bg-emerald-600 dark:bg-emerald-400";
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function StatCard({ icon: Icon, label, value, accent = "text-blue-600" }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm transition-colors dark:border-slate-700/60 dark:bg-slate-800/50">
      <span
        className={cx(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700/60",
          accent
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          {value}
        </p>
        <p className="mt-1 truncate text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-slate-400">
          {label}
        </p>
      </div>
    </div>
  );
}

function ContributionGraph({ grid }) {
  // Label a week column with its month when the month changes.
  const monthLabels = useMemo(() => {
    let last = null;
    return grid.weeks.map((week) => {
      const month = new Date(week[0].ts).getUTCMonth();
      if (month !== last) {
        last = month;
        return MONTHS[month];
      }
      return "";
    });
  }, [grid.weeks]);

  const maxCount = useMemo(
    () =>
      grid.weeks.reduce(
        (max, week) => week.reduce((m, d) => Math.max(m, d.count), max),
        0
      ),
    [grid.weeks]
  );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
          Contribution activity
        </h3>
        <span className="text-xs text-gray-400 dark:text-slate-500">
          last {grid.weeks.length} weeks
        </span>
      </div>

      {/* Horizontal scroll on small screens keeps cells touch-friendly */}
      <div className="mt-4 overflow-x-auto pb-2 hide-scrollbar">
        <div className="inline-block min-w-full">
          <div className="flex gap-[3px] pl-0">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="w-[13px] flex-shrink-0 text-[10px] leading-4 text-gray-400 dark:text-slate-500"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="mt-1 flex gap-[3px]">
            {grid.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={
                      day.future
                        ? ""
                        : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                    }
                    aria-label={
                      day.future
                        ? undefined
                        : `${day.count} contributions on ${day.date}`
                    }
                    className={cx(
                      "h-[13px] w-[13px] rounded-[3px] transition-colors duration-200",
                      day.future
                        ? "bg-transparent"
                        : cx(levelClass(day.count), "hover:ring-2 hover:ring-blue-400")
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 dark:text-slate-400">
        <span>
          {grid.totalContributions} contributions in the public feed
          {maxCount > 0 && ` · busiest day: ${maxCount}`}
          {" · "}
          private company work at Shoffr isn't counted here
        </span>
        <span className="flex items-center gap-1.5">
          Less
          {[0, 1, 3, 6, 10].map((n) => (
            <span
              key={n}
              className={cx("h-3 w-3 rounded-[3px]", levelClass(n))}
              aria-hidden="true"
            />
          ))}
          More
        </span>
      </div>
    </div>
  );
}

function LanguageBar({ languages, alsoWorkingWith = [] }) {
  if (!languages.length) return null;
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
          Languages across public repositories
        </h3>
        <span className="text-xs text-gray-400 dark:text-slate-500">
          share of repos by primary language
        </span>
      </div>

      <div
        className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-700/50"
        role="img"
        aria-label={languages
          .map((l) => `${l.language} ${l.percent}%`)
          .join(", ")}
      >
        {languages.map((l) => (
          <span
            key={l.language}
            className="h-full transition-all duration-500"
            style={{ width: `${l.percent}%`, backgroundColor: l.color }}
            title={`${l.language} — ${l.count} ${l.count === 1 ? "repo" : "repos"}`}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {languages.map((l) => (
          <li key={l.language} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: l.color }}
              aria-hidden="true"
            />
            <span className="font-medium text-gray-700 dark:text-slate-200">
              {l.language}
            </span>
            <span className="text-gray-400 dark:text-slate-500">
              {l.percent}%
            </span>
          </li>
        ))}
      </ul>

      {/*
        GitHub only reports one "primary language" per public repo, so
        Next.js/TypeScript/Spring Boot work done in private company repos is
        invisible above. This row keeps the picture accurate.
      */}
      {alsoWorkingWith.length > 0 && (
        <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 dark:border-slate-700/50 dark:bg-slate-800/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
            Also working with
            <span className="ml-2 font-normal normal-case tracking-normal text-gray-400 dark:text-slate-500">
              (day job &amp; frameworks GitHub folds into other languages)
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {alsoWorkingWith.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700 dark:border-slate-600 dark:bg-slate-800 dark:text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-800/50 dark:hover:border-blue-500/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="flex items-center gap-2 text-base font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          <GitBranch className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-slate-500" />
          <span className="truncate">{repo.name}</span>
        </h4>
        <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-300 transition group-hover:text-blue-500 dark:text-slate-600" />
      </div>

      {repo.description && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-slate-400">
          {repo.description}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-4 text-xs text-gray-500 dark:text-slate-400">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: repo.color }}
              aria-hidden="true"
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" /> {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" aria-hidden="true" /> {repo.forks}
        </span>
        <span className="ml-auto rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-400 dark:bg-slate-700/50 dark:text-slate-500">
          {new Date(repo.pushedAt).getFullYear()}
        </span>
      </div>
    </a>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-8" aria-hidden="true">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-3 w-28 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 rounded-2xl bg-gray-200 dark:bg-slate-700"
          />
        ))}
      </div>
      <div className="h-32 rounded-2xl bg-gray-200 dark:bg-slate-700" />
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-gray-200 dark:bg-slate-700"
          />
        ))}
      </div>
    </div>
  );
}

const GithubActivity = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (force = false) => {
    try {
      if (force) {
        setRefreshing(true);
        window.localStorage.removeItem("vn-github-cache-v1");
      } else {
        setLoading(true);
      }
      const snapshot = await getGithubSnapshot();
      setData(snapshot);
      setError(null);
    } catch (err) {
      setError(err.message || "Could not reach the GitHub API.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinedYear = data?.profile?.joined
    ? new Date(data.profile.joined).getFullYear()
    : null;

  return (
    <section
      id="github-activity"
      className="relative overflow-hidden bg-gray-50/70 py-16 md:py-24 dark:bg-slate-900/40"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <div className="flex items-center gap-3">
              <Github className="h-9 w-9 text-gray-800 dark:text-white" />
              <h2 className="text-4xl font-bold text-gray-800 md:text-5xl dark:text-white">
                GitHub Activity
              </h2>
            </div>
            <span className="mt-4 block h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
            <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-slate-400">
              Live from the GitHub API — contribution calendar, commit streaks,
              language mix and the repositories I keep coming back to.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => load(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-600 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
            >
              <RefreshCw
                className={cx("h-4 w-4", refreshing && "animate-spin")}
                aria-hidden="true"
              />
              Refresh
            </button>
            <a
              href={data?.profile?.url || site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Follow
            </a>
          </div>
        </motion.div>

        {loading && <Skeleton />}

        {!loading && error && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">GitHub stats are temporarily unavailable.</p>
              <p className="mt-1 text-sm opacity-80">
                {error} Public API calls are limited to 60/hour per visitor —
                reload in a few minutes, or{" "}
                <a
                  className="underline"
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  view my repositories directly
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {!loading && !error && data && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Profile + headline stats */}
            <div className="rounded-3xl border border-gray-100 bg-white/85 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-sm md:p-8 dark:border-slate-700/60 dark:bg-slate-900/70 dark:shadow-black/20">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <img
                  src={data.profile.avatar}
                  alt={`${data.profile.name}'s GitHub avatar`}
                  loading="lazy"
                  className="h-16 w-16 rounded-full border-4 border-white shadow-md dark:border-slate-700"
                />
                <div className="min-w-0">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {data.profile.name}
                  </p>
                  <a
                    href={data.profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    @{data.profile.login}
                  </a>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 sm:ml-auto dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {data.profile.followers} followers
                  </span>
                  {joinedYear && (
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      Coding since {joinedYear}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard
                  icon={Flame}
                  label="Current streak"
                  value={`${data.streaks.current}d`}
                  accent="text-orange-500"
                />
                <StatCard
                  icon={Flame}
                  label="Best streak"
                  value={`${data.streaks.best}d`}
                  accent="text-rose-500"
                />
                <StatCard
                  icon={GitBranch}
                  label="Public repos"
                  value={data.profile.publicRepos}
                />
                <StatCard
                  icon={Star}
                  label="Stars earned"
                  value={data.totals.stars}
                  accent="text-amber-500"
                />
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8 dark:border-slate-700/60">
                <ContributionGraph grid={data.grid} />
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8 dark:border-slate-700/60">
                <LanguageBar
                  languages={data.languages}
                  alsoWorkingWith={site.stackLanguages}
                />
              </div>
            </div>

            {/* Top repositories */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                Notable repositories
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.topRepos.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 dark:text-slate-500">
              Data fetched live from api.github.com and cached for an hour.
              Contribution counts reflect the public activity feed (last 90
              days) plus repository push history.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GithubActivity;
