import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import Pager from "../Pager";

const PAGE_SIZE = 2;

const openLinkClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/50 text-foreground transition-all hover:bg-foreground hover:text-background md:h-10 md:w-10";

const education = [
  { id: "edu-1", institution: "Computer Science", degree: "Master's Degree", year: "2023 – 2025" },
  { id: "edu-2", institution: "Mathematics", degree: "Bachelor's Degree", year: "2020 – 2023" },
];

// Case studies carry a `slug` and open as an in-site page that renders the
// matching public/case-studies/<slug>.md; everything else is an external link.
const projects = [
  {
    id: "001",
    title: "Azure AI Essentials",
    tag: "Microsoft",
    category: "09/2025",
    slug: null as string | null,
    href: "https://www.linkedin.com/learning/certificates/228f7d1746b3e931eda0e174d2b9654daa2bcb16927f24bb8860dec2858b9e89?trk=share_certificate",
    direction: "right",
  },
  {
    id: "002",
    title: "Agile Project Management",
    tag: "Atlassian",
    category: "09/2025",
    slug: null as string | null,
    href: "https://www.linkedin.com/learning/certificates/08901033ac66506ca9294c70967c465fa4318ba0581b817287a8c254a59b618b?trk=share_certificate",
    direction: "right",
  },
  {
    id: "003",
    title: "AI Fluency: Framework & Foundations",
    tag: "Anthropic",
   category: "06/2026",
    slug: null as string | null,
    href: "https://verify.skilljar.com/c/b79b6xwjjwdr",
    direction: "left",
  },
  {
    id: "004",
    title: "MongoDB Overview with AWS",
    tag: "MongoDB",
  category: "07/2025",
    slug: null as string | null,
    href: "https://www.credly.com/badges/1522d5da-6969-4705-838c-2f5c5d578dbc/public_url",
    direction: "right",
  },
];

export default function CombinedSection() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.3);
  const [page, setPage] = useState(0);

  const pageCount = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
  const visibleProjects = useMemo(
    () => projects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page]
  );

  return (
    <section ref={ref} className="deck-section">
      <div className="deck-inner">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl font-light lowercase tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
            learning the craft
            <br/>
            &amp; validating the knowledge
          </h2>
        </div>

        {/* Education Section */}
        <div
          className={`mb-12 transition-all duration-700 delay-150 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
            Education
          </p>
          {education.map(entry => (
            <div
              key={entry.id}
              className="grid grid-cols-3 items-center gap-3 border-b border-foreground/10 py-4"
            >
              <span className="text-sm text-foreground/80 md:text-base">{entry.degree}</span>
              <span className="font-sans text-sm text-foreground/80 md:text-base">
  {entry.institution}
</span>
              <span className="text-right font-mono text-xs text-foreground/60 md:text-sm">
                {entry.year}
              </span>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
            Certifications
          </p>
          <div>
            {visibleProjects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} isVisible={isVisible} />
            ))}
          </div>

          <Pager page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[number];
  index: number;
  isVisible: boolean;
}) {
  const revealClass = !isVisible
    ? project.direction === "left"
      ? "-translate-x-16 opacity-0"
      : "translate-x-16 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div
      className={`group flex items-center justify-between gap-4 border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/25 md:py-5 ${revealClass}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="flex min-w-0 items-center gap-3 md:gap-6">
        <span className="font-mono text-xs text-foreground/30 transition-colors group-hover:text-primary md:text-sm">
          {project.id}
        </span>
        {project.slug ? (
          <Link
            to="/case-studies/$slug"
            params={{ slug: project.slug }}
            className={openLinkClass}
            aria-label={`Read ${project.title}`}
          >
            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        ) : (
          <a
            href={project.href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={openLinkClass}
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
          </a>
        )}
        <h3 className="truncate font-sans text-base font-light  text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
          {project.title}
        </h3>
      </div>
      <div className="flex shrink-0 flex-col items-end text-right">
        <span className="font-mono text-[11px] text-foreground/60 md:text-sm">{project.tag}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 md:text-xs">
          {project.category}
        </span>
      </div>
    </div>
  );
}
