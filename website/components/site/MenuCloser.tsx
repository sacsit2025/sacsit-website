"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Closes the phone menu when it should close (2026-09-18, from Karim's phone: "when click on a link it
 * stays open").
 *
 * The header is a server component and the phone menu is a checkbox: with a full page load a tap on a
 * link left the menu behind, but the router keeps the header alive across pages, so the checkbox
 * stayed ticked and the sheet stayed open on the next page - and on a same-page anchor nothing changed
 * at all. This closes the sheet, and folds the three lists, on any link tapped inside the menu, on
 * every route change, and on every hash change. Without JavaScript the links still navigate; only the
 * closing is lost, which is the old behaviour.
 */
export default function MenuCloser() {
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const nav = document.querySelector("body > header nav");
    if (!nav) return;
    const onClick = (e: Event) => {
      const target = e.target as Element | null;
      if (target?.closest("a")) closeMenu();
    };
    nav.addEventListener("click", onClick);
    window.addEventListener("hashchange", closeMenu);
    return () => {
      nav.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", closeMenu);
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
