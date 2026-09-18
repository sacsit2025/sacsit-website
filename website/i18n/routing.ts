import { defineRouting } from "next-intl/routing";

/**
 * D18: the site launches in English and is structured for many languages from day one.
 *
 * `localePrefix: "as-needed"` keeps English at /platform (no /en) and gives a future locale its own
 * prefix (/fr/platform), so adding one is a message file, a locale here and a per-locale spec - never
 * a change of route shape. The page copy lives in content/pages/*.spec.json; `messages/` carries the
 * chrome (the header, the forms, the footer).
 */
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const isLocale = (value: string): value is Locale =>
  (routing.locales as readonly string[]).includes(value);
