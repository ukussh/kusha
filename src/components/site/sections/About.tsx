import { useReveal } from "@/hooks/use-reveal";

const traits = [
  {
    label: "builder",
    body: "building products around what users do, not what they're expected to do, is where I thirve. funnel analytics, experimentation, session insights, and product metrics guide my decisions and  help uncover where experiences can be improved.",
  },
  {
    label: "bridge",
    body: "navigating teams and leadership to deliver results has been a constant across my roles. I have aligned Engineering, Design, Finance, Compliance, and Operations around shared goals; believing that influence comes from clarity, not authority.",
  },
  {
    label: "principles",
    body: "product principles become my compass from day one. whether it's outcome biased OKRs, compliance delivery, or customer obsession,  I absorb the mission and translate it into daily decisions because outcomes matter more than output to me.",
  },
];

export default function AboutSection() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.3);

  return (
    <section ref={ref} className="deck-section">
      <div className="deck-inner">
        <div
          className={`mb-8 text-left transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="font-sans text-3xl font-light lowercase tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
            adding a little more context here
            <br/>
            because the details matter
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
          >
            <h2 className="mb-6 font-sans text-xl font-light  text-foreground md:text-3xl">
              to begin:<br/> the name is kushagra.
            </h2>
            <p className="mb-6 max-w-lg text-base leading-relaxed text-foreground/90 md:text-xl">
              business analyst with a year and counting<br/> across fintech &amp; enterprise, and a builder
              in his spare time.
            </p>
            <p className="mb-6 max-w-lg text-base leading-relaxed text-foreground/90 md:text-xl">
              having a rich technical background and having coded most of the time, I naturally think in systems rather than isolated features.
              </p>
              <p className="mb-6 max-w-lg text-base leading-relaxed text-foreground/90 md:text-xl">
               breaking ambiguity into smaller, manageable parts and working towards practical solutions, help me bridge technical discussions with business needs.
            </p>
          </div>

          <div
            className={`flex flex-col transition-all duration-700 delay-150 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
          >
            {traits.map((trait, i) => (
              <div
                key={trait.label}
                className={i === 0 ? "pb-6" : "border-t border-foreground/10 py-6 last:pb-0"}
              >
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  {trait.label}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/80 md:text-base">{trait.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}