import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { hero } from "@/content/home";
import LivingStill from "./LivingStill";

/**
 * Band 1 - the hero: four still scenes, cross-faded, the headline over them; then the hero band.
 *
 * The markup is the mock's own (`.frames` with `.f .f1` ... `.f .f4`) because design.css animates
 * exactly those class names; the first scene is the page's largest paint, so it is given `priority`
 * and every other scene loads lazily behind it. The living-still canvas (D91) lies over the plates
 * and only breathes - it is the last child, as the mock's own slot was.
 *
 * D140 (Karim, 2026-10-13, layout A): the photo carries only the kicker, the headline and the
 * signature; the message sits in a navy band directly under it - the whole plant on the left, SOP
 * Copilot and its three helpers side by side on the right. The band's class is `heroband`, never
 * `band ...`, so the parity gate's band count stays the approved sheet's. Styles: premium.css §12.
 */
export function Hero() {
  return (
    <>
      <section className="hero">
        <div className="frames" aria-hidden="true">
          {hero.scenes.map((scene, i) => (
            <Pic
              key={scene.path}
              path={scene.path}
              slot="hero"
              alt={scene.alt}
              className={`f f${i + 1}`}
              priority={i === 0}
            />
          ))}
        </div>
        <div className="wrap">
          <p className="cat">{rich(hero.kicker, "cat")}</p>
          <h1>{rich(hero.h1, "h1")}</h1>
          <p className="sig">{rich(hero.sig, "sig")}</p>
        </div>
        <LivingStill />
      </section>
      <section className="heroband">
        <div className="wrap hb">
          <div className="hb-plant">
            <h2>{rich(hero.plant.head, "hp-head")}</h2>
            <h3>{rich(hero.plant.sub, "hp-sub")}</h3>
            <p>{rich(hero.plant.text, "hp-text")}</p>
          </div>
          <div className="hb-copilot">
            <h2>
              {rich(hero.copilot.head, "hc-head")}
              <span className="tag">{rich(hero.copilot.tag, "hc-tag")}</span>
            </h2>
            <div className="hb-items">
              {hero.copilot.items.map((item, i) => (
                <div className="hb-item" key={item.name}>
                  <h3>{rich(item.name, `hc-name-${i}`)}</h3>
                  <p>{rich(item.text, `hc-text-${i}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
