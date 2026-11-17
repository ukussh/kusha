import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Page } from "@/components/site/Page";
import { renderMarkdown, extractTitle, splitArticle } from "@/lib/markdown";
import { CASE_STUDY_TAGS, loadCaseStudy, readingMinutes } from "@/lib/case-study";

export const Route = createFileRoute("/case-studies/$slug")({
  // Client navigations load the write-up before the route commits, so the page
  // arrives complete and the title can morph in. The server render has no
  // origin to fetch from and leaves it to the component.
  loader: async ({ params }) =>
    typeof window === "undefined" ? null : { source: await loadCaseStudy(params.slug) },
  component: CaseStudyPage,
});

type State = { status: "loading" } | { status: "ready"; source: string } | { status: "missing" };

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const preloaded = Route.useLoaderData();
  const [fetched, setFetched] = useState<{ slug: string; source: string | null } | null>(null);

  useEffect(() => {
    if (preloaded) return;
    let cancelled = false;
    loadCaseStudy(slug).then((source) => {
      if (!cancelled) setFetched({ slug, source });
    });
    return () => {
      cancelled = true;
    };
  }, [slug, preloaded]);

  const result = preloaded ?? (fetched?.slug === slug ? fetched : null);
  const state: State = !result
    ? { status: "loading" }
    : result.source
      ? { status: "ready", source: result.source }
      : { status: "missing" };

  const source = state.status === "ready" ? state.source : "";
  const title = useMemo(() => extractTitle(source), [source]);
  const article = useMemo(() => (source ? splitArticle(source) : null), [source]);
  const body = useMemo(() => (article ? renderMarkdown(article.body) : null), [article]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <Page title="case study" home="/#case-studies" homeLabel="case studies">
      <article className="case-article pg-article">
        {state.status === "loading" && <p>loading…</p>}

        {state.status === "missing" && (
          <div>
            <h1>case study not found</h1>
            <p>No write-up exists at this address.</p>
            <p>
              <Link to="/">← back to the portfolio</Link>
            </p>
          </div>
        )}

        {state.status === "ready" && article && (
          <>
            <header className="pg-art-head">
              <p className="pg-kicker">
                Case study
                {CASE_STUDY_TAGS[slug] && <> · {CASE_STUDY_TAGS[slug]}</>} ·{" "}
                {readingMinutes(source)} min read
              </p>
              {article.title && <h1 className="pg-art-title">{article.title}</h1>}
              {article.standfirst && <p className="pg-art-stand">{article.standfirst}</p>}
            </header>
            {body}
          </>
        )}
      </article>
    </Page>
  );
}
