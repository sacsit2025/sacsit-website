import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { Glyph } from "@/components/sections/Glyphs";
import { architecture } from "@/content/home";

/**
 * Band 4 - the architecture: the drawn backbone (D75, WB-04.svg) on navy, its ring legend, the six
 * numbered steps and the closing mono rule. The five legend glyphs are markup, not copy: they come
 * from the one definition in components/sections/Glyphs, in the order the mock draws them.
 */
export function Architecture() {
  return (
    <section className="band navy on-navy">
      <div className="wrap">
        <p className="kicker">{rich(architecture.kicker, "k")}</p>
        <h2>{rich(architecture.h2, "h2")}</h2>
        <p className="measure">{rich(architecture.intro, "intro")}</p>
        <figure className="backbone">
          <Pic
            path={architecture.drawing.path}
            slot="diagram"
            alt={architecture.drawing.alt}
          />
        </figure>
        <div className="legend rings">
          {architecture.legend.map((entry, i) => (
            <div key={entry.title}>
              <Glyph index={i} />
              <b>{rich(entry.title, `b${i}`)}</b>
              {rich(entry.line, `l${i}`)}
            </div>
          ))}
        </div>
        <div className="arch">
          {architecture.steps.map((step, i) => (
            <div key={step.n}>
              <span className="n">{step.n}</span>
              <h4>{rich(step.title, `h${i}`)}</h4>
              <p>{rich(step.text, `p${i}`)}</p>
            </div>
          ))}
        </div>
        <p className="lines" style={{ marginTop: "2rem" }}>
          {rich(architecture.lines, "lines")}
        </p>
      </div>
    </section>
  );
}

export default Architecture;
