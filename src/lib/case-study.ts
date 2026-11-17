const cache = new Map<string, Promise<string | null>>();

/**
 * Fetches public/case-studies/<slug>.md, resolving to null when it doesn't
 * exist. Cached so a hover preload and the navigation share one request.
 */
export function loadCaseStudy(slug: string): Promise<string | null> {
  let pending = cache.get(slug);
  if (!pending) {
    pending = fetch(`/case-studies/${slug}.md`)
      .then((res) => (res.ok ? res.text() : null))
      // A missing file can be served as the SPA shell, so reject HTML too.
      .then((text) => (text && !/^\s*<!doctype html/i.test(text) ? text : null))
      .catch(() => null);
    pending.then((text) => {
      // Let a failed or missing fetch be retried on the next visit.
      if (text === null) cache.delete(slug);
    });
    cache.set(slug, pending);
  }
  return pending;
}

/** Kicker tag shown above each case study's headline, matching the projects list. */
export const CASE_STUDY_TAGS: Record<string, string> = {
  "a-blueprint-for-better-lending": "User Journey",
  "rapidos-static-otp-paradox": "User Experience",
  "spotify-premium-conversion": "Growth Strategy",
};

/** Rough reading time for a markdown source, at ~220 words a minute. */
export function readingMinutes(source: string): number {
  const words = source.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
