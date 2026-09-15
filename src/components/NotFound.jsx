import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import useSeo from "../hooks/useSeo";

/**
 * Catch-all route. Previously any typo'd URL rendered the navbar above a
 * completely blank white page with no way back.
 */
const NotFound = () => {
  useSeo({
    title: "Page not found — Vishnu Nair",
    description: "The page you followed does not exist. Return to the portfolio home.",
    path: "/404",
    robots: "noindex, follow",
  });

  return (
  <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50/40 px-6 pt-24 pb-32 text-center dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg"
    >
      <p className="text-7xl font-extrabold tracking-tight text-blue-600 md:text-8xl dark:bg-gold-gradient dark:bg-clip-text dark:text-transparent">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
        This page took a wrong turn.
      </h1>
      <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-slate-400">
        The link you followed may be broken, or the page may have moved. Let's
        get you back to something useful.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-gold-gradient dark:text-black dark:shadow-gold-500/25"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          Back to home
        </Link>
        <Link
          to="/resume"
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-6 py-3 font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:text-gold-200 dark:hover:border-gold-500"
        >
          <Compass className="h-5 w-5" aria-hidden="true" />
          View my resume
        </Link>
      </div>
    </motion.div>
  </main>
  );
};

export default NotFound;
