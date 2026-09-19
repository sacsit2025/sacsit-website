"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * A page opens at its top (Karim, 2026-09-19: "for all other pages it opens on the first section instead of
 * the hero section of the page").
 *
 * On a client-side navigation the router scrolls the new page's first visible element into view rather
 * than the top of the document; on every inner page that element resolves to the sections under the
 * hero, so the page arrived scrolled one hero height down (560 px at desktop, measured on the live site
 * for Platform, SCADA, Why SOP and EMS alike). The header's page links now carry `scroll={false}` so the
 * router leaves the scroll alone, and this effect puts the page at its top on every route change that
 * carries no hash. A link with a hash (`/scada#scada-trends`, `/#capabilities`) keeps the router's own
 * scrolling to the section, untouched.
 */
export default function ScrollTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
