import {
  Suspense,
  lazy,
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import GrainOverlay from "./GrainOverlay";
import HeroSection from "./sections/Hero";
import ProjectsSection, { CaseStudiesSection, CertificationsSection } from "./sections/Projects";
import ExpertiseSection from "./sections/Expertise";
import AboutSection from "./sections/About";

const ShaderBackground = lazy(() => import("./ShaderBackground"));

const SECTIONS = ["main", "about", "projects", "case-studies", "certifications", "competence"];
const COUNT = SECTIONS.length;
const PANELS = [
  HeroSection,
  AboutSection,
  ProjectsSection,
  CaseStudiesSection,
  CertificationsSection,
  ExpertiseSection,
];
// "main" stays a panel but is reached through the wordmark, not the nav.
// Sections are centred in the bar; contact details live in the fixed footer.

// Matches --dur-deck in styles.css.
const SLIDE_MS = 420;

function indexFromHash(hash: string) {
  const i = SECTIONS.indexOf(hash.replace(/^#/, ""));
  return i > 0 ? i : 0;
}

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    !!target.closest("input, textarea, select, [contenteditable='true']")
  );
}

/** Whether a panel can still scroll natively in the given direction. */

// True once the app has hydrated: later visits (e.g. back from a case study) are client-side
// navigations, so the deck can open straight on the panel named in the hash.
let hydrated = false;

function initialIndex() {
  return hydrated && typeof window !== "undefined" ? indexFromHash(window.location.hash) : 0;
}

export default function SwipeDeck() {
  const [index, setIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  // Suppresses the slide when restoring a panel from the URL on load.
  const [instant, setInstant] = useState(false);
  const indexRef = useRef(index);
  const lockUntil = useRef(0);

  useEffect(() => {
    hydrated = true;
    setMounted(true);
  }, []);

  // Restore the panel named in the hash (e.g. returning from a case study to #projects).
  useLayoutEffect(() => {
    const initial = indexFromHash(window.location.hash);
    if (initial === 0 || initial === indexRef.current) return;
    setInstant(true);
    indexRef.current = initial;
    setIndex(initial);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keep the URL in step so panels are linkable and survive back navigation.
  useEffect(() => {
    if (!mounted) return;
    const { pathname, search } = window.location;
    const url = index === 0 ? pathname + search : `${pathname}${search}#${SECTIONS[index]}`;
    window.history.replaceState(window.history.state, "", url);
  }, [index, mounted]);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(COUNT - 1, next));
    if (clamped === indexRef.current) return;
    indexRef.current = clamped;
    lockUntil.current = performance.now() + SLIDE_MS;
    setIndex(clamped);
  }, []);

  // Follow hash changes made outside the deck (typed URL, in-page links).
  useEffect(() => {
    const onHashChange = () => goTo(indexFromHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [goTo]);

  // Click-to-open only: no wheel, swipe or arrow-key paging between pages.
  // Panels scroll natively if their content is taller than the screen; Escape returns home.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isTypingTarget(e.target) && indexRef.current !== 0) goTo(0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  return (
    <div className={`deck-viewport ${instant ? "deck-instant" : ""}`}>
      <div className="fixed inset-0 -z-10 bg-background">
        {mounted && (
          <Suspense fallback={null}>
            <div
              className="intro-fade absolute inset-0"
              style={{ "--delay": "0ms" } as CSSProperties}
            >
              <ShaderBackground />
            </div>
          </Suspense>
        )}
        {/* Plain tint: a backdrop blur here re-blurs the whole animated swirl every frame. */}
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* No grain over the home panel; it fades back in on the other panels. */}
      <GrainOverlay hidden />

      {/* No navbar or footer: the home grid links to every page. On other pages a single
          small button (or Escape) leads back. */}

      <div className="deck-track">
        {PANELS.map((Panel, i) => (
          <div
            key={SECTIONS[i]}
            className="deck-panel"
            data-panel-scroll
            // Drives the per-panel parallax and staggered reveal in styles.css.
            data-state={i === index ? "active" : i < index ? "before" : "after"}
            // Off-screen panels stay out of the tab order and the accessibility tree.
            inert={i !== index}
          >
            <Panel />
          </div>
        ))}
      </div>
    </div>
  );
}
