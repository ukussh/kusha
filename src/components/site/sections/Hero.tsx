import type React from "react";
import { useEffect, useRef, useState } from "react";
import "./board.css";

// Home board: a one-screen ruled grid, ported from the "Kushagra · Business Analyst" artifact.
// Styles live in board.css, scoped under .kb.
const EMAIL = "ua.kushagra@gmail.com";

const STATS = [
  { to: 14, pad: 0, sup: "M", label: "Financial loss prevented", note: "RCA run, fully contained" },
  { to: 120, pad: 0, sup: "K", label: "Records monitored daily", note: "with SQL and Power BI" },
  { to: 8, pad: 2, sup: "+", label: "Workflow tools mastered", note: "SQL, Postman, Power BI…" },
];

const CERTS = [
  {
    t: "azure ai essentials",
    p: "Core AI services and responsible-AI basics on Azure.",
    by: "Microsoft",
    d: "09/2025",
  },
  {
    t: "agile project management",
    p: "Scrum, Kanban and planning delivery in short cycles.",
    by: "Atlassian",
    d: "09/2025",
  },
  {
    t: "mongodb overview with aws",
    p: "Data modelling and running MongoDB on AWS.",
    by: "MongoDB",
    d: "07/2025",
  },
];

const CASES = [
  {
    t: "a blueprint for better lending",
    p: "The best of every lender, wired into one borrower journey.",
  },
  { t: "rapido's static otp paradox", p: "Why one PIN for every ride is a deliberate trade-off." },
  {
    t: "spotify's premium conversion",
    p: "Closing the value gap that keeps free users from paying.",
  },
];

const TOOLS = [
  ["SQL", "Querying data"],
  ["Power BI", "Dashboards"],
  ["Postman", "API testing"],
  ["Jira", "Delivery tracking"],
  ["Confluence", "Documentation"],
  ["Figma", "Wireframes"],
  ["Claude", "Writing & coding"],
  ["ChatGPT", "General AI assistance"],
  ["Framer", "Design & publish sites"],
  ["Antigravity", "IDE"],
  ["Notion", "Notes & specs"],
  ["Mixpanel", "Product analytics"],
];

function Counter({ to, pad, delay }: { to: number; pad: number; delay: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t0 = performance.now() + 300 + delay;
    let raf = 0;
    const f = (t: number) => {
      const k = Math.max(0, Math.min(1, (t - t0) / 1100));
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3)))).padStart(pad, "0");
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to, pad, delay]);
  return <b ref={ref}>{String(to).padStart(pad, "0")}</b>;
}

function CopyButton() {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  const copy = () => {
    const ok = () => {
      setState("done");
      setTimeout(() => setState("idle"), 1800);
    };
    try {
      navigator.clipboard.writeText(EMAIL).then(ok, () => setState("fail"));
    } catch {
      setState("fail");
    }
  };
  return (
    <button type="button" onClick={copy} className={state === "done" ? "done" : ""}>
      {state === "done" ? "copied ✓" : state === "fail" ? "ctrl+c" : "copy"}
    </button>
  );
}

// Marks a block that opens another page.
function Go() {
  return (
    <span className="go" aria-hidden="true">
      ↗
    </span>
  );
}

// Short desktop screens (Windows laptops with browser bars): lay the board out at the
// height it was designed for and scale it down to fit, instead of switching to the
// stacked phone layout.
const DESIGN_H = 800;
function useFitScale() {
  const [fit, setFit] = useState<number | null>(null);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setFit(w > 1200 && h > 600 && h < 821 ? (h - 46) / DESIGN_H : null);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return fit;
}

