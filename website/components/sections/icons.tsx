/**
 * The bullet icons of a block's numbered list (Karim, 2026-09-19: "icons illustrating each of the bullets"), drawn in the
 * site's line hand - 24 x 24, stroke currentColor, no fill - so a spec item may say `"icon": "engine"` and the list draws it
 * beside the lead. Ten marks for the Platform page's section 04; any block may reuse them. No text, no logo, no brand mark:
 * the database is a plain cylinder, the engine's makers are not drawn.
 */
import type { ReactElement } from "react";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const ICONS: Record<string, ReactElement> = {
  /** the engine, named: a database cylinder with the time axis beside it */
  engine: (
    <svg viewBox="0 0 24 24" {...P}>
      <ellipse cx="10" cy="5.5" rx="6.5" ry="2.5" />
      <path d="M3.5 5.5v11c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-11" />
      <path d="M3.5 11c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" />
      <path d="M20 8v10M18 16l2 2 2-2" />
    </svg>
  ),
  /** what its makers publish: a page with a bar chart and a check */
  publish: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 17v-4M12 17v-7M15 17v-3" />
    </svg>
  ),
  /** who else runs it: a tick chart, up and down */
  ticks: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3 20h18" />
      <path d="M6 14v-6M5 10h2M11 17V7M10 12h2M16 15V5M15 9h2M20 12v-4" />
    </svg>
  ),
  /** what we do with it: the tower of slices, raw at the top, packed toward the base */
  tiers: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M8 4h8" />
      <path d="M7 8h10" />
      <path d="M6 12h12M6 14h12" />
      <path d="M5 17h14M5 18.6h14M5 20.2h14" />
    </svg>
  ),
  /** averages weighted by count: a balance, the heavier pan lower */
  weighted: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M12 4v16M8 20h8" />
      <path d="M4 8h16" />
      <path d="M4 8l-2.5 6h5z" />
      <path d="M20 8l-2.5 6h5z" />
      <circle cx="6" cy="6" r="0.4" />
    </svg>
  ),
  /** a quality byte rides every reading: a tag on a value */
  quality: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3 12l7-7h8v8l-7 7z" />
      <circle cx="14.5" cy="9.5" r="1.3" />
      <path d="M6 18l-2 2" />
    </svg>
  ),
  /** correct a value from years ago: the arrow that goes back and rewrites */
  correct: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M4 11a8 8 0 1 1 2.3 5.7" />
      <path d="M4 6v5h5" />
      <path d="M12 8v5l3 2" />
    </svg>
  ),
  /** it is still just Postgres: one key */
  key: (
    <svg viewBox="0 0 24 24" {...P}>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M18 12v3M15 12v2.5" />
    </svg>
  ),
  /** what already stands on it: three modules on one plinth */
  stands: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3 18h18v3H3z" />
      <path d="M5 18v-6h4v6M10 18V8h4v10M15 18v-4h4v4" />
    </svg>
  ),
  /** proven in anger: the line kept, the cut bridged */
  proven: (
    <svg viewBox="0 0 24 24" {...P}>
      <path d="M3 14h5M16 14h5" />
      <path d="M8 14l3-5 2 10 3-5" />
      <path d="M12 3l-1.5 4h3L12 11" />
    </svg>
  ),
};

export const iconNames = Object.keys(ICONS);
