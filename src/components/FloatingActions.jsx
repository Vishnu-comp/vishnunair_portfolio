import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Mail,
  MessageCircle,
  Plus,
  Send,
} from "lucide-react";
import { site } from "../data/site";
import { useScrolled, useSectionNavigation } from "../hooks/useNavigation";
import { cx } from "../utils/theme";

/**
 * Floating action cluster (desktop + tablet; the mobile bottom tab bar owns
 * small screens, so this sits higher up there to avoid overlapping it).
 *
 *  • Expandable "+" -> Email, WhatsApp (only if site.whatsapp is set), Hire me
 *  • Back-to-top appears after 400px of scroll
 *
 * Everything is keyboard reachable and announces itself to screen readers.
 */
const FloatingActions = () => {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(400);
  const { goTo } = useSectionNavigation();

  const waHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        site.whatsappMessage
      )}`
    : null;

  const actions = [
    {
      key: "hire",
      label: "Hire me",
      icon: Send,
      onClick: () => {
        setOpen(false);
        goTo({ href: "#whyhireme" });
      },
    },
    {
      key: "email",
      label: "Email me",
      icon: Mail,
      href: `mailto:${site.email}`,
    },
    waHref && {
      key: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      href: waHref,
      external: true,
      accent: true,
    },
  ].filter(Boolean);

  return (
    <div className="no-print pointer-events-none fixed right-4 z-40 flex flex-col items-end gap-3 bottom-24 md:bottom-8 md:right-8">
      <AnimatePresence>
        {open &&
          actions.map((action, i) => {
            const Icon = action.icon;
            const inner = (
              <>
                <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-700 dark:text-slate-100">
                  {action.label}
                </span>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </>
            );

            const classes = cx(
              "group pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg",
              "transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/60 dark:focus-visible:ring-gold-300/50",
              action.accent
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-white text-gray-700 hover:text-blue-600 border border-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:text-gold-300"
            );

            return (
              <motion.div
                key={action.key}
                initial={{ opacity: 0, scale: 0.5, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 12 }}
                transition={{ duration: 0.22, delay: i * 0.05 }}
                className="relative"
              >
                {action.href ? (
                  <a
                    href={action.href}
                    aria-label={action.label}
                    title={action.label}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className={classes}
                  >
                    {inner}
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-label={action.label}
                    title={action.label}
                    onClick={action.onClick}
                    className={classes}
                  >
                    {inner}
                  </button>
                )}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            type="button"
            key="to-top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            title="Back to top"
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-600 shadow-lg backdrop-blur transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/60 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:text-gold-300"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main toggle */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close quick contact options" : "Open quick contact options"}
        whileTap={{ scale: 0.92 }}
        className={cx(
          "pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl",
          "bg-gradient-to-br from-blue-500 to-blue-700 dark:bg-gold-gradient",
          "transition-shadow duration-300 hover:shadow-blue-500/40 dark:hover:shadow-gold-500/30",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/60 dark:focus-visible:ring-gold-300/50",
          open && "shadow-blue-500/40 dark:shadow-gold-500/30"
        )}
      >
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          <Plus className="h-6 w-6" aria-hidden="true" />
        </motion.span>
      </motion.button>
    </div>
  );
};

export default FloatingActions;
