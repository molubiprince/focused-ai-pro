function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={key} className="rounded bg-muted px-1 py-0.5 text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return <span key={key}>{part}</span>;
  });
}

/** Minimal markdown renderer for AI output: headings, bullets, ordered lists, bold. */
export function Markdown({ content, className }: { content: string; className?: string }) {
  const lines = content.replace(/\r/g, "").split("\n");
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    const items = list.items.map((item, i) => (
      <li key={i} className="leading-relaxed">
        {renderInline(item, `li-${blocks.length}-${i}`)}
      </li>
    ));
    blocks.push(
      list.ordered ? (
        <ol key={`b${blocks.length}`} className="mb-3 list-decimal space-y-1.5 pl-5">
          {items}
        </ol>
      ) : (
        <ul key={`b${blocks.length}`} className="mb-3 list-disc space-y-1.5 pl-5">
          {items}
        </ul>
      ),
    );
    list = null;
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) {
      flush();
      return;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      blocks.push(
        <h3
          key={`b${blocks.length}`}
          className="mt-4 mb-2 text-sm font-semibold tracking-tight text-foreground first:mt-0"
        >
          {renderInline(heading[2], `h-${blocks.length}`)}
        </h3>,
      );
      return;
    }
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      if (!list || list.ordered) {
        flush();
        list = { ordered: false, items: [] };
      }
      list.items.push(bullet[1]);
      return;
    }
    const ordered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (ordered) {
      if (!list || !list.ordered) {
        flush();
        list = { ordered: true, items: [] };
      }
      list.items.push(ordered[1]);
      return;
    }
    flush();
    blocks.push(
      <p key={`b${blocks.length}`} className="mb-3 leading-relaxed last:mb-0">
        {renderInline(line, `p-${blocks.length}`)}
      </p>,
    );
  });
  flush();

  return <div className={className}>{blocks}</div>;
}
