import Link from "next/link";
import { rich } from "@/lib/rich";
import { differences } from "@/content/home";

/** Band 6 - what makes SOP different: eight cells on navy, then the button to the whole page. */
export function Differences() {
  return (
    <section className="band navy on-navy">
      <div className="wrap">
        <p className="kicker">{rich(differences.kicker, "k")}</p>
        <h2>{rich(differences.h2, "h2")}</h2>
        <p className="measure">{rich(differences.intro, "intro")}</p>
        <div className="diff">
          {differences.items.map((item, i) => (
            <div key={item.kicker}>
              <p className="kicker">{rich(item.kicker, `k${i}`)}</p>
              <h4>{rich(item.title, `h${i}`)}</h4>
              <p>{rich(item.text, `p${i}`)}</p>
            </div>
          ))}
        </div>
        <Link className="cta" href={differences.cta.href}>
          {differences.cta.label}
        </Link>
      </div>
    </section>
  );
}

export default Differences;
