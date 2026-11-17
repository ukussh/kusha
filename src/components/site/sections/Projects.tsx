import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { loadCaseStudy } from "@/lib/case-study";
import { splitArticle } from "@/lib/markdown";
import { Page } from "../Page";

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
  {
    id: "006",
    title: "spotify's premium conversion",
    category: "Case Study",
    tag: "Growth Strategy",
    slug: "spotify-premium-conversion",
    href: null as string | null,
    direction: "right",
  },
];

// Certifications open their credential in a new tab, listed in the same rows.
const certifications = [
  {
    id: "001",
    title: "azure ai essentials",
    category: "09/2025",
    tag: "Microsoft",
    slug: null as string | null,
    href: "https://www.linkedin.com/learning/certificates/228f7d1746b3e931eda0e174d2b9654daa2bcb16927f24bb8860dec2858b9e89?trk=share_certificate" as
      string | null,
    direction: "right",
  },
  {
    id: "002",
    title: "agile project management",
    category: "09/2025",
    tag: "Atlassian",
    slug: null as string | null,
    href: "https://www.linkedin.com/learning/certificates/08901033ac66506ca9294c70967c465fa4318ba0581b817287a8c254a59b618b?trk=share_certificate" as
      string | null,
    direction: "right",
  },
  {
    id: "003",
    title: "ai fluency: framework & foundations",
    category: "06/2026",
    tag: "Anthropic",
    slug: null as string | null,
    href: "https://verify.skilljar.com/c/b79b6xwjjwdr" as string | null,
    direction: "left",
  },
  {
    id: "004",
    title: "mongodb overview with aws",
    category: "07/2025",
    tag: "MongoDB",
    slug: null as string | null,
    href: "https://www.credly.com/badges/1522d5da-6969-4705-838c-2f5c5d578dbc/public_url" as
      string | null,
    direction: "right",
  },
];

type Item = {
  id: string;
  title: string;
  category: string;
  tag: string;
  slug: string | null;
  href: string | null;
  direction: string;
};
// Renumber so each page counts from 001.
const numbered = (items: Item[]): Item[] =>
  items.map((p, i) => ({ ...p, id: String(i + 1).padStart(3, "0") }));

export const SIDE_PROJECTS = numbered(projects.filter((p) => !p.slug));
export const CASE_STUDIES = numbered(projects.filter((p) => p.slug));

// One page layout shared by Projects, Case studies and Certifications.
// Rows per page; more items spill onto further pages with the pager below.
const PAGE_SIZE = 6;

function ListPage({
  title,
  kicker,
  lead,
  items,
}: {
  title: string;
  kicker: string;
  lead: ReactNode;
  items: Item[];
}) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const visible = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <Page title={title} home="#main" kicker={kicker} lead={lead}>
      <ol className="pg-rows pg-list">
        {visible.map((item) => (
          <li key={item.title}>
            <ItemRow item={item} />
          </li>
        ))}
      </ol>
      <nav className="pg-pager" aria-label={`${title} pages`}>
        <span className="pg-count">
          {items.length} {title}
        </span>
        <div className="pg-pages">
          <button
            type="button"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            aria-label="Previous page"
          >
            ←
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button
              type="button"
              key={i}
              className={i === page ? "on" : ""}
              aria-current={i === page ? "page" : undefined}
              onClick={() => setPage(i)}
            >
              {pad(i + 1)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= pages - 1}
            aria-label="Next page"
          >
            →
          </button>
        </div>
      </nav>
    </Page>
  );
}

export default function ProjectsSection() {
  return (
    <ListPage
      title="projects"
      kicker="up next: the work, build by build."
      lead={
        <>
          things I’ve built &amp; broken.
          <br />
          <span className="pg-sub">side builds, shipped and live.</span>
        </>
      }
      items={SIDE_PROJECTS}
    />
  );
}

export function CaseStudiesSection() {
  return (
    <ListPage
      title="case studies"
      kicker="read on: the thinking, case by case."
      lead={
        <>
          case studies,
          <br />
          <span className="pg-sub">breaking down the product decisions.</span>
        </>
      }
      items={CASE_STUDIES}
    />
  );
}

export function CertificationsSection() {
  return (
    <ListPage
      title="certifications"
      kicker="on record: each one opens its credential."
      lead={
        <>
          learning the craft &amp;
          <br />
          <span className="pg-sub">validating the knowledge.</span>
        </>
      }
      items={numbered(certifications)}
    />
  );
}

function ItemRow({ item }: { item: Item }) {
  const inner = (
    <>
      <span className="n">{item.id.slice(-2)}</span>
      <div>
        <b>{item.title}</b>
        {item.slug && <Standfirst slug={item.slug} />}
      </div>
      <span className="meta">
        <span>
          <strong>{item.tag}</strong>
          <small>{item.category}</small>
        </span>
        <span className="go" aria-hidden="true">
          ↗
        </span>
      </span>
    </>
  );
  return item.slug ? (
    <Link to="/case-studies/$slug" params={{ slug: item.slug }} preload="intent" className="pg-row">
      {inner}
    </Link>
  ) : (
    <a href={item.href ?? "#"} target="_blank" rel="noopener noreferrer" className="pg-row">
      {inner}
    </a>
  );
}

// A case study's own opening line, read from its write-up.
function Standfirst({ slug }: { slug: string }) {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    loadCaseStudy(slug).then((src) => {
      if (live && src) setText(splitArticle(src).standfirst ?? null);
    });
    return () => {
      live = false;
    };
  }, [slug]);
  return text ? <p>{text}</p> : null;
}
