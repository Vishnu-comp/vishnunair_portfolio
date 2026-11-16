import React, { useEffect, useRef, useState } from "react";
import { Download, ExternalLink } from "lucide-react";

/**
 * Crisp, fit-to-width render of the resume PDF (pdf.js, canvas). No browser
 * toolbar or thumbnail sidebar. Falls back to plain Open/Download buttons if
 * rendering fails, so the resume is never unreachable.
 */
const ResumeViewer = ({ src, caption }) => {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const pdfRef = useRef(null);
  const [state, setState] = useState("loading"); // loading | ready | error
  const [width, setWidth] = useState(0);

  // Load the document once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/build/pdf");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
        const doc = await pdfjs.getDocument(src).promise;
        if (cancelled) return;
        pdfRef.current = doc;
        setWidth((w) => w || (wrap.current ? wrap.current.clientWidth : 0));
        setState("ready");
      } catch (e) {
        if (!cancelled) setState("error");
      }
    })();
    return () => { cancelled = true; };
  }, [src]);

  // Track container width.
  useEffect(() => {
    if (!wrap.current || !("ResizeObserver" in window)) return undefined;
    const ro = new ResizeObserver(([en]) => setWidth(Math.round(en.contentRect.width)));
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  // Render page 1 at the container width (sharp on retina).
  useEffect(() => {
    const doc = pdfRef.current;
    if (state !== "ready" || !doc || !width || !canvas.current) return undefined;
    let task;
    let cancelled = false;
    (async () => {
      try {
        const page = await doc.getPage(1);
        const base = page.getViewport({ scale: 1 });
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        const scale = (width / base.width) * dpr;
        const vp = page.getViewport({ scale });
        const c = canvas.current;
        if (!c || cancelled) return;
        c.width = Math.floor(vp.width);
        c.height = Math.floor(vp.height);
        c.style.width = `${width}px`;
        c.style.height = `${Math.floor(vp.height / dpr)}px`;
        task = page.render({ canvasContext: c.getContext("2d"), viewport: vp });
        await task.promise;
      } catch (e) {
        /* a cancelled render on resize is expected */
      }
    })();
    return () => { cancelled = true; if (task) task.cancel(); };
  }, [state, width]);

  const btn =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-neon/50";

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-4 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 bg-neon" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink/60 dark:text-white/60">Resume.pdf / Page 1</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={src} target="_blank" rel="noopener noreferrer" className={`${btn} border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white dark:border-white/30 dark:text-white dark:hover:border-neon dark:hover:bg-neon dark:hover:text-ink`}>
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Open
          </a>
          <a href={src} download className={`${btn} bg-ink text-white hover:bg-neon hover:text-ink dark:bg-neon dark:text-ink dark:hover:bg-white`}>
            <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
          </a>
        </div>
      </div>

      <div className="px-3 py-6 sm:px-8 sm:py-10">
        <div ref={wrap} className="mx-auto w-full max-w-[860px]">
          {state === "error" ? (
            <p className="rounded-xl bg-white p-6 text-center text-sm text-ink/70">
              The preview could not load here. Use Open or Download PDF above.
            </p>
          ) : (
            <div className="relative bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/10" style={{ minHeight: state === "loading" ? 480 : 0 }}>
              {state === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-ink/50">Loading preview…</div>
              )}
              <canvas ref={canvas} className="block max-w-full" role="img" aria-label="Preview of Vishnu Nair's resume, page 1" />
            </div>
          )}
        </div>
        {caption && <p className="mt-5 text-center text-xs text-ink/55 dark:text-white/55">{caption}</p>}
      </div>
    </div>
  );
};

export default ResumeViewer;
