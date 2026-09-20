import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CAPABILITIES, PARTNERS, HEADER, type MenuColumn } from "@/content/menu";
import { href } from "@/content/routes";
import MenuCloser from "./MenuCloser";
import ScrollTop from "./ScrollTop";
import CurrentPage from "./CurrentPage";

/**
 * The header, from the menu's ONE definition (content/menu.ts, ported from the mocks - D77, D97; D122 took the Why SOP
 * entry off: Home, Platform, Capabilities, Partners, Write to us).
 *
 * No JavaScript for the menus themselves: the three dropdowns open on hover AND on focus-within
 * (design.css), and the phone menu is a checkbox and a label, exactly as the mocks do it. That is why
 * this is a server component - the menu works with scripts blocked.
 *
 * The phone (2026-09-18, rebuilt from the live fault): the sheet under the burger is opaque, fixed
 * and scrolls on its own; each of the three lists folds shut behind its own row - a checkbox and a
 * label again (`.mtog` + `.mlab`, phone only) - and opens on a tap; the first line inside is the link
 * to the page itself (`.mpage`). The one piece of JavaScript is MenuCloser: it closes the sheet on a
 * tap on any link and on every route or hash change, because the router keeps this header alive
 * across pages and a ticked checkbox would otherwise stay ticked.
 */
export default async function Header() {
  const t = await getTranslations("site");
  return (
    <header>
      <div className="wrap">
        <Link className="lock" href={HEADER.home} scroll={false} aria-label={`${t("logoAlt")} - ${t("home")}`} title={t("home")}>
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
          <Link className="navhome" href={HEADER.home} scroll={false}>
            {t("home")}
          </Link>
          <Link href={HEADER.platform.href} scroll={false}>
            {HEADER.platform.label}
          </Link>

          <div className="dd">
            <Link href={HEADER.capabilities.href}>
              {HEADER.capabilities.label} <i className="caret" />
            </Link>
            <input type="checkbox" id="m-caps" className="mtog" aria-label={`${HEADER.capabilities.label} - the list`} />
            <label htmlFor="m-caps" className="mlab">
              {HEADER.capabilities.label} <i className="caret" />
            </label>
            <div className="panel caps">
              <Link className="mpage" href={HEADER.capabilities.href}>
                The five capabilities, on Home →
              </Link>
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
            <input type="checkbox" id="m-partners" className="mtog" aria-label={`${HEADER.partners.label} - the list`} />
            <label htmlFor="m-partners" className="mlab">
              {HEADER.partners.label} <i className="caret" />
            </label>
            <div className="panel partners">
              <Link className="mpage" href={HEADER.partners.href}>
                The four channels, on Home →
              </Link>
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
        <MenuCloser />
        <ScrollTop />
        <CurrentPage />
      </div>
    </header>
  );
}

function Column({ column }: { column: MenuColumn }) {
  const page = href(column.anchor);
  return (
    <div className="col">
      <Link className="capname" href={page} scroll={false}>
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
      <Link className="all" href={page} scroll={false}>
        {column.all} →
      </Link>
    </div>
  );
}
