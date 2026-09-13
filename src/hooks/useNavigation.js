import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Shared navigation behaviour for every menu on the site
 * (desktop navbar, mobile drawer, mobile bottom tabs, footer, FABs).
 *
 * Anchors like "#portfolio" only exist on the home route, so when the visitor
 * is on /work or /resume we first navigate home, wait for the section to
 * render, then scroll to it — with an offset so the fixed navbar never
 * overlaps the heading.
 */

/** Height of the fixed navbar; sections scroll to just below it. */
export const NAVBAR_OFFSET = 84;

export function scrollToSection(hash, behavior = "smooth") {
  const el = document.querySelector(hash);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior });
  return true;
}

export function useSectionNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goTo = useCallback(
    (item) => {
      if (item.isRoute) {
        if (pathname !== item.href) navigate(item.href);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (pathname !== "/") {
        navigate("/");
        // Wait for the home route to mount before measuring the section.
        window.setTimeout(() => scrollToSection(item.href), 120);
      } else {
        scrollToSection(item.href);
      }
    },
    [navigate, pathname]
  );

  return { goTo, pathname };
}

/**
 * Scroll-spy: returns the id selector ("#portfolio") of the section currently
 * occupying the top of the viewport, so the navbar can underline it.
 *
 * A single scroll listener with rAF throttling is used instead of one
 * IntersectionObserver per section — cheaper, and it behaves predictably for
 * very tall sections (the Hero and Contact are both min-h-screen).
 */
export function useScrollSpy(selectors, enabled = true) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return undefined;
    }

    let frame = null;

    const measure = () => {
      frame = null;
      const probe = NAVBAR_OFFSET + 24;
      let current = null;

      for (let i = 0; i < selectors.length; i += 1) {
        const el = document.querySelector(selectors[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = selectors[i];
      }

      // Very top of the page -> nothing is "above" the probe yet, so highlight
      // the first section rather than leaving the nav with no active item.
      if (!current && window.pageYOffset < 80) current = selectors[0] || null;

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [selectors, enabled]);

  return active;
}

/** True once the page has been scrolled past `threshold` pixels. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        setScrolled(window.pageYOffset > threshold);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return scrolled;
}
