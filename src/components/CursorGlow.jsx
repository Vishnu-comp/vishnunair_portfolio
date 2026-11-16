import React, { useEffect, useRef } from "react";
import { isLowPower } from "./Scene3D";

/** Neon ring that trails the cursor and grows over links/buttons. Fine pointers only. */
const CursorGlow = () => {
  const ref = useRef(null);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || isLowPower()) return undefined;
    const el = ref.current;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, big = false;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      const hit = e.target.closest && e.target.closest("a,button,[role=button],input,textarea,select,label");
      big = Boolean(hit);
      el.style.opacity = "1";
    };
    const leave = () => { el.style.opacity = "0"; };
    const tick = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx - 16}px,${cy - 16}px,0) scale(${big ? 1.9 : 1})`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border-2 border-neon opacity-0 mix-blend-difference transition-[opacity] duration-300 md:block"
    />
  );
};

export default CursorGlow;
