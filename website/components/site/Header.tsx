import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CAPABILITIES, PARTNERS, WHY, HEADER, type MenuColumn } from "@/content/menu";
import { href } from "@/content/routes";

/**
 * The header, from the menu's ONE definition (content/menu.ts, ported from the mocks - D77, D97).
 *
 * No JavaScript: the three dropdowns open on hover AND on focus-within (design.css), and the phone
 * menu is a checkbox and a label, exactly as the mocks do it. That is why this is a server component -
 * nothing here needs the client, and the menu works with scripts blocked.
 */
export default async function Header() {
  const t = await getTranslations("site");
  return (
    <header>
      <div className="wrap">
        <Link className="lock" href={HEADER.home} aria-label={`${t("logoAlt")} - ${t("home")}`} title={t("home")}>
          {/* the brand lock-up is an SVG pair: the symbol, then the wordmark (BRAND-ASSETS.md) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sym" src="/assets/brand/symbol/symbol-light.svg" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="word" src="/assets/brand/lockups/wordmark-light.svg" alt="SCADA Open Platform" />
        </Link>

        <input type="checkbox" id="mt" className="mt" aria-label={t("menuOpen")} />
        <label htmlFor="mt" className="burger" aria-hidden="true">
          <i />
          <i />
          <i />
        </label>

        <nav>
          {/* a phone menu needs a Home entry of its own; on a wide screen the lock-up is it
              (the desktop menu itself is locked by D77) - CSS shows this one under 820px only */}
          <Link className="navhome" href={HEADER.home}>
            {t("home")}
          </Link>
          <Link href={HEADER.platform.href}>{HEADER.platform.label}</Link>

          <div className="dd">
            <Link href={HEADER.why.href}>
              {HEADER.why.label} <i className="caret" />
            </Link>
            <div className="panel why">
              <p className="pk">The proof · eight things to hold us to</p>
              <ul className="whyl">
                {WHY.map((w) => (
                  <li key={w.key}>
                    <Link href={href("why", w.key)}>
                      <b>{w.title}</b>
                      <span>{w.line}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dd">
            <Link href={HEADER.capabilities.href}>
              {HEADER.capabilities.label} <i className="caret" />
            </Link>
            <div className="panel caps">
              <p className="pk">Five capabilities · the nine modules · every chapter of the brochures</p>
              <div className="cols">
                {CAPABILITIES.map((c) => (
                  <Column key={c.anchor} column={c} />
                ))}
              </div>
            </div>
          </div>

          <div className="dd">
            <Link href={HEADER.partners.href}>
              {HEADER.partners.label} <i className="caret" />
            </Link>
            <div className="panel partners">
              <p className="pk">Four partner channels · two editions, two pages</p>
              <div className="cols">
                {PARTNERS.map((c) => (
                  <Column key={c.anchor} column={c} />
                ))}
              </div>
            </div>
          </div>

          <a className="cta" href={HEADER.write.href}>
            {HEADER.write.label}
          </a>
        </nav>
      </div>
    </header>
  );
}

function Column({ column }: { column: MenuColumn }) {
  const page = href(column.anchor);
  return (
    <div className="col">
      <Link className="capname" href={page}>
        {column.name}
      </Link>
      <p className="promise">{column.promise}</p>
      <ul className="ent">
        {column.entries.map((e) => (
          <li key={e.key}>
            <Link href={href(column.anchor, e.key)}>{e.label}</Link>
          </li>
        ))}
      </ul>
      <Link className="all" href={page}>
        {column.all} →
      </Link>
    </div>
  );
}
