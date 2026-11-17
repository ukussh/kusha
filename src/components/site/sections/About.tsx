import { Page } from "../Page";

const traits = [
  {
    label: "builder",
    body: [
      <>
        Building products around what users do, not what they’re expected to do, is where I thrive.
        Most of the “<b>product decisions</b>” in my case studies are really just the result of
        asking that question long enough.
      </>,
      "Funnel analytics, experimentation, session insights, and product metrics guide my decisions to know exactly what’s broken and for whom.",
    ],
  },
  {
    label: "bridge",
    body: [
      "Navigating teams and leadership to deliver results has been a constant across my roles. I have aligned Engineering, Design, Finance, Compliance, and Operations around shared goals.",
    ],
  },
  {
    label: "principles",
    body: [
      "Whether it’s outcome biased OKRs, compliance delivery, or customer obsession, I absorb the mission and translate it into daily decisions because outcomes matter more than output to me.",
      "When a requirement doesn’t have a clean answer yet, I write down the actual question, take it back to the person who can answer it, and document the decision, rather than guessing and hoping it holds.",
    ],
  },
];

const notes = [
  <>
    having a technical background and having coded most of the time, I naturally think in{" "}
    <b>systems</b> rather than isolated features. I approach problems <b>domain-first</b>, balancing
    user needs, business objectives, and technical constraints.
  </>,
  <>
    breaking <b>ambiguity</b> into smaller, manageable parts and working towards practical
    solutions, help me bridge technical discussions with business needs.
  </>,
  <>
    across consumer fintech products with <b>26M+</b> transactions and enterprise SaaS, I focus on
    turning individual customer requirements into scalable, repeatable product capabilities.
  </>,
  <>
    fluent in PM fundamentals and the product lifecycle, strategy and roadmaps, user research,
    market and competitive analysis, growth and experimentation, along with{" "}
    <b>AI, SaaS &amp; B2C platforms</b>.
  </>,
];

export default function AboutSection() {
  return (
    <Page title="about" home="#main" kicker="to begin:" lead="the name is kushagra.">
      <div className="ab-s">
        <div className="ab-s-left">
          <p className="ab-s-who">
            <b>business analyst</b> with a year and counting
            <br />
            across <em>fintech &amp; enterprise</em>, and a builder in his spare time.
          </p>
          {notes.map((n, i) => (
            <p key={i}>{n}</p>
          ))}
        </div>
        <div className="ab-s-right">
          {traits.map((t) => (
            <div key={t.label}>
              <h3>{t.label}</h3>
              {t.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
