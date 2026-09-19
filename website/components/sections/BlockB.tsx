import { rich } from "@/lib/rich";
import type { BlockSection } from "@/lib/spec";
import { Sheet } from "./Sheet";
import { Frame } from "./Frame";
import { blockScreens } from "./BlockA";

/**
 * The kit's `r_blockB()`: the same sheet in the .blockB.same dress (one or two stacked screens).
 *
 * A screen marked `wide` leaves the two-column sheet and takes the band's whole width, under the list
 * (Karim, 2026-09-19). The reason is arithmetic: the sheet's frame column is 580 px and these captures
 * are 1600 and 1121 px wide, so in the column they paint at about a third of their size and nothing in
 * them can be read. With the frames out of the sheet, the numbered list runs as the two-column list the
 * kit already has (`.sheet.nofig`), and the evidence gets the room it needs to be evidence.
 */
export function BlockB({ section: s }: { section: BlockSection }) {
  const screens = blockScreens(s);
  const wide = screens.filter((x) => x.wide);
  const inline = screens.filter((x) => !x.wide);
  return (
    <section className="blockB same">
      {s.title ? <p className="allh">{rich(s.title, "t")}</p> : null}
      <Sheet screens={inline} items={s.items ?? []} />
      {wide.length ? (
        <div className="wides">
          {wide.map((screen, i) => (
            <Frame key={i} screen={screen} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default BlockB;
