import { useReveal } from "@/hooks/use-reveal";

const expertise = [
  {
    title: "user research",
    description:
      "Pressure testing assumptions, running competitive analysis, and designing rapid experiments surface actual problems and real opportunities early.",
    direction: "top",
  },
  {
    title: "data & insights",
    description:
      "When data exists but clarity does not, I build the metrics and reporting so teams actually understand what's happening, why it matters, and what to do next.",
    direction: "right",
  },
  {
    title: "decisions & execution",
    description:
      "Prioritisation is easy to talk about and hard to actually do. I make the call, weighing competing considerations and aligning teams around the initiatives that move the needle.",
    direction: "left",
  },
  {
    title: "ux & strategy",
    description:
      "When product ideas are still taking shape, I define ser journeys, information architecture, workflows, and MVP requirements to balance user needs with business goals.",
    direction: "bottom",
  },
  {
    title: "product leadership",
    description:
      "I speak business, user, and technical reality, stepping in as a fractional product partner, helping clarify priorities and identifying where automation or AI genuinely adds value.",
    direction: "left",
  },
  {
    title: "workflow & tools",
    description:
      "I design internal systems and operational processes that eliminate friction, and give teams back the time they were spending compensating for broken setups.",
    direction: "right",
  },
];

export default function ExpertiseSection() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.3);

  return (
    <section ref={ref} className="deck-section">
      <div className="deck-inner">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl font-light lowercase tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
            my work tends to fall into a few areas
            <br/>
             if this resonates, i&apos;d love to talk
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-x-12 md:gap-y-10">
          {expertise.map((service, i) => (
            <ExpertiseCard key={service.title} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({
  service,
  index,
  isVisible,
}: {
  service: (typeof expertise)[number];
  index: number;
  isVisible: boolean;
}) {
  const revealClass = !isVisible
    ? service.direction === "left"
      ? "-translate-x-16 opacity-0"
      : service.direction === "right"
        ? "translate-x-16 opacity-0"
        : service.direction === "top"
          ? "-translate-y-16 opacity-0"
          : "translate-y-16 opacity-0"
    : "translate-x-0 translate-y-0 opacity-100";

  return (
    <div
      className={`group transition-all duration-700 ${revealClass}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="mb-2 flex items-center gap-3 md:mb-3">
        <div className="h-px w-8 bg-primary transition-all duration-300 group-hover:w-12" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-xl font-light lowercase text-foreground md:text-3xl">
        {service.title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80">{service.description}</p>
    </div>
  );
}
