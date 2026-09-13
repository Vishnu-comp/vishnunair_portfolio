import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { navItems, site } from "../data/site";
import {
  useSectionNavigation,
  useScrollSpy,
  useScrolled,
} from "../hooks/useNavigation";
import ThemeToggle from "./ThemeToggle";
import { cx } from "../utils/theme";

/** Section anchors only (routes like /work can't be scroll-spied).
 *  Defined at module scope so useScrollSpy's dependency array stays stable —
 *  building it inside the component would re-subscribe on every render. */
const SPY_SELECTORS = navItems
  .filter((i) => !i.isRoute)
  .map((i) => i.href);

const linkBase =
  "relative px-1 py-1 text-sm font-medium transition-colors duration-300 lg:text-base";

const NavLink = ({ item, isActive, onNavigate }) => {
  const { goTo } = onNavigate;

  const content = (
    <>
      {item.label}
      {/* Animated underline: full-width + blue when active, grows on hover */}
      <span
        className={cx(
          "absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 ease-out-expo dark:bg-blue-400",
          isActive ? "w-full opacity-100" : "w-0 opacity-0"
        )}
        aria-hidden="true"
      />
    </>
  );

  const className = cx(
    linkBase,
    isActive
      ? "text-blue-600 dark:text-blue-400"
      : "text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
  );

  if (item.isRoute) {
    return (
      <Link
        to={item.href}
        className={className}
        aria-current={isActive ? "page" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => goTo(item)}
      className={className}
      aria-current={isActive ? "true" : undefined}
    >
      {content}
    </button>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = useSectionNavigation();
  const { pathname } = navigation;

  const isHome = pathname === "/";
  // Scroll-spy only makes sense on the home page where the sections exist.
  const activeSection = useScrollSpy(SPY_SELECTORS, isHome);
  const scrolled = useScrolled(24);
  const activeRoute = pathname;

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  const isActive = (item) =>
    item.isRoute ? activeRoute === item.href : isHome && activeSection === item.href;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      aria-label="Main"
      className={cx(
        "no-print fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300 ease-out-expo",
        scrolled
          ? "border-gray-200/70 bg-white/90 py-2 shadow-lg shadow-slate-900/5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85 dark:shadow-black/20"
          : "border-transparent bg-white/70 py-4 backdrop-blur-md dark:bg-slate-950/60"
      )}
    >
      <div className="container mx-auto flex min-h-[3.5rem] items-center justify-between px-4">
        {/* Logo — shrinks slightly once scrolled.
            flex-shrink-0 + a local src guarantee the mark always occupies its
            left slot at a stable size, even while other assets load. */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          aria-label={`${site.name} — home`}
          className="flex flex-shrink-0 items-center transition-transform duration-300 hover:scale-105"
        >
          <img
            src={site.logo}
            decoding="async"
            width="48"
            height="48"
            alt={`${site.name} logo`}
            className={cx(
              "w-auto transition-all duration-300",
              scrolled ? "h-9" : "h-12"
            )}
          />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center space-x-5 lg:flex xl:space-x-7">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink item={item} isActive={isActive(item)} onNavigate={navigation} />
            </li>
          ))}
        </ul>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            to="/resume"
            onClick={closeMobileMenu}
            className={cx(
              "hidden items-center gap-2 rounded-full bg-blue-600 font-semibold text-white transition-all duration-300",
              "hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg sm:inline-flex",
              scrolled ? "px-4 py-1.5 text-sm" : "px-6 py-2 text-base"
            )}
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Resume
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50 lg:hidden dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Tap-outside backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 top-full z-40 bg-slate-900/30 backdrop-blur-[2px] lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 border-t border-gray-100 bg-white/95 shadow-xl backdrop-blur-md lg:hidden dark:border-slate-800 dark:bg-slate-950/95"
            >
              <ul className="max-h-[70vh] space-y-1 overflow-y-auto px-4 py-4">
                {navItems.map((item) => {
                  const active = isActive(item);
                  const cls = cx(
                    "block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200",
                    active
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  );
                  return (
                    <li key={item.href}>
                      {item.isRoute ? (
                        <Link to={item.href} onClick={closeMobileMenu} className={cls}>
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            navigation.goTo(item);
                            closeMobileMenu();
                          }}
                          className={cls}
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  );
                })}
                <li className="pt-2">
                  <Link
                    to="/resume"
                    onClick={closeMobileMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Resume
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
