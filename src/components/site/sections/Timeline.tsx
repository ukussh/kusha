import { useEffect, useMemo, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import Pager from "../Pager";

const PAGE_SIZE = 4;

/* Column alignment shared by the row header and the stats below it:
   role / "08+" left, company / "14M" centre, period / "120K" right. */
const HEAD_ALIGN = ["text-left", "text-center", "text-right"];
const STAT_ALIGN = ["text-left", "text-left sm:text-center", "text-left sm:text-right"];

const workExperience = [
  {
    id: "work-1",
    company: "Tramo",
    role: "Business Analyst",
    period: "2025 – current",
    stats: [
      { value: "08+", title: "Workflow Tools Mastered", sub: "SQL, Postman, Power BI and more" },
      { value: "14M", title: "Financial Loss Prevented", sub: "RCA conducted, fully contained" },
      { value: "120K", title: "Records Daily Monitored", sub: "Handled with SQL and Power BI" },
    ],
  },
  {
    id: "work-2",
    company: "DigiSure",
    role: "Application Engineer",
    period: "2024 – 2025",
    stats: [
      { value: "70%", title: "Resolution Rate Uplift", sub: "Support Platform modernization" },
      { value: "04+", title: "ERP Projects Delivery", sub: "JWT API enabled ERP systems" },
      { value: "03", title: "User Roles Unified", sub: "RBAC methodology implemented" },
    ],
  },
];

export default function TimelineSection() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.3);
  const [page, setPage] = useState(0);

  const pageCount = Math.max(1, Math.ceil(workExperience.length / PAGE_SIZE));
  const entries = useMemo(
    () => workExperience.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page]
  );

  // Exactly one row is open at a time; the top row of the page opens by default.
  const [expanded, setExpanded] = useState(workExperience[0]?.id ?? null);
  useEffect(() => setExpanded(entries[0]?.id ?? null), [entries]);

  return (
    <section ref={ref} className="deck-section">
      <div className="deck-inner">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl font-light lowercase tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
            where i&apos;ve been is only half the story
            <br />
            the other half is what followed
          </h2>
        </div>

        <div
          className={`transition-all duration-700 delay-150 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
            Companies
          </p>
          {entries.map(entry => {
            const open = expanded === entry.id;
            return (
              <div key={entry.id} className="border-b border-foreground/10">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setExpanded(entry.id)}
                  className="grid w-full grid-cols-3 items-center gap-3 py-4"
                >
                  <span className={`${HEAD_ALIGN[0]} text-sm text-foreground/80 md:text-base`}>
                    {entry.role}
                  </span>
                  <span
                    className={`${HEAD_ALIGN[1]} font-sans text-lg font-light  text-foreground md:text-2xl`}
                  >
                    {entry.company}
                  </span>
                  <span
                    className={`${HEAD_ALIGN[2]} font-mono text-xs text-foreground/60 md:text-sm`}
                  >
                    {entry.period}
                  </span>
                </button>

                <div
                  className={`grid gap-4 overflow-hidden transition-all duration-500 sm:grid-cols-3 ${
                    open ? "max-h-[420px] pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {entry.stats.map((stat, i) => (
                    <div key={stat.title} className={STAT_ALIGN[i]}>
                      {/* Same scale ramp as the section heading. */}
                      <div className="font-sans text-3xl font-light tracking-tight text-primary sm:text-4xl md:text-6xl lg:text-7xl">
                        {stat.value}
                      </div>
                      <div className="text-sm text-foreground/90">{stat.title}</div>
                      <div className="font-mono text-[11px] text-foreground/50">{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <Pager page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>
    </section>
  );
}
