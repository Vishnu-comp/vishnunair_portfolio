import { useEffect } from "react";

/**
 * Per-route document head management (title, description, canonical, OG).
 *
 * The static <head> in public/index.html already carries the home-page values
 * plus full Open Graph / Twitter / JSON-LD markup, so crawlers that never run
 * JS still see rich metadata. This hook keeps the head correct when a visitor
 * (or a rendering crawler) moves between SPA routes.
 */

export const SITE_URL = "https://vishnunairportfolio.vercel.app";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function useSeo({ title, description, path = "/", robots }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      upsertMeta("property", "og:title", title);
      upsertMeta("name", "twitter:title", title);
    }
    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }
    if (robots) upsertMeta("name", "robots", robots);

    const url = `${SITE_URL}${path === "/" ? "" : path}`;
    upsertMeta("property", "og:url", url);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, robots]);
}
