import type { ReactNode } from "react";
import { OPENS_ON, isInner, type BandName, type InnerType, type Section } from "@/lib/spec";
import { BlockA } from "./BlockA";
import { BlockB } from "./BlockB";
import { Cards } from "./Cards";
import { Chooser } from "./Chooser";
import { Contact } from "./Contact";
import { Diagram } from "./Diagram";
import { Figure } from "./Figure";
import { Head } from "./Head";
import { NavyScreens } from "./NavyScreens";
import { Prose } from "./Prose";

/** The three bands a section can stand on - the kit's BANDS. */
const BANDS: Record<string, string> = {
  white: "band",
  mist: "band mist",
  navy: "band navy on-navy",
};

type InnerSection = Extract<Section, { type: InnerType }>;

/** One section that rides inside a chapter. */
function Inner({ section }: { section: InnerSection }) {
  switch (section.type) {
    case "blockA":
      return <BlockA section={section} />;
    case "blockB":
      return <BlockB section={section} />;
    case "prose":
      return <Prose section={section} />;
    case "chooser":
      return <Chooser section={section} />;
    case "navy-screens":
      return <NavyScreens section={section} />;
    case "diagram":
      return <Diagram section={section} />;
    case "figure":
      return <Figure section={section} />;
  }
}

/**
 * The page's sections, banded - the kit's `sections_html()`.
 *
 * A `head` opens a chapter; every blockA / blockB / prose / chooser / navy-screens / diagram /
 * figure after it rides in the SAME band and the same article.cap.blk, until the next `head`, a
 * `cards`, a `contact`, or a section that names its own band - naming a band STARTS one. A drawing
 * standing alone (one `diagram` or `figure`, nothing absorbed) gets Home's band 4 shape: no chapter
 * wrapper. `cards` defaults to the mist band and adds .who; `contact` defaults to navy.
 */
export function Sections({ sections }: { sections: Section[] }) {
  // the white / mist alternation is counted PER PAGE, exactly as the kit's `auto` closure
  let auto = 0;
  const bandOf = (s: Section, fallback: BandName): string => {
    let b: string = s.band || fallback;
    if (b === "new" || b === "auto") {
      b = auto % 2 === 0 ? "white" : "mist";
      auto += 1;
    }
    return BANDS[b] ?? BANDS.white!;
  };

  const out: ReactNode[] = [];
  let i = 0;
  while (i < sections.length) {
    const s = sections[i]!;
    const first = i;

    if (s.type === "head" || isInner(s)) {
      const inner: ReactNode[] = [];
      let opens: BandName = "auto";
      if (s.type === "head") {
        inner.push(<Head key={`i${i}`} section={s} />);
      } else {
        inner.push(<Inner key={`i${i}`} section={s} />);
        opens = OPENS_ON[s.type] ?? "auto";
      }
      i += 1;
      while (i < sections.length) {
        const nxt = sections[i]!;
        if (!isInner(nxt) || nxt.band) break; // naming a band means starting one
        inner.push(<Inner key={`i${i}`} section={nxt} />);
        i += 1;
      }
      const band = bandOf(s, opens);
      if (inner.length === 1 && (s.type === "diagram" || s.type === "figure")) {
        // a drawing standing alone is Home's band 4 exactly: no chapter wrapper
        out.push(
          <section key={`s${first}`} className={band} id={s.id || undefined}>
            <div className="wrap">{inner}</div>
          </section>,
        );
      } else {
        out.push(
          <section key={`s${first}`} className={band}>
            <div className="wrap">
              <article className="cap blk" id={s.id || undefined}>
                {inner}
              </article>
            </div>
          </section>,
        );
      }
      continue;
    }

    // `cards` and `contact` always start their own band
    const band = bandOf(s, s.type === "cards" ? "mist" : "navy");
    out.push(
      <section
        key={`s${first}`}
        className={s.type === "cards" ? `${band} who` : band}
        id={s.id || undefined}
      >
        <div className="wrap">
          {s.type === "cards" ? <Cards section={s} /> : <Contact section={s} />}
        </div>
      </section>,
    );
    i += 1;
  }

  return <>{out}</>;
}

export default Sections;
