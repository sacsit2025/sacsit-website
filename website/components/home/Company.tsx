import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { company } from "@/content/home";

/** Band 10 - who develops SOP: the founder's own line, and the plate beside it. */
export function Company() {
  return (
    <section className="band">
      <div className="wrap company">
        <div>
          <p className="kicker">{rich(company.kicker, "k")}</p>
          <h2>{rich(company.h2, "h2")}</h2>
          <p className="lead">{rich(company.lead, "lead")}</p>
        </div>
        <div className="pic r43">
          <Pic path={company.plate.path} slot="head" alt={company.plate.alt} />
        </div>
      </div>
    </section>
  );
}

export default Company;
