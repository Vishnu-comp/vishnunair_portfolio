import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router keeps the window scroll position when you push a new route,
 * so navigating Home -> /work used to land you mid-page.
 *
 * This resets to the top on every pathname change. Hash targets (#section)
 * are handled separately by Navbar/MobileBottomNav, which scroll after the
 * route has rendered.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "auto" (not "smooth") — a jump is correct here, an animation is not.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
