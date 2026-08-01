export default function HeroSection() {
  return (
    <section className="deck-section justify-end pb-16 pt-24 md:pb-24">
      <div className="deck-inner text-center">
        <h1 className="mb-5 font-sans text-5xl font-light lowercase leading-[1.05] tracking-tight text-foreground sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl">
          product builder
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-base leading-snug text-pretty text-foreground/90 md:text-xl">
          (fintech)<br/>building stuff that works and makes sense
        </p>
        {/* <div className="flex items-center justify-center gap-2">
          <p className="font-mono text-[11px] text-foreground/80 md:text-xs">scroll</p>
          <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
            <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
          </div>
        </div> */}
      </div>
    </section>
  );
}

