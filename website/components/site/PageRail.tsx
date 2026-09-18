"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export interface RailItem {
  /** the anchor on the page, without the # */
  id: string;
  /** the chapter number as the page prints it, e.g. "03" - optional */
  n?: string;
  title: string;
}

/**
 * "On this page" - the page's own chapters, as a bar under the compact header.
 *
 * A capability page is ten chapters and up to 39 000 pixels long. Without this you navigate a page of
 * that size by guessing and scrolling; with it you see where you are and jump. It appears only once
 * you have left the hero (the same `body[data-scrolled]` the header uses) and is hidden on a phone,
 * where the burger menu is the way around.
 *
 * The items come from the page's spec - the section heads, in their order - so there is nothing to
 * keep in step by hand. The current chapter is found with an IntersectionObserver against a band
 * across the middle of the window: no scroll maths, no jitter.
 */
export default function PageRail({ items, home = true }: { items: RailItem[]; home?: boolean }) {
  const t = useTranslations("site");
  const [current, setCurrent] = useState<string | null>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!items.length) return;
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio);
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of seen) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best && bestRatio > 0) setCurrent(best);
      },
      // a band across the middle of the window: the chapter you are reading, not the one just entering
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.2, 0.5, 1] },
    );
    for (const el of targets) io.observe(el);
    return () => io.disconnect();
  }, [items]);

  // keep the lit chip in view when the page scrolls it out of the bar
  useEffect(() => {
    if (!current || !bar.current) return;
    const chip = bar.current.querySelector<HTMLElement>(`[data-for="${current}"]`);
    if (!chip) return;
    const box = bar.current.getBoundingClientRect();
    const own = chip.getBoundingClientRect();
    if (own.left < box.left + 8 || own.right > box.right - 8) {
      bar.current.scrollTo({
        left: chip.offsetLeft - box.width / 2 + own.width / 2,
        behavior: "smooth",
      });
    }
  }, [current]);

  if (!items.length) return null;

  return (
    <nav className="rail" aria-label={t("onThisPage")}>
      <div className="rwrap" ref={bar}>
        {home ? (
          <Link className="rhome" href="/" title={t("home")}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4l-8 7h2.4v8h4.2v-5h2.8v5h4.2v-8H20z" />
            </svg>
            {t("home")}
          </Link>
        ) : null}
        <span className="rlab">{t("onThisPage")}</span>
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            data-for={i.id}
            className={current === i.id ? "on" : undefined}
            aria-current={current === i.id ? "true" : undefined}
          >
            {i.n ? <b>{i.n}</b> : null}
            {i.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
