import { rich } from "@/lib/rich";
import type { NavyScreensSection } from "@/lib/spec";
import { Shot } from "./Shot";

/**
 * The kit's `r_navy_screens()`: the navy "Seen in the product" panel.
 * One tile alone takes .shots.one (a 0.62 fr column) unless it asked for "full".
 */
export function NavyScreens({ section: s }: { section: NavyScreensSection }) {
  const screens = s.screens ?? [];
  let grid = "";
  if (screens.length === 1) {
    grid = (screens[0]!.size ?? "").toLowerCase() === "full" ? " full" : " one";
  }
  return (
    <div className="screens">
      <p className="scrlab">{rich(s.label ?? "Seen in the product", "lab")}</p>
      <div className={`shots${grid}`}>
        {screens.map((sc, i) => (
          <Shot key={i} screen={sc} />
        ))}
      </div>
    </div>
  );
}

export default NavyScreens;
