import React, { Suspense, lazy } from "react";
import Scene2D, { isLowPower } from "./Scene2D";

export { isLowPower };

const SceneGL = lazy(() => import("./SceneGL"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch (e) {
    return false;
  }
}

/**
 * Real three.js scene (react-three-fiber), loaded lazily so it never blocks
 * first paint. Reduced-motion, save-data, low-end devices and browsers
 * without WebGL get the static/lightweight canvas version instead.
 */
const Scene3D = ({ className = "" }) => {
  const [useGL] = React.useState(() => !isLowPower() && hasWebGL());
  if (!useGL) return <Scene2D className={className} />;
  return (
    <Suspense fallback={null}>
      <SceneGL className={className} />
    </Suspense>
  );
};

export default Scene3D;
