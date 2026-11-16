import React, { useEffect, useRef } from "react";

/**
 * Lightweight 3D hero scene drawn on a plain canvas (no WebGL, no extra
 * dependency): a geodesic sphere, an inner octahedron and two orbit rings,
 * perspective-projected and rotated by time, pointer and scroll.
 *
 * Fallbacks: prefers-reduced-motion, save-data and low-end devices get a single
 * static frame. The loop pauses when off-screen or the tab is hidden.
 */
const NEON = [212, 255, 63];

function buildSphere() {
  const t = (1 + Math.sqrt(5)) / 2;
  let v = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map((p) => norm(p));
  const f = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  const cache = {};
  const mid = (a, b) => {
    const k = a < b ? `${a}_${b}` : `${b}_${a}`;
    if (cache[k] === undefined) {
      v.push(norm([(v[a][0] + v[b][0]) / 2, (v[a][1] + v[b][1]) / 2, (v[a][2] + v[b][2]) / 2]));
      cache[k] = v.length - 1;
    }
    return cache[k];
  };
  const tris = [];
  f.forEach(([a, b, c]) => {
    const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
    tris.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  });
  const edges = new Set();
  tris.forEach(([a, b, c]) => [[a, b], [b, c], [c, a]].forEach(([x, y]) => edges.add(x < y ? `${x}_${y}` : `${y}_${x}`)));
  return { verts: v, edges: [...edges].map((e) => e.split("_").map(Number)) };
}
function norm([x, y, z]) {
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
}
function ring(n, r, tilt) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    return [x, y * Math.cos(tilt), y * Math.sin(tilt)];
  });
}

const SPHERE = buildSphere();
const OCTA = {
  verts: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].map((p) => p.map((n) => n * 0.52)),
  edges: [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]],
};
const RING_A = ring(72, 1.38, 1.1);
const RING_B = ring(72, 1.6, -0.5);

export function isLowPower() {
  if (typeof window === "undefined") return true;
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = window.navigator || {};
  const saveData = nav.connection && nav.connection.saveData;
  const weak = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) || (nav.deviceMemory && nav.deviceMemory <= 2);
  return Boolean(reduced || saveData || weak);
}

const Scene3D = ({ className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const still = isLowPower();
    const state = { w: 0, h: 0, rx: 0.35, ry: 0, px: 0, py: 0, tx: 0, ty: 0, sy: 0, visible: true, raf: 0, last: 0, t: 0 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
      state.w = r.width;
      state.h = r.height;
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (p, cy, sy, cx, sx, scale, cam) => {
      // rotate Y then X
      const x1 = p[0] * cy + p[2] * sy;
      const z1 = -p[0] * sy + p[2] * cy;
      const y2 = p[1] * cx - z1 * sx;
      const z2 = p[1] * sx + z1 * cx;
      const k = cam / (cam + z2);
      return [state.w / 2 + x1 * k * scale, state.h / 2 + y2 * k * scale, z2];
    };

    const draw = () => {
      const { w, h } = state;
      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w, h) * 0.36;
      const ry = state.ry, rx = state.rx;
      const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      const cam = 4.2;
      const [r, g, b] = NEON;
      ctx.lineWidth = 1;

      const edgesOf = (set, a0, a1, s = 1) => {
        const P = set.verts.map((p) => project(p, cy, sy, cx, sx, scale * s, cam));
        set.edges.forEach(([i, j]) => {
          const z = (P[i][2] + P[j][2]) / 2;
          const a = a0 + (1 - (z + 1.6) / 3.2) * a1;
          ctx.strokeStyle = `rgba(${r},${g},${b},${Math.max(0.04, Math.min(0.9, a))})`;
          ctx.beginPath();
          ctx.moveTo(P[i][0], P[i][1]);
          ctx.lineTo(P[j][0], P[j][1]);
          ctx.stroke();
        });
        return P;
      };

      const P = edgesOf(SPHERE, 0.05, 0.5);
      P.forEach((p) => {
        const a = 0.25 + (1 - (p[2] + 1.6) / 3.2) * 0.7;
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0.1, Math.min(1, a))})`;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 1.4 + (1 - (p[2] + 1.6) / 3.2) * 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      edgesOf(OCTA, 0.25, 0.6);
      [RING_A, RING_B].forEach((pts, n) => {
        const Q = pts.map((p) => project(p, cy * Math.cos(state.t * (n ? -0.4 : 0.3)) - sy * 0, sy, cx, sx, scale, cam));
        ctx.strokeStyle = `rgba(255,255,255,${n ? 0.12 : 0.2})`;
        ctx.beginPath();
        Q.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
        ctx.closePath();
        ctx.stroke();
        const dot = Q[Math.floor(((state.t * (n ? 6 : 9)) % pts.length + pts.length) % pts.length)];
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.arc(dot[0], dot[1], 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = (now) => {
      state.raf = requestAnimationFrame(loop);
      if (!state.visible) return;
      const dt = Math.min(0.05, (now - (state.last || now)) / 1000);
      state.last = now;
      state.t += dt;
      state.px += (state.tx - state.px) * 0.06;
      state.py += (state.ty - state.py) * 0.06;
      state.ry += dt * 0.22;
      state.rx = 0.35 + state.py * 0.5 + state.sy * 0.0006;
      const ryAdd = state.px * 0.6;
      const keep = state.ry;
      state.ry = keep + (ryAdd - (state._last || 0)) * 0.5;
      state._last = ryAdd;
      draw();
    };

    const onMove = (e) => {
      state.tx = (e.clientX / window.innerWidth) * 2 - 1;
      state.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => { state.sy = window.scrollY; state.ry += 0; };
    const onVis = () => {
      if (document.hidden) { cancelAnimationFrame(state.raf); state.raf = 0; }
      else if (!still && !state.raf && state.visible) { state.last = 0; state.raf = requestAnimationFrame(loop); }
    };

    resize();
    state.ry = 0.6;
    draw();
    window.addEventListener("resize", resize);
    let io;
    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(([en]) => { state.visible = en.isIntersecting; });
        io.observe(canvas);
      }
      state.raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      if (io) io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
};

export default Scene3D;
