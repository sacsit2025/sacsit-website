import { rich } from "@/lib/rich";
import type { BlockSection } from "@/lib/spec";
import { Sheet } from "./Sheet";
import { blockScreens } from "./BlockA";

/** The kit's `r_blockB()`: the same sheet in the .blockB.same dress (one or two stacked screens). */
export function BlockB({ section: s }: { section: BlockSection }) {
  return (
    <section className="blockB same">
      {s.title ? <p className="allh">{rich(s.title, "t")}</p> : null}
      <Sheet screens={blockScreens(s)} items={s.items ?? []} />
    </section>
  );
}

export default BlockB;
