import type { CSSProperties } from "react";
import { rich } from "@/lib/rich";
import type { ProseSection } from "@/lib/spec";

/**
 * The kit's `r_prose()`: a title and N columns of short paragraphs with bold leads.
 * The spec decides the columns; --pcols carries the number to the grid, which stacks on the phone.
 */
export function Prose({ section: s }: { section: ProseSection }) {
  // an empty `cols` is no columns at all: the one column of `items`, as the kit has it
  const cols = s.cols?.length ? s.cols : [s.items ?? []];
  return (
    <section className="prose">
      {s.title ? <p className="allh">{rich(s.title, "t")}</p> : null}
      <div className="pcols" style={{ "--pcols": String(cols.length) } as CSSProperties}>
        {cols.map((col, i) => (
          <div key={i}>
            {s.heads?.[i] ? <h3 className="ph">{rich(s.heads[i], `h${i}`)}</h3> : null}
            <ul>
              {col.map((p, j) => (
                <li key={j}>{rich(p, `p${i}-${j}`)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Prose;
