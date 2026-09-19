/**
 * The shape of a page in content/pages/*.spec.json - the TypeScript twin of the page kit's contract
 * (page-kit/README.md, "Writing a spec"). D87: these files ARE the site's content; a component per
 * section type renders them, and the HTML mocks are built from the very same files.
 *
 * Every string is printed verbatim. Inline markup is limited to <b> <strong> <em> <i> <code> <sup>
 * <sub> <br> and `backticks` for mono - see lib/rich.tsx, which parses exactly that subset and
 * nothing else, so no content can inject markup.
 */

export type BandName = "white" | "mist" | "navy" | "new" | "auto";

/** One product screen in a frame or a navy tile. `pair` puts two (or three) images in one frame. */
export interface ScreenSpec {
  asset?: string;
  pair?: string[];
  /** the dark window chrome above the image, e.g. "the page designer · Beverage Line 7 · Preview" */
  chrome?: string;
  caption?: string;
  alt?: string;
  /** "native" caps the tile at the image's own width (a phone screen is never blown up); "full" takes the whole panel */
  size?: "native" | "full";
  /**
   * The evidence figures of a band leave the two-column sheet and take the band's whole width
   * (Karim, 2026-09-19). A capture is 1600 px wide and the sheet's frame column is 580: at 0.36x
   * nothing in it can be read, which is the whole of his complaint. The list beside them, freed of
   * the frames, runs as the two-column list the kit already has (`.sheet.nofig`).
   */
  wide?: boolean;
  /** A zoomed detail of the SAME capture, under it in the same frame: the region as fractions of the image. */
  zoom?: { x: number; y: number; w: number; h: number; caption?: string };
  /** Phone captures shown side by side under the screen, at their own width, with air between them. */
  phones?: { path: string; alt: string }[];
  /** A source capture whose own edges are cut: the page fades them, rather than anyone editing the file. */
  fade?: "right" | "bottom" | "right-bottom";
  /** The visible height of a very tall capture, in CSS pixels, before the foot fades out. */
  cap?: number;
}

/** One numbered item of a block's list: a bold lead and the sentence after it. */
export interface ItemSpec {
  lead?: string;
  text?: string;
  /** the name of the flat two-tone glyph drawn beside the lead (the section-04 icons, 2026-09-19) */
  icon?: string;
}

export interface LegendEntry {
  title?: string;
  line?: string;
  /** a colour dot instead of the ring glyph - the drawing's own colour grammar (2026-09-19, WB-27) */
  swatch?: string;
}

export interface CardSpec {
  plate: string;
  alt?: string;
  title?: string;
  /** the small mono line above the text on Home's target cards */
  trigger?: string;
  text?: string;
}

interface Common {
  id?: string;
  band?: BandName;
}

export interface HeadSection extends Common {
  type: "head";
  /** the section number, e.g. "01", with `of` = "06" */
  n?: string;
  of?: string;
  title: string;
  /** the statement: one or two lines in ink, the head's first voice */
  promise?: string;
  /** the rest of the paragraph, in the reading face, in the head's third column (option B,
   *  Karim 2026-09-18). A head without one keeps the statement alone, on a wider measure. */
  brief?: string;
  plate?: string;
  alt?: string;
}

export interface BlockSection extends Common {
  type: "blockA" | "blockB";
  title?: string;
  screen?: ScreenSpec;
  screens?: ScreenSpec[];
  items?: ItemSpec[];
}

export interface ProseSection extends Common {
  type: "prose";
  title?: string;
  /** one array per column; each entry is a paragraph (usually opening with a <b>lead</b>) */
  cols?: string[][];
  /** one title per column, above it (2026-09-19, the journey chapter: In the cloud / In your plant) */
  heads?: string[];
  items?: string[];
}

export interface ChooserSection extends Common {
  type: "chooser";
  title?: string;
  /** the SET-OUTSIDE chip strip: the exact dials the rows quote */
  chips?: string[];
  columns: string[];
  rows: string[][];
  /** the nuance line under the table (the concept-doc law: one plain line, never a footnote pile) */
  note?: string;
}

export interface NavyScreensSection extends Common {
  type: "navy-screens";
  label?: string;
  screens: ScreenSpec[];
}

export interface FigureSection extends Common {
  type: "figure";
  kicker?: string;
  title?: string;
  intro?: string;
  asset: string;
  alt?: string;
  caption?: string;
  ground?: "light" | "navy";
}

export interface DiagramSection extends Common {
  type: "diagram";
  kicker?: string;
  title?: string;
  intro?: string;
  asset: string;
  alt?: string;
  caption?: string;
  ground?: "light" | "navy";
  legend?: LegendEntry[];
}

export interface CardsSection extends Common {
  type: "cards";
  kicker?: string;
  title?: string;
  /** cards per row (Home's five-up unless the spec says otherwise) */
  per?: number;
  cards?: CardSpec[];
  groups?: { label?: string; cards: CardSpec[] }[];
}

export interface ContactSection extends Common {
  type: "contact";
  kicker?: string;
  title?: string;
  /** the word DESKS inside the text is replaced by the subject tokens */
  text?: string;
  desks?: string[];
  cta?: string;
  plate?: string;
  alt?: string;
}

export type Section =
  | HeadSection
  | BlockSection
  | ProseSection
  | ChooserSection
  | NavyScreensSection
  | FigureSection
  | DiagramSection
  | CardsSection
  | ContactSection;

/** The section types that ride INSIDE a chapter opened by a `head` (page kit: INNER). */
export const INNER_TYPES = [
  "blockA",
  "blockB",
  "prose",
  "chooser",
  "navy-screens",
  "diagram",
  "figure",
] as const;

export type InnerType = (typeof INNER_TYPES)[number];

export const isInner = (s: Section): s is Extract<Section, { type: InnerType }> =>
  (INNER_TYPES as readonly string[]).includes(s.type);

/** The band an inner section stands on when it opens its own chapter (page kit: OPENS). */
export const OPENS_ON: Partial<Record<InnerType, BandName>> = {
  diagram: "navy",
  figure: "auto",
};

export interface HeroSpec {
  kicker?: string;
  h1: string;
  dek?: string;
  /** the small line under the dek, e.g. "A platform by SACS-IT" */
  sig?: string;
  plate?: string;
  alt?: string;
}

export interface PageSpec {
  /** the spec's own name, e.g. "03-scada" */
  page: string;
  /** the <title>; the site adds the suffix */
  title: string;
  /** which menu entry is current: "platform" | "capabilities" | "partners" | "why" */
  nav?: string;
  hero: HeroSpec;
  sections: Section[];
  /** kept for the record, never rendered: block id -> the brochure pages it came from */
  sources?: Record<string, string[]>;
  /** kept for the record, never rendered */
  build_notes?: string[];
}
