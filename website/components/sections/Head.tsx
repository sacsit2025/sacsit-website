import { rich } from "@/lib/rich";
import type { HeadSection } from "@/lib/spec";
import { Pic } from "./Asset";

/**
 * The numbered chapter head - the kit's `r_head()`: `01/06`, the title, the statement, an 8:5 plate.
 * No plate -> .caphead.nopic, which keeps the head at two columns.
 *
 * TWO VOICES (Karim, 2026-09-18 - option B of the lead round). A head may speak twice: the statement
 * in `promise`, and the rest of the paragraph in `brief`. A head that has both wears `.twin`, and its
 * paragraph takes the third column - the one the photograph uses when there is a plate. The CSS is
 * app/lead.css; a head without a `brief` is unchanged but for the colour.
 */
export function Head({ section: s }: { section: HeadSection }) {
  const cls = ["caphead", s.plate ? null : "nopic", s.brief ? "twin" : null]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      <span className="n">
        {rich(s.n, "n")}
        {s.of ? <em>/{rich(s.of, "of")}</em> : null}
      </span>
      <h3>{rich(s.title, "h")}</h3>
      {s.promise ? <p className="promise">{rich(s.promise, "p")}</p> : null}
      {s.brief ? <p className="brief">{rich(s.brief, "b")}</p> : null}
      {s.plate ? (
        <div className="pic headpic">
          <Pic path={s.plate} slot="head" alt={s.alt ?? ""} />
        </div>
      ) : null}
    </div>
  );
}

export default Head;
