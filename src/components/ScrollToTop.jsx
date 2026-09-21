import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../hooks/useNavigation";

/**
 * React Router keeps the window scroll position when you push a new route,
 * so navigating Home -> /work used to land you mid-page.
 *
 * This resets to the top on every pathname change — unless the URL carries a
 * hash, which is a deliberate deep link (a shared /#ask-ai link from an email
 * or a LinkedIn message, say). In that case we let the route mount, then scroll
 * to the section with the usual navbar offset. In-page nav clicks are still
 * handled by Navbar/MobileBottomNav, which scroll themselves.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // "auto" (not "smooth") — a jump is correct here, an animation is not.
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return undefined;
    }

    // The section only exists after React has rendered the route, so a
    // same-tick measure would find a zero-height page.
    const timer = window.setTimeout(() => {
      if (!scrollToSection(hash)) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
