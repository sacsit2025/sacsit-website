import { rich } from "@/lib/rich";
import type { DiagramSection } from "@/lib/spec";
import { Pic } from "./Asset";
import { Glyph } from "./Glyphs";

/**
 * The kit's `r_diagram()`: the drawing shown WHOLE - natural ratio, object-fit:contain, never
 * cropped - with the optional ring legend under it. `ground` defaults to navy (Home's band 4).
 * The drawing's alt never falls back to the caption here, exactly as the kit has it.
 */
export function Diagram({ section: s }: { section: DiagramSection }) {
  const ground = (s.ground ?? "navy").toLowerCase();
  return (
    <>
      {s.kicker ? <p className="kicker">{rich(s.kicker, "k")}</p> : null}
      {s.title ? <h2>{rich(s.title, "t")}</h2> : null}
      {s.intro ? <p className="measure">{rich(s.intro, "i")}</p> : null}
      <figure className={`backbone ${ground}`}>
        <Pic path={s.asset} slot="diagram" alt={s.alt ?? ""} />
        {s.caption ? <figcaption>{rich(s.caption, "cap")}</figcaption> : null}
      </figure>
      {s.legend?.length ? (
        <div className="legend rings">
          {s.legend.map((e, i) => (
            <div key={i}>
              {e.swatch ? <i className="sw" style={{ background: e.swatch }} aria-hidden="true">{i + 1}</i> : <Glyph index={i} />}
              <b>{rich(e.title, `lt${i}`)}</b>
              {rich(e.line, `ll${i}`)}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Diagram;
