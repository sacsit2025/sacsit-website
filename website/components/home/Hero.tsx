import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { hero } from "@/content/home";
import LivingStill from "./LivingStill";

/**
 * Band 1 - the hero: four still scenes, cross-faded, the headline over them.
 *
 * The markup is the mock's own (`.frames` with `.f .f1` ... `.f .f4`) because design.css animates
 * exactly those class names; the first scene is the page's largest paint, so it is given `priority`
 * and every other scene loads lazily behind it. The living-still canvas (D91) lies over the plates
 * and only breathes - it is the last child, as the mock's own slot was.
 */
export function Hero() {
  return (
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
        <p className="dek">{rich(hero.dek, "dek")}</p>
        <p className="sig">{rich(hero.sig, "sig")}</p>
      </div>
      <LivingStill />
    </section>
  );
}

export default Hero;
