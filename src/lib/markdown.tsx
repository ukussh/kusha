import type { ReactNode } from "react";

/**
 * Small markdown renderer covering exactly what the case-study files use:
 * ATX headings, paragraphs, blockquotes, bullet lists, horizontal rules,
 * pipe tables with alignment, and inline bold / italic / code / links.
 *
 * It builds React elements rather than HTML strings, so nothing in the source
 * file can inject markup.
 */

type Align = "left" | "center" | "right";

// Order matters: bold is tried before italic so `**x**` isn't read as `*`.
const INLINE = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function renderInline(text: string, prefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;

  for (const match of text.matchAll(INLINE)) {
    const at = match.index ?? 0;
    if (at > last) out.push(text.slice(last, at));

    const token = match[0];
    const key = `${prefix}i${n++}`;

    if (token.startsWith("**")) {
      out.push(
        <strong key={key} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      out.push(
        <code
          key={key}
          className="rounded bg-foreground/10 px-1.5 py-0.5 font-sans text-[0.85em] text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (link) {
        out.push(
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-foreground/35 decoration-1 underline-offset-4 transition-colors hover:decoration-foreground"
          >
            {link[1]}
          </a>,
        );
      } else {
        out.push(token);
      }
    } else {
      out.push(
        <em key={key} className="not-italic text-foreground">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = at + token.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

const HEADING_CLASS: Record<number, string> = {
  1: "t-h3 mt-16 mb-5 first:mt-0 md:mt-20",
  2: "t-h4 mt-12 mb-4 text-[1.375rem] first:mt-0",
  3: "t-h4 mt-10 mb-3 text-[1.1875rem] first:mt-0",
  4: "t-h4 mt-8 mb-3 first:mt-0",
  5: "t-h4 mt-6 mb-2 text-base first:mt-0",
  6: "t-label mt-6 mb-2 text-muted-foreground first:mt-0",
};

const isBlank = (s: string) => !s.trim();
const isHeading = (s: string) => /^#{1,6}\s+/.test(s);
const isRule = (s: string) => /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(s);
const isQuote = (s: string) => /^\s*>/.test(s);
const isBullet = (s: string) => /^\s*[-*+]\s+/.test(s);
const isTableRow = (s: string) => s.trim().startsWith("|");
const isTableDivider = (s: string) =>
  /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(s) && s.includes("-");

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

function alignments(divider: string): Align[] {
  return cells(divider).map((c) => {
    const left = c.startsWith(":");
    const right = c.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    return "left";
  });
}

const alignClass: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function renderMarkdown(source: string): ReactNode[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;
  const nextKey = () => `b${key++}`;

  while (i < lines.length) {
    const line = lines[i];

    if (isBlank(line)) {
      i++;
      continue;
    }

    // Horizontal rule — checked before lists so `---` isn't read as a bullet.
    if (isRule(line)) {
      out.push(<hr key={nextKey()} className="my-14 border-t" />);
      i++;
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const Tag = `h${level}` as "h1";
      out.push(
        <Tag key={nextKey()} className={HEADING_CLASS[level]}>
          {renderInline(heading[2], nextKey())}
        </Tag>,
      );
      i++;
      continue;
    }

    // Pipe table: header row followed by an alignment divider.
    if (isTableRow(line) && i + 1 < lines.length && isTableDivider(lines[i + 1])) {
      const header = cells(line);
      const align = alignments(lines[i + 1]);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(cells(lines[i]));
        i++;
      }
      out.push(
        // Wide tables scroll inside their own box rather than the page.
        <div key={nextKey()} className="my-10 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse font-sans text-[0.875rem]">
            <thead>
              <tr className="border-b border-foreground/25">
                {header.map((c, n) => (
                  <th
                    key={n}
                    className={`t-label px-3 py-3 text-muted-foreground first:pl-0 ${
                      alignClass[align[n] ?? "left"]
                    }`}
                  >
                    {renderInline(c, `th${n}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-b border-foreground/10">
                  {row.map((c, n) => (
                    <td
                      key={n}
                      className={`px-3 py-3 align-top text-foreground/85 first:pl-0 ${alignClass[align[n] ?? "left"]}`}
                    >
                      {renderInline(c, `td${r}-${n}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (isQuote(line)) {
      const buf: string[] = [];
      while (i < lines.length && isQuote(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      out.push(
        <blockquote
          key={nextKey()}
          className="my-10 border-l-2 border-foreground pl-5 font-serif text-[1.1875rem] leading-[1.6] text-foreground md:pl-7"
        >
          {renderInline(buf.join(" ").trim(), nextKey())}
        </blockquote>,
      );
      continue;
    }

    if (isBullet(line)) {
      const items: string[] = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
        i++;
      }
      out.push(
        <ul key={nextKey()} className="t-copy my-6 space-y-3">
          {items.map((item, n) => (
            <li key={n} className="flex gap-3 text-foreground/85">
              <span aria-hidden className="mt-[0.85em] h-px w-3 shrink-0 bg-foreground/60" />
              <span className="min-w-0 flex-1">{renderInline(item, `li${n}`)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph: run on until a blank line or the start of another block.
    const buf: string[] = [];
    while (
      i < lines.length &&
      !isBlank(lines[i]) &&
      !isHeading(lines[i]) &&
      !isRule(lines[i]) &&
      !isQuote(lines[i]) &&
      !isBullet(lines[i]) &&
      !isTableRow(lines[i])
    ) {
      buf.push(lines[i].trim());
      i++;
    }
    out.push(
      <p key={nextKey()} className="t-copy my-5 text-foreground/85">
        {renderInline(buf.join(" "), nextKey())}
      </p>,
    );
  }

  return out;
}

/** First `# ` heading, used for the page and browser-tab title. */
export function extractTitle(source: string): string | null {
  const m = /^#\s+(.+)$/m.exec(source.replace(/\r\n/g, "\n"));
  return m ? m[1].trim() : null;
}

/**
 * Splits a write-up into an article opening: the `# ` title, a standfirst
 * (a `## ` subtitle or the opening paragraph directly under the title), and
 * the remaining body markdown.
 */
export function splitArticle(source: string): {
  title: string | null;
  standfirst: string | null;
  body: string;
} {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  const skipBlank = () => {
    while (i < lines.length && isBlank(lines[i])) i++;
  };

  skipBlank();
  const titleMatch = /^#\s+(.+)$/.exec(lines[i] ?? "");
  if (!titleMatch) return { title: null, standfirst: null, body: source };
  i++;
  skipBlank();

  let standfirst: string | null = null;
  const sub = /^##\s+(.+)$/.exec(lines[i] ?? "");
  if (sub) {
    standfirst = sub[1].trim();
    i++;
  } else if (lines[i] && !isHeading(lines[i]) && !/^[>\-*|`]|^\d+\./.test(lines[i])) {
    const para: string[] = [];
    while (i < lines.length && !isBlank(lines[i])) para.push(lines[i++].trim());
    standfirst = para.join(" ");
  }

  return { title: titleMatch[1].trim(), standfirst, body: lines.slice(i).join("\n") };
}
