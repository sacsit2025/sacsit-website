import { rich } from "@/lib/rich";
import type { HeroSpec } from "@/lib/spec";
import { Pic } from "./Asset";

/**
 * The inner-page hero - the kit's `hero()`: one plate under Home's scrim, the kicker, the H1, the dek.
 *
 * ONE deliberate difference from the mock (D94's exception): the mock puts id="write" on this
 * section, which collides with the contact band's own id="write" - so every "Write to us" link
 * jumped to the top of the page instead of the form. Here the hero carries NO id; #write belongs
 * to the contact band alone.
 */
export function Hero({ hero: h }: { hero: HeroSpec }) {
  return (
    <section className="hero inner">
      {h.plate ? (
        <div className="frames" aria-hidden="true">
          <Pic path={h.plate} slot="hero" alt="" className="f f1" priority />
        </div>
      ) : null}
      <div className="wrap">
        <p className="cat">{rich(h.kicker, "k")}</p>
        <h1>{rich(h.h1, "h1")}</h1>
        {h.dek ? <p className="dek">{rich(h.dek, "dek")}</p> : null}
        {h.sig ? <p className="sig">{rich(h.sig, "sig")}</p> : null}
      </div>
    </section>
  );
}

export default Hero;
