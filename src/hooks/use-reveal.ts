import { useEffect, useRef, useState } from "react";

/**
 * Reveals content once the element scrolls (or slides) into the viewport.
 * Works with the horizontal deck: each panel intersects when it slides in.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const revealed = entries.some(entry => {
          if (!entry.isIntersecting) return false;
          if (entry.intersectionRatio >= threshold) return true;
          // A section taller than the viewport can never expose `threshold` of
          // its own area (short/landscape screens), so also reveal once it
          // fills most of the screen — otherwise it stays hidden for good.
          const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
          return rootHeight > 0 && entry.intersectionRect.height >= rootHeight * 0.6;
        });
        if (revealed) setIsVisible(true);
      },
      { threshold: [0, threshold], root: null }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
