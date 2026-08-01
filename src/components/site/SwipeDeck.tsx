import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import GrainOverlay from "./GrainOverlay";
import HeroSection from "./sections/Hero";
import ProjectsSection from "./sections/Projects";
import ExpertiseSection from "./sections/Expertise";
import TimelineSection from "./sections/Timeline";
import CombinedSection from "./sections/Combined";
import AboutSection from "./sections/About";
import ContactSection from "./sections/Contact";

const ShaderBackground = lazy(() => import("./ShaderBackground"));

const SECTIONS = ["main", "about", "competence", "timeline", "foundations", "projects", "contact"];
const COUNT = SECTIONS.length;
// "main" stays a panel but is reached through the wordmark, not the nav.
const NAV = SECTIONS.map((label, index) => ({ label, index })).slice(1);

export default function SwipeDeck() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const lockRef = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => setMounted(true), []);

  // The home panel shows the light banner, so the header needs dark ink there.
  const onBanner = index === 0;

  const goTo = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(COUNT - 1, next)));
  }, []);

  const step = useCallback(
    (delta: number) => {
      if (lockRef.current) return;
      setIndex(prev => {
        const next = Math.max(0, Math.min(COUNT - 1, prev + delta));
        if (next !== prev) {
          lockRef.current = true;
          setTimeout(() => {
            lockRef.current = false;
          }, 900);
        }
        return next;
      });
    },
    []
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      const scroller = target?.closest<HTMLElement>("[data-panel-scroll]");
      if (scroller && scroller.scrollHeight > scroller.clientHeight + 4) {
        const atTop = scroller.scrollTop <= 0;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        const goingDown = e.deltaY > 0;
        if ((goingDown && !atBottom) || (!goingDown && !atTop)) return;
      }
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 12) return;
      step(delta > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)) step(1);
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) step(-1);
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(COUNT - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [step, goTo]);

  return (
    <div
      className="deck-viewport"
      onTouchStart={e => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={e => {
        const start = touchStart.current;
        if (!start) return;
        const dx = e.changedTouches[0].clientX - start.x;
        const dy = e.changedTouches[0].clientY - start.y;
        touchStart.current = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="fixed inset-0 -z-10 bg-background">
        {mounted && (
          <Suspense fallback={null}>
            <ShaderBackground />
          </Suspense>
        )}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
        {/* Banner: fully visible on the home panel, hidden on every other. */}
        <div
          aria-hidden="true"
          className="portrait-backdrop absolute inset-0"
          style={{ opacity: index === 0 ? 1 : 0 }}
        />
      </div>

      <GrainOverlay />

      {/* Same gutter as .deck-inner so the wordmark lines up with the headings. */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[clamp(20px,5vw,72px)] py-4 md:py-6">
        {/* The banner is white in places and near-black in others (the hair sits
            under "about"), so dark ink alone isn't legible. This light scrim
            guarantees contrast across the whole bar; it fades out off-home. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-[190%] bg-gradient-to-b from-white/85 via-white/45 to-transparent transition-opacity duration-500 ${
            onBanner ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          type="button"
          onClick={() => goTo(0)}
          className={`relative font-mono text-base tracking-[0.01em] lowercase transition-colors duration-500 md:text-lg ${
            onBanner ? "text-background" : "text-foreground/90"
          }`}
        >
          kushagra
        </button>
       <nav className="relative flex flex-wrap items-center justify-end gap-x-2 gap-y-1 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
          {NAV.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => goTo(item.index)}
              data-active={index === item.index}
              className={`font-mono text-xs lowercase transition-colors duration-500 sm:text-sm md:text-lg ${
                onBanner
                  ? "text-background/70 hover:text-background data-[active=true]:text-background"
                  : "text-foreground/55 hover:text-foreground data-[active=true]:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div
        className="deck-track"
        style={{ transform: `translate3d(-${index * 100}vw, 0, 0)`, width: `${COUNT * 100}vw` }}
      >
        <div className="deck-panel" data-panel-scroll>
          <HeroSection />
        </div>
        <div className="deck-panel" data-panel-scroll>
          <AboutSection />
        </div>
        <div className="deck-panel" data-panel-scroll>
          <ExpertiseSection />
        </div>
        <div className="deck-panel" data-panel-scroll>
          <TimelineSection />
        </div>
        <div className="deck-panel" data-panel-scroll>
          <CombinedSection />
        </div>
        <div className="deck-panel" data-panel-scroll>
          <ProjectsSection />
        </div>
        <div className="deck-panel" data-panel-scroll>
          <ContactSection />
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
        {SECTIONS.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={`Go to ${label}`}
            onClick={() => goTo(i)}
            data-active={index === i}
            className="h-1.5 rounded-full bg-foreground/25 transition-all duration-500 data-[active=true]:w-8 data-[active=true]:bg-primary w-1.5"
          />
        ))}
      </div>
    </div>
  );
}
