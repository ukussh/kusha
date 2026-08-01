import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import Pager from "../Pager";

const PAGE_SIZE = 5;

const openLinkClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/50 text-foreground transition-all hover:bg-foreground hover:text-background md:h-10 md:w-10";

// Case studies carry a `slug` and open as an in-site page that renders the
// matching public/case-studies/<slug>.md; everything else is an external link.
const projects = [
  {
    id: "001",
    title: "a blueprint for better lending",
    category: "Case Study",
    tag: "User Journey",
    slug: "a-blueprint-for-better-lending",
    href: null as string | null,
    direction: "left",
  },
  {
    id: "002",
    title: "physiological analytics engine",
    category: "Side Project",
    tag: "UI Engineering",
    slug: null as string | null,
    href: "https://hypertrophik.pages.dev/",
    direction: "right",
  },
  {
    id: "003",
    title: "rapido's static otp paradox",
    category: "Case Study",
    tag: "User Experience",
    slug: "rapidos-static-otp-paradox",
    href: null as string | null,
    direction: "left",
  },
  {
    id: "004",
    title: "logistics management application",
    category: "Side Project",
    tag: "SaaS System",
    slug: null as string | null,
    href: "http://serenitydata.runasp.net/",
    direction: "right",
  },
  {
    id: "005",
    title: "adaptive document scanner",
    category: "Side Project",
    tag: "Computer Vision",
    slug: null as string | null,
    href: "https://github.com/ukussh/DoScan",
    direction: "left",
  },
];

export default function ProjectsSection() {
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
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl font-light lowercase tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
            things i&apos;ve built &amp; broken
            <br/>
           breaking down the product decisions
          </h2>
        </div>

        <div>
          {visibleProjects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>

        <Pager page={page} pageCount={pageCount} onChange={setPage} />
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
        <h3 className="truncate font-sans text-base font-light lowercase text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
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
