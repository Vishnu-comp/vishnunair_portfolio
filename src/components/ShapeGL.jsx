import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Shape({ kind, color }) {
  const ref = useRef();
  useFrame((state, dt) => {
    const g = ref.current;
    const s = typeof window !== "undefined" ? window.scrollY * 0.0016 : 0;
    g.rotation.y += dt * 0.3;
    g.rotation.x = 0.4 + s;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });
  return (
    <group ref={ref}>
      <mesh>
        {kind === 0 && <octahedronGeometry args={[1.3, 0]} />}
        {kind === 1 && <torusKnotGeometry args={[0.85, 0.26, 110, 14]} />}
        {kind === 2 && <icosahedronGeometry args={[1.25, 1]} />}
        {kind === 3 && <torusGeometry args={[1.0, 0.4, 14, 36]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

const ShapeGL = ({ kind = 0, color = "#0f1011" }) => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 5], fov: 45 }}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
  >
    <Shape kind={kind} color={color} />
  </Canvas>
);

export default ShapeGL;
