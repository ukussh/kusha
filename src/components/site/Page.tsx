import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import "./sections/board.css";
import "./pages.css";

// Shell for every page opened from the home board: the same white page, rounded
// frame, sparkle and lowercase header, with a way back home in the header row.
export function Page({
  title,
  kicker,
  lead,
  home,
  homeLabel = "home",
  children,
}: {
  title: string;
  kicker?: string;
  lead?: ReactNode;
  /** Either a click handler (deck panels) or an href (standalone routes). */
  home: (() => void) | string;
  homeLabel?: string;
  children: ReactNode;
}) {
  const back =
    typeof home === "string" && home.startsWith("#") ? (
      // Deck panels: a plain hash link fires hashchange, which the deck follows.
      <a className="pg-home" href={home}>
        <span aria-hidden="true">←</span> {homeLabel}
      </a>
    ) : typeof home === "string" ? (
      // Client-side link: returning to the deck keeps the app loaded, so there is no reload
      // flash of the home board before the named panel appears.
      <Link className="pg-home" to={home.split("#")[0] || "/"} hash={home.split("#")[1]}>
        <span aria-hidden="true">←</span> {homeLabel}
      </Link>
    ) : (
      <button type="button" className="pg-home" onClick={home}>
        <span aria-hidden="true">←</span> {homeLabel}
      </button>
    );

  return (
    <div className="kb kp">
      <main className="pboard">
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
            <h1>{title}</h1>
            {back}
          </div>
        </header>
        {(kicker || lead) && (
          <section className="pg-intro">
            {kicker && <p className="pg-kicker">{kicker}</p>}
            {lead && <p className="pg-lead">{lead}</p>}
          </section>
        )}
        <div className="pg-body">{children}</div>
      </main>
    </div>
  );
}

/** Numbered ruled rows, the same as the home board's case studies list. */
export function Rows({ children }: { children: ReactNode }) {
  return <ol className="pg-rows">{children}</ol>;
}
