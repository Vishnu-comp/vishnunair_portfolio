import React, { useRef } from "react";
import { isLowPower } from "./Scene3D";

/**
 * Pointer-driven 3D tilt with a soft glare. Only active on hover-capable
 * devices; reduced-motion and low-power users get a plain element.
 */
const Tilt = ({ as: Tag = "div", max = 8, glare = true, className = "", children, style, ...rest }) => {
  const ref = useRef(null);
  const raf = useRef(0);
  const enabled = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !isLowPower();

  const move = (e) => {
    if (!enabled()) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * max).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg) translateZ(0)`;
      el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
    });
  };
  const leave = () => {
    cancelAnimationFrame(raf.current);
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d", ...style }}
      {...rest}
    >
      {children}
      {glare && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300 [div:hover>&]:opacity-100 [article:hover>&]:opacity-100"
          style={{ background: "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.35), transparent 55%)" }}
        />
      )}
    </Tag>
  );
};

export default Tilt;
