import { rich } from "@/lib/rich";
import type { HeroSpec } from "@/lib/spec";
import { Pic } from "./Asset";
import HeroFilm from "./HeroFilm";

/** a knowledge path as the site serves it: knowledge/assets/<family>/<file> -> /assets/<family>/<file> (scripts/sync-assets.mjs) */
const served = (p: string) => "/" + p.replace(/^knowledge\//, "");

/**
 * The inner-page hero - the kit's `hero()`: one plate under Home's scrim, the kicker, the H1, the dek.
 *
 * ONE deliberate difference from the mock (D94's exception): the mock puts id="write" on this
 * section, which collides with the contact band's own id="write" - so every "Write to us" link
 * jumped to the top of the page instead of the form. Here the hero carries NO id; #write belongs
 * to the contact band alone.
 */
export function Hero({ hero: h, group }: { hero: HeroSpec; group?: string }) {
  // the hero dresses itself by the page it belongs to (Karim, 2026-09-18): capability pages take
  // the glass card, partner pages take the split, Platform and Why SOP stay exactly as they were.
  return (
    <section className={"hero inner" + (group ? " hero-" + group : "")}>
      {h.plate ? (
        <div className="frames" aria-hidden="true">
          <Pic path={h.plate} slot="hero" alt="" className="f f1" priority />
          {h.film ? <HeroFilm src={served(h.film.src)} poster={served(h.plate)} callouts={h.film.callouts} /> : null}
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
