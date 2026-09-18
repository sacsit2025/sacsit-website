"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * The page chrome that only a live browser can give: the header that stays, the line that says where
 * you are, and the way back to the top.
 *
 * These pages are long by design - a capability page is 20 000 to 39 000 CSS pixels tall - so a header
 * that only exists at the top of the document is unusable: you have to scroll a screen height twenty
 * times to reach the menu. The standard answer, and the one the reference site uses: the header stays
 * put, transparent over the hero, and turns into a compact navy bar the moment you leave the hero.
 *
 * One passive scroll listener, read inside requestAnimationFrame, writing two things:
 *   body[data-scrolled="1"]   the compact header and the section rail (CSS does the rest)
 *   body style --progress     0 to 1, how far down the document you are
 */
export default function Chrome() {
  const t = useTranslations("site");
  const [up, setUp] = useState(false);

  useEffect(() => {
    let raf = 0;
    let last = -1;

    const read = () => {
      raf = 0;
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrolled = y > 40 ? "1" : "0";
      if (document.body.dataset.scrolled !== scrolled) document.body.dataset.scrolled = scrolled;
      const p = Math.min(1, y / max);
      if (Math.abs(p - last) > 0.002) {
        document.body.style.setProperty("--progress", String(p));
        last = p;
      }
      setUp(y > window.innerHeight * 1.5);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete document.body.dataset.scrolled;
      document.body.style.removeProperty("--progress");
    };
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <button
        type="button"
        className={"totop" + (up ? " on" : "")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("toTop")}
        title={t("toTop")}
        tabIndex={up ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5l-7 7h4v7h6v-7h4z" />
        </svg>
      </button>
    </>
  );
}
