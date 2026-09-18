import { Fragment } from "react";
import Link from "next/link";
import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { availability } from "@/content/home";

/**
 * Band 3 - availability: three headed paragraphs and the mono rule at the left, the plate and the
 * four chips at the right. The inline `margin-top` on the link's paragraph is the mock's own.
 */
export function Availability() {
  return (
    <section className="band mist">
      <div className="wrap">
        <p className="kicker">{rich(availability.kicker, "k")}</p>
        <h2>{rich(availability.h2, "h2")}</h2>
        <div className="avail">
          <div>
            {availability.paragraphs.map((p, i) => (
              <Fragment key={p.title}>
                <h4>{rich(p.title, `h${i}`)}</h4>
                <p>{rich(p.text, `p${i}`)}</p>
              </Fragment>
            ))}
            <div className="lines">{rich(availability.lines, "lines")}</div>
            <p style={{ marginTop: "1.2rem" }}>
              <Link className="plain" href={availability.link.href}>
                {availability.link.label}
              </Link>
            </p>
          </div>
          <div>
            <div className="pic r43">
              <Pic path={availability.plate.path} slot="head" alt={availability.plate.alt} />
            </div>
            <div className="four">
              {availability.four.map((f, i) => (
                <div key={f.lead}>
                  <b>{rich(f.lead, `b${i}`)}</b>
                  {rich(f.text, `t${i}`)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Availability;
