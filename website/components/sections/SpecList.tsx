import { rich } from "@/lib/rich";
import type { ItemSpec } from "@/lib/spec";
import { ICONS } from "./icons";

/**
 * The numbered list of a block - the kit's `spec_list()`. The CSS counts the items, not the markup.
 * An item may name an `icon` (components/sections/icons.tsx); the mark is drawn between the number and the
 * lead (Karim, 2026-09-19: icons illustrating each bullet of the Platform page's section 04).
 */
export function SpecList({ items }: { items: ItemSpec[] }) {
  return (
    <ol className="spec">
      {items.map((it, i) => {
        const name = (it as ItemSpec & { icon?: string }).icon;
        const icon = name ? ICONS[name] : undefined;
        return (
          <li key={i} className={icon ? "ico" : undefined}>
            {icon ? (
              <i className="ico" aria-hidden="true">
                {icon}
              </i>
            ) : null}
            {it.lead ? <b>{rich(it.lead, `l${i}`)}</b> : null}
            <span className="d">{rich(it.text, `t${i}`)}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default SpecList;
