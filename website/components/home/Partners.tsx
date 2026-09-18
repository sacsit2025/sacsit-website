import Link from "next/link";
import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { partners } from "@/content/home";

/**
 * Band 8 - partners: the wide plate opens the band edge to edge (which is why the section's own
 * padding-top is zeroed and the wrap carries its own), then the two partnership models.
 * D96: no exclusivity clause and no end-client clause - they left the copy and do not come back.
 */
export function Partners() {
  return (
    <section
      className="band navy on-navy"
      id={partners.id}
      style={{ paddingTop: "0", position: "relative" }}
    >
      {/* the plate is full-bleed (it stands outside the .wrap), so it is served at 100vw */}
      <Pic path={partners.band.path} slot="hero" alt={partners.band.alt} className="pband" />
      <div className="wrap" style={{ paddingTop: "64px" }}>
        <p className="kicker">{rich(partners.kicker, "k")}</p>
        <h2>{rich(partners.h2, "h2")}</h2>
        <p className="measure">{rich(partners.intro, "intro")}</p>
        <div className="two">
          {partners.models.map((model, i) => (
            <div key={model.title}>
              <h3>{rich(model.title, `h${i}`)}</h3>
              <p className="pr">{rich(model.promise, `pr${i}`)}</p>
              <p>{rich(model.text, `p${i}`)}</p>
              <Link className="plain" href={model.link.href}>
                {model.link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
