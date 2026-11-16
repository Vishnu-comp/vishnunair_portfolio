import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin neon bar at the top showing how far down the page you are. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[95] h-[3px] origin-left bg-neon"
    />
  );
};

export default ScrollProgress;
