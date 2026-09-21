/**
 * Vercel Web Analytics, wrapped.
 *
 * Two reasons this exists instead of components importing `track` directly:
 *
 *  1. Analytics must never take a click down with it. `track()` throws if the
 *     script hasn't booted (offline, a blocked request, or a self-hosted build
 *     with no project id), and "the button that opens ChatGPT" is not worth
 *     that risk.
 *  2. It keeps the event vocabulary in one file, and it is mockable in tests —
 *     CRA's Jest resolver can't read the `exports` map of
 *     `@vercel/analytics/react`, so anything importing it directly cannot be
 *     unit-tested at all.
 *
 * Custom events show up in the Vercel dashboard under Web Analytics -> Events
 * (they need the analytics script from @vercel/analytics to be mounted, which
 * <Analytics /> in src/App.js already does).
 */
import { track } from "@vercel/analytics/react";

export function safeTrack(event, data) {
  try {
    track(event, data);
  } catch {
    /* measurement is optional; the feature is not */
  }
}

/** Namespaced so the dashboard doesn't mix this with someone else's events. */
export const ASK_AI_EVENTS = {
  /** Visitor opened an assistant with the prefill. */
  open: "ask_ai_open",
  /** Visitor took the prompt or the shareable link to the clipboard. */
  copy: "ask_ai_copy",
  /** Visitor revealed the exact text that would be sent. */
  preview: "ask_ai_preview",
};

export default safeTrack;
