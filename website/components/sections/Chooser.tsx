import { rich } from "@/lib/rich";
import type { ChooserSection } from "@/lib/spec";

/**
 * The kit's `r_chooser()` - the concept-doc law's recipe table: the mono chip strip of the dials,
 * then the rows. Every cell names its column in `data-h`, which is what the phone layout prints
 * above it once the table is broken into stacked cells.
 */
export function Chooser({ section: s }: { section: ChooserSection }) {
  const cols = s.columns ?? [];
  return (
    <section className="chooser">
      {s.title ? <p className="allh">{rich(s.title, "t")}</p> : null}
      {s.chips?.length ? (
        <ul className="chips">
          {s.chips.map((c, i) => (
            <li key={i}>{rich(c, `c${i}`)}</li>
          ))}
        </ul>
      ) : null}
      <div className="ctwrap">
        <table className="ctable">
          <thead>
            <tr>
              {cols.map((c, i) => (
                <th key={i}>{rich(c, `h${i}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(s.rows ?? []).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  // data-h carries the header verbatim (an attribute): the phone layout prints it
                  <td key={j} data-h={cols[j] ?? ""}>
                    {rich(cell, `r${i}-${j}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {s.note ? <p className="note">{rich(s.note, "note")}</p> : null}
    </section>
  );
}

export default Chooser;
