import type { ReactNode } from "react";
import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { BlockA } from "@/components/sections/BlockA";
import { BlockB } from "@/components/sections/BlockB";
import { Head } from "@/components/sections/Head";
import { NavyScreens } from "@/components/sections/NavyScreens";
import { capabilities } from "@/content/home";

/**
 * Band 5 - the five capabilities: the index with its icons, SCADA opened in two blocks (D57, D72),
 * then the four numbered blocks, then the closing note.
 *
 * The five index icons are MARKUP, not copy: the same viewBoxes, paths and classes (.c fill-less
 * cyan stroke, .cf cyan fill) the mock draws, in the same order. SCADA's article carries `cap blk`
 * because that is what the ported stylesheet calls the pattern - app/design.css renamed Home's
 * `.cap.scada` to `.cap.blk` when the page kit lifted it (see its header comment).
 */
const ICONS: ReactNode[] = [
  <>
    <rect x="4" y="8" width="40" height="26" />
    <path className="c" d="M10 24h7l4-8 4 14 4-6h9" />
    <path d="M18 41h12M24 34v7" />
  </>,
  <>
    <rect x="6" y="6" width="36" height="36" />
    <path d="M6 15h36" />
    <rect className="cf" x="11" y="20" width="10" height="7" />
    <rect x="25" y="20" width="11" height="7" />
    <rect x="11" y="31" width="10" height="7" />
    <rect x="25" y="31" width="11" height="7" />
  </>,
  <>
    <path d="M6 42V28M14 42V18M22 42V32" />
    <circle cx="33" cy="30" r="11" />
    <path className="c" d="M33 23v7l5 3" />
    <path d="M29 12h8M33 8v4" />
  </>,
  <>
    <rect x="6" y="6" width="36" height="36" />
    <path className="c" d="M12 15l3 3 6-6M12 26l3 3 6-6M12 37l3 3 6-6" />
    <path d="M27 15h9M27 26h9M27 37h9" />
  </>,
  <>
    <path d="M10 4h20l8 8v32H10z" />
    <path d="M30 4v8h8" />
    <path d="M16 22h16M16 28h16M16 34h9" />
    <circle className="c" cx="34" cy="37" r="5" />
  </>,
];

export function Capabilities() {
  const { scada } = capabilities;
  return (
    <section className="band mist" id={capabilities.id}>
      <div className="wrap">
        <p className="kicker">{rich(capabilities.kicker, "k")}</p>
        <h2>{rich(capabilities.h2, "h2")}</h2>
        <p className="measure lead">{rich(capabilities.lead, "lead")}</p>

        <ol className="capindex">
          {capabilities.index.map((entry, i) => (
            <li key={entry.href}>
              <a href={entry.href}>
                <b>{entry.n}</b>
                {rich(entry.name, `n${i}`)}
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  {ICONS[i]}
                </svg>
              </a>
            </li>
          ))}
        </ol>

        <article className="cap blk" id={scada.id}>
          <Head
            section={{
              type: "head",
              n: scada.n,
              of: scada.of,
              title: scada.name,
              plate: scada.plate.path,
              alt: scada.plate.alt,
            }}
          />
          <BlockA section={scada.blockA} />
          <BlockB section={scada.blockB} />
        </article>

        {capabilities.blocks.map((block) => (
          <article className="cap" key={block.id} id={block.id}>
            <div className="caphead">
              <span className="n">
                {block.n}
                <em>/{block.of}</em>
              </span>
              <h3>{rich(block.name, "name")}</h3>
              <p className="promise">{rich(block.promise, "promise")}</p>
            </div>
            <div className="pic">
              <Pic path={block.plate.path} slot="head" alt={block.plate.alt} />
            </div>
            <div className="txt">
              <ul>
                {block.items.map((item, i) => (
                  <li key={i}>{rich(item, `${block.id}-${i}`)}</li>
                ))}
              </ul>
            </div>
            <NavyScreens
              section={{ type: "navy-screens", label: block.label, screens: block.screens }}
            />
          </article>
        ))}

        <div className="under">
          <p>{rich(capabilities.under.text, "under")}</p>
          <a className="plain" href={capabilities.under.link.href}>
            {capabilities.under.link.label}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Capabilities;
