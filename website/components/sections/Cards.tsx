import { Fragment, type CSSProperties } from "react";
import { rich } from "@/lib/rich";
import type { CardsSection } from "@/lib/spec";
import { Pic } from "./Asset";

/**
 * The kit's `r_cards()`: rows of target cards, each a small 8:5 plate, a title, an italic trigger
 * line and two lines. Home's five-up grid is the default; `per` re-counts it through --tc.
 */
export function Cards({ section: s }: { section: CardsSection }) {
  // an EMPTY groups list is no groups at all (the kit tests it for truth, Python-style)
  const groups = s.groups?.length ? s.groups : [{ cards: s.cards ?? [] }];
  const gridClass = s.per ? "tcards tc" : "tcards";
  const gridStyle = s.per ? ({ "--tc": String(Math.trunc(s.per)) } as CSSProperties) : undefined;
  return (
    <>
      {s.kicker ? <p className="kicker">{rich(s.kicker, "k")}</p> : null}
      {s.title ? <h2>{rich(s.title, "t")}</h2> : null}
      {groups.map((g, gi) => (
        <Fragment key={gi}>
          {g.label ? <h3>{rich(g.label, `g${gi}`)}</h3> : null}
          <div className={gridClass} style={gridStyle}>
            {(g.cards ?? []).map((c, ci) => (
              <div className="tcard" key={ci}>
                <Pic path={c.plate} slot="card" alt={c.alt ?? ""} />
                <h4>{rich(c.title, `ct${gi}-${ci}`)}</h4>
                {c.trigger ? <p className="trig">{rich(c.trigger, `cg${gi}-${ci}`)}</p> : null}
                {c.text ? <p>{rich(c.text, `cx${gi}-${ci}`)}</p> : null}
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
}

export default Cards;
