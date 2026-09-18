import { rich } from "@/lib/rich";
import type { BlockSection, ScreenSpec } from "@/lib/spec";
import { Sheet } from "./Sheet";

/** `screens` if the spec gives a list, else the one `screen`, else none (the screenless block). */
export function blockScreens(s: BlockSection): ScreenSpec[] {
  return s.screens?.length ? s.screens : s.screen ? [s.screen] : [];
}

/** The kit's `r_blockA()`: a sub-title, one framed screen at the left, the numbered list at the right. */
export function BlockA({ section: s }: { section: BlockSection }) {
  return (
    <section className="blockA">
      {s.title ? <p className="allh">{rich(s.title, "t")}</p> : null}
      <Sheet screens={blockScreens(s)} items={s.items ?? []} />
    </section>
  );
}

export default BlockA;
