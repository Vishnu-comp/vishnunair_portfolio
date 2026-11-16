import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { isLowPower } from "./Scene2D";

const ShapeGL = lazy(() => import("./ShapeGL"));

/**
 * Floating three.js wireframe behind a section heading. The WebGL canvas is
 * only mounted while the section is on screen (so at most one or two live at
 * once), follows the light/dark theme, and is skipped entirely on mobile,
 * reduced-motion, save-data and low-end devices.
 */
const ShapeBg = ({ kind = 0, dark = false, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  const [ok] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768 && !isLowPower());

  useEffect(() => {
    if (!ok || !ref.current || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(ref.current);
    const mo = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [ok]);

  if (!ok) return null;
  const neon = dark || isDark;
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute z-0 hidden md:block ${className}`}>
      {visible && (
        <Suspense fallback={null}>
          <ShapeGL kind={kind} color={neon ? "#d4ff3f" : "#0f1011"} />
        </Suspense>
      )}
    </div>
  );
};

export default ShapeBg;
