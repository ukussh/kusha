import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import GrainOverlay from "@/components/site/GrainOverlay";
import { renderMarkdown, extractTitle } from "@/lib/markdown";

export const Route = createFileRoute("/case-studies/$slug")({
  component: CaseStudyPage,
});

type State =
  | { status: "loading" }
  | { status: "ready"; source: string }
  | { status: "missing" };

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetch(`/case-studies/${slug}.md`)
      .then(res => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
      .then(text => {
        // A missing file can be served as the SPA shell, so reject HTML too.
        if (cancelled) return;
        if (/^\s*<!doctype html/i.test(text)) setState({ status: "missing" });
        else setState({ status: "ready", source: text });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "missing" });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const source = state.status === "ready" ? state.source : "";
  const title = useMemo(() => extractTitle(source), [source]);
  const body = useMemo(() => (source ? renderMarkdown(source) : null), [source]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <div className="min-h-screen bg-background">
      <GrainOverlay />

      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/85 backdrop-blur-md">
        <div className="deck-inner flex items-center justify-between py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs lowercase text-foreground/70 transition-colors hover:text-foreground md:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            back
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            Case Study
          </span>
        </div>
      </header>

      <main className="deck-inner pb-24 pt-10 md:pt-16">
        {/* Same reading measure as the rest of the site's prose. */}
        <article className="mx-auto w-full max-w-3xl">
          {state.status === "loading" && (
            <p className="font-mono text-sm text-foreground/50">loading…</p>
          )}

          {state.status === "missing" && (
            <div>
              <h1 className="mb-4 font-sans text-3xl font-light lowercase tracking-tight text-foreground md:text-5xl">
                case study not found
              </h1>
              <p className="mb-8 text-foreground/70">
                No write-up exists at this address.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 font-mono text-xs lowercase text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <ArrowLeft className="h-4 w-4" />
                back to portfolio
              </Link>
            </div>
          )}

          {state.status === "ready" && body}
        </article>
      </main>
    </div>
  );
}
