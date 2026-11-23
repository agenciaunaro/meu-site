import type { Block } from "@/lib/types";
import { InlineText } from "./InlineText";

export function ArticleBody({ blocks, midSlot }: { blocks: Block[]; midSlot?: React.ReactNode }) {
  const h2s = blocks.map((b, i) => (b.type === "h2" ? i : -1)).filter((i) => i >= 0);
  const midAt = h2s[Math.floor(h2s.length / 2)] ?? -1;
  return (
    <div className="prose-unaro">
      {blocks.map((b, i) => {
        const node = (() => {
          switch (b.type) {
            case "p": return <p key={i}><InlineText text={b.text} /></p>;
            case "h2": return <h2 key={i} id={b.id}>{b.text}</h2>;
            case "h3": return <h3 key={i}>{b.text}</h3>;
            case "list": return <ul key={i}>{b.items.map((it) => <li key={it}><InlineText text={it} /></li>)}</ul>;
            case "quote": return <blockquote key={i}>{b.text}</blockquote>;
            case "callout": return (
              <aside key={i} className="rounded-2xl bg-mist p-6 sm:p-8 !mt-10 !mb-10">
                <p className="t-eyebrow text-ash">{b.title}</p>
                <p className="mt-3 font-display text-[1.25rem] leading-snug tracking-[-0.02em] text-ink"><InlineText text={b.text} /></p>
              </aside>
            );
            case "table": return (
              <div key={i} className="-mx-1 overflow-x-auto px-1"><table><thead><tr>{b.head.map((h, k) => <th key={k} scope="col">{h}</th>)}</tr></thead>
                <tbody>{b.rows.map((r, k) => <tr key={k}>{r.map((c, j) => j === 0 ? <th key={j} scope="row" className="!text-ink !normal-case !tracking-normal !text-[0.98rem]">{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>
            );
          }
        })();
        return i === midAt && midSlot ? [<div key={`mid${i}`} className="!my-14">{midSlot}</div>, node] : node;
      })}
    </div>
  );
}
