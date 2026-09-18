import { Fragment } from "react";
import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { audiences } from "@/content/home";

/** Band 9 - who SOP is for: ten target cards, five under each partner channel. */
export function Audiences() {
  return (
    <section className="band mist who">
      <div className="wrap">
        <p className="kicker">{rich(audiences.kicker, "k")}</p>
        <h2>{rich(audiences.h2, "h2")}</h2>
        {audiences.groups.map((group, g) => (
          <Fragment key={group.label}>
            <h3>{rich(group.label, `g${g}`)}</h3>
            <div className="tcards">
              {group.cards.map((card, i) => (
                <div className="tcard" key={card.plate.path}>
                  <Pic path={card.plate.path} slot="card" alt={card.plate.alt} />
                  <h4>{rich(card.title, `h${g}-${i}`)}</h4>
                  <p className="trig">{rich(card.trigger, `t${g}-${i}`)}</p>
                  <p>{rich(card.text, `p${g}-${i}`)}</p>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default Audiences;
