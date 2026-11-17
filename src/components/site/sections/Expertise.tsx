import { Page, Rows } from "../Page";

const expertise = [
  {
    title: "user research",
    description:
      "Competitive teardowns, assumption mapping, and quick prototype tests put ideas in front of real users early, so weak ones fail cheaply and strong ones arrive with evidence.",
  },
  {
    title: "data & insights",
    description:
      "Dashboards and metric definitions built for teams with plenty of numbers and little meaning. Each metric is tied to a decision, so the conversation moves from “what happened” to “what do we do next.”",
  },
  {
    title: "decisions & execution",
    description:
      "Trade-offs get settled against explicit criteria, with named owners and dates. A crowded backlog becomes a sequenced plan that stakeholders can see, challenge, and commit to.",
  },
  {
    title: "ux & strategy",
    description:
      "Early-stage ideas become user journeys, information architecture, and wireframed workflows, then get scoped into an MVP that’s small enough to ship and sharp enough to learn from.",
  },
  {
    title: "product leadership",
    description:
      "Fractional product support for teams without a dedicated PM: shaping the roadmap, keeping stakeholders informed, and making honest calls on where automation or AI is worth the investment and where it isn’t.",
  },
  {
    title: "workflow & tools",
    description:
      "Manual handoffs, duplicate entry, and workarounds get replaced with purpose-built internal tools and cleaner operating routines, so teams spend their hours on the work they were hired for.",
  },
];

export default function ExpertiseSection() {
  return (
    <Page
      title="competence"
      home="#main"
      kicker="in practice: where i add the most."
      lead={
        <>
          my work tends to fall into a few areas.
          <br />
          <span className="pg-sub">if this resonates, I’d love to talk.</span>
        </>
      }
    >
      <Rows>
        {expertise.map((a, i) => (
          <li key={a.title}>
            <div className="pg-row">
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <b>{a.title}</b>
                <p>{a.description}</p>
              </div>
              <span />
            </div>
          </li>
        ))}
      </Rows>
    </Page>
  );
}
