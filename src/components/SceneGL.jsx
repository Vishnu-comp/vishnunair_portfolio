import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const NEON = "#d4ff3f";
const INK = "#0f1011";
const mouse = { x: 0, y: 0 };

/** The 3D object itself: hidden-line icosphere, vertex dots, inner octahedron, two orbit rings. */
function Rig() {
  const group = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const orbit = useRef();
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    g.rotation.y += dt * 0.25;
    g.rotation.x += (mouse.y * 0.5 + 0.3 - g.rotation.x) * 0.05;
    g.position.x += (mouse.x * 0.35 - g.position.x) * 0.05;
    g.position.y += (-mouse.y * 0.2 - g.position.y) * 0.05;
    ringA.current.rotation.z = t * 0.3;
    ringB.current.rotation.z = -t * 0.2;
    orbit.current.position.set(Math.cos(t * 0.9) * 2.4, Math.sin(t * 0.9) * 2.4, 0);
  });
  return (
    <group ref={group}>
      {/* solid core hides back-facing lines so it reads as a real object */}
      <mesh>
        <icosahedronGeometry args={[1.48, 1]} />
        <meshBasicMaterial color={INK} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={NEON} wireframe transparent opacity={0.55} />
      </mesh>
      <points>
        <icosahedronGeometry args={[1.5, 1]} />
        <pointsMaterial color={NEON} size={0.07} sizeAttenuation />
      </points>
      <mesh rotation={[0.4, 0.2, 0]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color={NEON} wireframe />
      </mesh>
      <group rotation={[1.1, 0, 0]}>
        <mesh ref={ringA}>
          <torusGeometry args={[2.3, 0.008, 8, 160]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        <mesh ref={ringB} rotation={[0.5, 0.9, 0]}>
          <torusGeometry args={[2.8, 0.006, 8, 160]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
        </mesh>
        <mesh ref={orbit}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={NEON} />
        </mesh>
      </group>
    </group>
  );
}

const SceneGL = ({ className = "" }) => {
  const wrap = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let io;
    if ("IntersectionObserver" in window && wrap.current) {
      io = new IntersectionObserver(([en]) => setActive(en.isIntersecting));
      io.observe(wrap.current);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden="true" className={`pointer-events-none ${className}`}>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.5 : 2]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <Rig />
      </Canvas>
    </div>
  );
};

export default SceneGL;