export default function HeroSection() {
  const fit = useFitScale();
  return (
    <div
      className={fit ? "kb kb-fit" : "kb"}
      style={fit ? ({ "--fit": fit } as React.CSSProperties) : undefined}
    >
      <main className="board">
        <header className="hdr">
          <div className="mark">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path
                fill="currentColor"
                d="M50 4 C53 38 62 47 96 50 C62 53 53 62 50 96 C47 62 38 53 4 50 C38 47 47 38 50 4Z"
              />
            </svg>
          </div>
          <div className="title">
            <h1>
              alrighty, I’m <span className="sl">(kushagra)</span>shaping product decisions in
              <span className="sl">(fintech)</span>
            </h1>
          </div>
        </header>

        <a className="cell about" href="#about">
          <h2 className="t">
            about
            <Go />
          </h2>
          <p className="ab-lead">
            I believe in a <em>minimal, essential</em> approach.
          </p>
          <div className="ab-body">
            <p>The balance between</p>
            <ol className="ab-list">
              <li>what a business needs,</li>
              <li>what users do,</li>
              <li>what the system can support.</li>
            </ol>
            <p>I turn unclear asks into PRDs a team can build on.</p>
          </div>
        </a>

        <figure className="cell photo">
          <div className="img">
            <img
              src="/assets/portrait-wide.jpg"
              alt="Portrait of Kushagra"
              width={1376}
              height={700}
            />
          </div>
          <figcaption>
            <small>
              <i />
              currently
            </small>
            <b>business analyst @ tramo</b>
          </figcaption>
        </figure>

        <a className="cell pp" href="#projects">
          <div className="proj">
            <h2 className="t">
              projects
              <Go />
            </h2>
            <p className="s pp-lead">Side builds, shipped and live.</p>
            <div className="s pp-more">
              <p>
                I created builds to challenge the existing experiences, question conventional
                approaches, and look beyond the obvious to uncover untapped opportunities.
              </p>
              <p>
                These were an opportunity to rethink how products deliver value, turn meaningful
                insights into thoughtful solutions, and create better product experiences.
              </p>
            </div>
          </div>
        </a>

        <a className="cell certs nr" href="#certifications">
          <h2 className="t">
            certifications
            <Go />
          </h2>
          <p className="s cs-sub">Recent courses in AI, agile delivery and data.</p>
          <ol className="cs">
            {CERTS.map((c, i) => (
              <li key={c.t} data-name={c.t}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{c.t}</b>
                  <p>{c.p}</p>
                </div>
                <div className="fig">
                  <strong>{c.by}</strong>
                </div>
              </li>
            ))}
          </ol>
        </a>

        <section className="cell exp">
          <h2 className="t">experience</h2>
          <div className="role-row">
            <p className="role">
              business analyst <span className="at">@</span> tramo
            </p>
            <span className="yr num">2025 – present</span>
          </div>
          <p className="s">Requirements, RCA and daily ops in fintech.</p>
          <div className="stats">
            {STATS.map((s, i) => (
              <div key={s.label}>
                <span className="v">
                  <Counter to={s.to} pad={s.pad} delay={i * 90} />
                  <sup>{s.sup}</sup>
                </span>
                <strong>{s.label}</strong>
                <small>{s.note}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="cell edu">
          <h2 className="t">education</h2>
          <p className="s">Learning and validating the knowledge.</p>
          <div className="rows">
            <div className="row">
              <b>Master’s</b>
              <span className="yr num">2023 – 25</span>
              <span>Computer Science</span>
            </div>
            <div className="row">
              <b>Bachelor’s</b>
              <span className="yr num">2020 – 23</span>
              <span>Mathematics</span>
            </div>
          </div>
        </section>

        <a className="cell comp nr" href="#competence">
          <h2 className="t">
            competence
            <Go />
          </h2>
          <p className="s">What guides my prioritization and decision-making.</p>
          <ol>
            <li>user research</li>
            <li>data &amp; insights</li>
            <li>decisions</li>
            <li>ux &amp; strategy</li>
            <li>leadership</li>
            <li>workflow &amp; tools</li>
          </ol>
        </a>

        <section className="cell prev">
          <div className="head">
            <h2 className="t">previously</h2>
            <span className="lab">2024 – 25</span>
          </div>
          <p className="s">Application Engineer @ DigiSure.</p>
          <div className="mrows">
            <div>
              <b>70%</b>
              <span>Resolution-rate uplift</span>
            </div>
            <div>
              <b>04+</b>
              <span>ERP projects delivered</span>
            </div>
            <div>
              <b>03</b>
              <span>User roles unified (RBAC)</span>
            </div>
          </div>
        </section>

        <a className="cell cases" href="#case-studies">
          <h2 className="t">
            case studies
            <Go />
          </h2>
          <p className="s cs-sub">Each started as a tangle.</p>
          <ol className="cs">
            {CASES.map((c, i) => (
              <li key={c.t}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{c.t}</b>
                  <p>{c.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </a>

        <aside className="cell talk nr">
          <div>
            <span className="lab">you paused.</span>
            <h2>
              fancy exchanging <b>ideas.</b>
            </h2>
          </div>
          <div>
            <div className="mail">
              <code>{EMAIL}</code>
              <CopyButton />
            </div>
            <div className="soc">
              <a
                href="https://www.linkedin.com/in/ukussh"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin <span>↗</span>
              </a>
              <a href="https://github.com/ukussh" target="_blank" rel="noopener noreferrer">
                github <span>↗</span>
              </a>
            </div>
          </div>
        </aside>

        <section className="cell tool nb nr">
          <div className="head">
            <h2 className="t">toolkit</h2>
            <span className="s">Day to day</span>
          </div>
          <div className="tools">
            {TOOLS.map(([b, s]) => (
              <div className="tl" title={s} key={b}>
                <b>{b}</b>
                <small>{s}</small>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
