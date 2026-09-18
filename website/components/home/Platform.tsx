import Link from "next/link";
import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { platform } from "@/content/home";

/** Band 2 - the platform: one paragraph on the left, the plate on the right (.split). */
export function Platform() {
  return (
    <section className="band">
      <div className="wrap split">
        <div className="measure">
          <p className="kicker">{rich(platform.kicker, "k")}</p>
          <h2>{rich(platform.h2, "h2")}</h2>
          <p className="lead">{rich(platform.lead, "lead")}</p>
          <Link className="plain" href={platform.link.href}>
            {platform.link.label}
          </Link>
        </div>
        <div className="pic r43">
          <Pic path={platform.plate.path} slot="head" alt={platform.plate.alt} />
        </div>
      </div>
    </section>
  );
}

export default Platform;
