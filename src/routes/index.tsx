import { createFileRoute } from "@tanstack/react-router";
import SwipeDeck from "@/components/site/SwipeDeck";

const title = "kusha";
const description =
  "kushagra portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SwipeDeck />;
}
