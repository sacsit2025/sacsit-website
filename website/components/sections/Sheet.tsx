import type { ItemSpec, ScreenSpec } from "@/lib/spec";
import { Frame } from "./Frame";
import { SpecList } from "./SpecList";

/**
 * The two columns of a block - the kit's `sheet()`: the framed screen (or a sticky .stack of two)
 * at the left, the numbered list at the right. With NO screen the list takes the whole width
 * (.sheet.nofig sets itself in two text columns) - never an empty frame column.
 */
export function Sheet({ screens, items }: { screens: ScreenSpec[]; items: ItemSpec[] }) {
  if (!screens.length) {
    return (
      <div className="sheet nofig">
        <SpecList items={items} />
      </div>
    );
  }
  return (
    <div className="sheet">
      {screens.length === 1 ? (
        <Frame screen={screens[0]!} />
      ) : (
        <div className="stack">
          {screens.map((s, i) => (
            <Frame key={i} screen={s} />
          ))}
        </div>
      )}
      <SpecList items={items} />
    </div>
  );
}

export default Sheet;
