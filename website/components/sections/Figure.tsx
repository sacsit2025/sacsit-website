import { rich } from "@/lib/rich";
import type { FigureSection } from "@/lib/spec";
import { Pic } from "./Asset";

/**
 * The kit's `r_figure()`: one image across the whole band at its natural ratio, with a mono caption -
 * for the wide hand-drawn strips a two-column slot would shrink to nothing. `ground` is the surface
 * it stands on ("light" = a white card with a hairline, for a brochure SVG drawn for a white page).
 */
export function Figure({ section: s }: { section: FigureSection }) {
  const ground = (s.ground ?? "").toLowerCase();
  const cls = "figwide" + (ground === "light" || ground === "navy" ? ` ${ground}` : "");
  return (
    <>
      {s.kicker ? <p className="kicker">{rich(s.kicker, "k")}</p> : null}
      {s.title ? <h2>{rich(s.title, "t")}</h2> : null}
      {s.intro ? <p className="measure">{rich(s.intro, "i")}</p> : null}
      <figure className={cls}>
        <Pic path={s.asset} slot="figure" alt={s.alt ?? s.caption ?? ""} />
        {s.caption ? <figcaption>{rich(s.caption, "cap")}</figcaption> : null}
      </figure>
    </>
  );
}

export default Figure;
