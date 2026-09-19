"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Closes the menus when they should close - the phone sheet (2026-09-18, from Karim's phone: "when
 * click on a link it stays open") and, since 2026-09-19, the three desktop panels.
 *
 * The phone menu is a checkbox: with a full page load a tap on a link left the menu behind, but the
 * router keeps the header alive across pages, so the checkbox stayed ticked and the sheet stayed open
 * on the next page - and on a same-page anchor nothing changed at all. This closes the sheet, and
 * folds the three lists, on any link tapped inside the menu, on every route change, and on every hash
 * change.
 *
 * The desktop panels have no open state at all: being open IS being hovered
 * (`.dd:hover .panel`, `.dd:focus-within .panel` - design.css and interaction.css B1). So after a
 * click the router swaps the page while the pointer is still inside the panel and the clicked link
 * still holds the focus, both predicates stay true, and the panel hangs over the new page (Karim,
 * 2026-09-19, screenshot at 12:12). There is nothing to close, so this adds the missing state as a
 * HUSH: the clicked `.dd` is marked, CSS shuts that one panel while the mark is on, and the mark is
 * dropped the moment the pointer leaves that menu, the focus comes back into it, or Escape is
 * pressed. Marking only the menu that was clicked is what lets the pointer slide along the bar to the
 * NEXT menu and open it at once.
 *
 * Without JavaScript the links still navigate and the menus still open on hover and on focus; only
 * the closing is lost, which is the old behaviour (D77: the header works with scripts blocked).
 */
export default function MenuCloser() {
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const header = document.querySelector("body > header");
    const nav = header?.querySelector("nav");
    if (!header || !nav) return;
    const menus = Array.from(header.querySelectorAll<HTMLElement>(".dd"));

    const onClick = (e: Event) => {
      const link = (e.target as Element | null)?.closest("a");
      if (!link) return;
      closeMenu();
      const dd = link.closest(".dd");
      if (!dd) return;
      // the focus is the other half of "open": drop it, or :focus-within holds the panel up
      (document.activeElement as HTMLElement | null)?.blur?.();
      dd.classList.add("hushed");
    };
    const unhush = (e: Event) => (e.currentTarget as HTMLElement).classList.remove("hushed");
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      (document.activeElement as HTMLElement | null)?.blur?.();
      menus.forEach((dd) => dd.classList.add("hushed"));
      closeMenu();
    };

    nav.addEventListener("click", onClick);
    menus.forEach((dd) => {
      dd.addEventListener("pointerleave", unhush);
      dd.addEventListener("focusin", unhush);
    });
    window.addEventListener("hashchange", closeMenu);
    document.addEventListener("keydown", onKey);
    return () => {
      nav.removeEventListener("click", onClick);
      menus.forEach((dd) => {
        dd.removeEventListener("pointerleave", unhush);
        dd.removeEventListener("focusin", unhush);
        dd.classList.remove("hushed");
      });
      window.removeEventListener("hashchange", closeMenu);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}

function closeMenu() {
  const burger = document.getElementById("mt") as HTMLInputElement | null;
  if (burger) burger.checked = false;
  document.querySelectorAll<HTMLInputElement>("body > header .mtog").forEach((box) => {
    box.checked = false;
  });
}
