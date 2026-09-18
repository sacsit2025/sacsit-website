import { rich } from "@/lib/rich";
import type { ItemSpec } from "@/lib/spec";

/** The numbered list of a block - the kit's `spec_list()`. The CSS counts the items, not the markup. */
export function SpecList({ items }: { items: ItemSpec[] }) {
  return (
    <ol className="spec">
      {items.map((it, i) => (
        <li key={i}>
          {it.lead ? <b>{rich(it.lead, `l${i}`)}</b> : null}
          <span className="d">{rich(it.text, `t${i}`)}</span>
        </li>
      ))}
    </ol>
  );
}

export default SpecList;
