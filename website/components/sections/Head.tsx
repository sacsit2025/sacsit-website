import { rich } from "@/lib/rich";
import type { HeadSection } from "@/lib/spec";
import { Pic } from "./Asset";

/**
 * The numbered chapter head - the kit's `r_head()`: `01/06`, the title, the promise, an 8:5 plate.
 * No plate -> .caphead.nopic, which keeps the head at two columns.
 */
export function Head({ section: s }: { section: HeadSection }) {
  return (
    <div className={s.plate ? "caphead" : "caphead nopic"}>
      <span className="n">
        {rich(s.n, "n")}
        {s.of ? <em>/{rich(s.of, "of")}</em> : null}
      </span>
      <h3>{rich(s.title, "h")}</h3>
      {s.promise ? <p className="promise">{rich(s.promise, "p")}</p> : null}
      {s.plate ? (
        <div className="pic headpic">
          <Pic path={s.plate} slot="head" alt={s.alt ?? ""} />
        </div>
      ) : null}
    </div>
  );
}

export default Head;
