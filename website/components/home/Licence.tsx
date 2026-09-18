import { rich } from "@/lib/rich";
import { licence } from "@/content/home";

/**
 * Band 7 - the licence. Its link goes to the contact band on this page: the band says "through your
 * partner" and there is no licence page (wiring decision of 2026-09-17, open for review).
 */
export function Licence() {
  return (
    <section className="band mist">
      <div className="wrap lic">
        <p className="kicker">{rich(licence.kicker, "k")}</p>
        <h2>{rich(licence.h2, "h2")}</h2>
        <p>{rich(licence.text, "text")}</p>
        <a className="plain" href={licence.link.href}>
          {licence.link.label}
        </a>
      </div>
    </section>
  );
}

export default Licence;
