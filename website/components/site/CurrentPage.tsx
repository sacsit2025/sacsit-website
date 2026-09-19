"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The header says which page you are on (Karim, 2026-09-20, D121: "it will be good in desktop that we know in
 * which page we are"). The header is a server component with no route awareness, so this small client piece
 * marks the current top item with aria-current="page" - Home on Home, Platform on Platform, the Capabilities
 * trigger on any capability page, the Partners trigger on any partner page - and the phone sheet's row label
 * with it. The underline is CSS (interaction.css).
 */
const CAPABILITIES = ["/scada", "/ems", "/eps", "/maintenance", "/reporting"];

export default function CurrentPage() {
  const pathname = usePathname();
  useEffect(() => {
    const header = document.querySelector("body > header");
    if (!header) return;
    const path = pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, "") || "/";
    const clear = () => header.querySelectorAll('[aria-current="page"]').forEach((el) => el.removeAttribute("aria-current"));
    const mark = (el: Element | null) => el?.setAttribute("aria-current", "page");
    clear();
    if (path === "/") mark(header.querySelector("nav > a.navhome"));
    else if (path.startsWith("/platform")) mark(header.querySelector('nav > a[href="/platform"]'));
    else if (CAPABILITIES.some((p) => path.startsWith(p))) {
      const dd = header.querySelector(".dd:has(.panel.caps)");
      mark(dd?.querySelector(":scope > a") ?? null);
      mark(dd?.querySelector(":scope > .mlab") ?? null);
    } else if (path.startsWith("/partners")) {
      const dd = header.querySelector(".dd:has(.panel.partners)");
      mark(dd?.querySelector(":scope > a") ?? null);
      mark(dd?.querySelector(":scope > .mlab") ?? null);
    }
  }, [pathname]);
  return null;
}
