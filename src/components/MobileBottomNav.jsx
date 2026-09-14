import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, FolderKanban, Briefcase, Github, Mail } from "lucide-react";
import { mobileNavItems } from "../data/site";
import { useSectionNavigation, useScrollSpy } from "../hooks/useNavigation";
import { ThemeToggleCompact } from "./ThemeToggle";
import { cx } from "../utils/theme";

const ICONS = {
  "#hero": Home,
  "#portfolio": FolderKanban,
  "/work": Briefcase,
  "#github": Github,
  "#whyhireme": Mail,
};

const SPY_SELECTORS = ["#hero", "#portfolio", "#github", "#whyhireme"];

/**
 * Sticky bottom tab bar, mobile only (hidden from md up).
 *
 * Reaches the five things a phone visitor actually wants without opening the
 * hamburger menu, and includes the theme toggle so dark mode is one tap away
 * on mobile too. Lifted above the home-indicator area with env(safe-area-*).
 */
const MobileBottomNav = () => {
  const { goTo, pathname } = useSectionNavigation();
  const active = useScrollSpy(SPY_SELECTORS, pathname === "/");

  return (
    <nav
      aria-label="Mobile"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-gray-200/80 bg-white/95 backdrop-blur-lg md:hidden dark:border-slate-700/70 dark:bg-slate-900/95"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="flex items-stretch justify-around px-1 py-1.5">
        {mobileNavItems.map((item) => {
          const Icon = ICONS[item.href] || Home;
          const isActive = item.isRoute
            ? pathname === item.href
            : pathname === "/" && active === item.href;

          const classes = cx(
            "relative flex w-full flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors duration-200",
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
          );

          return (
            <li key={item.href} className="flex-1">
              {item.isRoute ? (
                <Link
                  to={item.href}
                  className={classes}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="mobile-tab-dot"
                      className="absolute -top-0.5 h-1 w-1 rounded-full bg-blue-500"
                    />
                  )}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(item)}
                  className={classes}
                  aria-current={isActive ? "true" : undefined}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="mobile-tab-dot"
                      className="absolute -top-0.5 h-1 w-1 rounded-full bg-blue-500"
                    />
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
