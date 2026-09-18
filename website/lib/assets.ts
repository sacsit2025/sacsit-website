import manifest from "./asset-manifest.json";

/**
 * Where an asset lives, and how big it is.
 *
 * A spec names an asset by its place in the knowledge base ("knowledge/assets/wb/WB-05.jpg") because
 * that is the ONE location an image lives (the ASSET LAW). scripts/sync-assets.mjs copies what the
 * content binds into public/assets/ and writes the measured pixel sizes into asset-manifest.json, so
 * every <Image> is given a real width and height and the page never reflows while an image loads.
 */

export interface AssetInfo {
  w: number | null;
  h: number | null;
  bytes: number;
  id: string | null;
}

const MANIFEST = manifest as Record<string, AssetInfo>;

/** "knowledge/assets/wb/WB-05.jpg" -> "/assets/wb/WB-05.jpg" (a path already public is left alone). */
export function src(path: string): string {
  if (path.startsWith("/")) return path;
  return "/" + path.replace(/^knowledge\/assets\//, "assets/").replace(/^public\//, "");
}

export function info(path: string): AssetInfo | undefined {
  return MANIFEST[src(path)];
}

/** The slot an image is bound in - the widths the mocks bind at (page kit, SLOTS). */
export type Slot = "hero" | "head" | "card" | "contact" | "screen" | "diagram" | "figure";

const SIZES: Record<Slot, string> = {
  // the hero plate covers the band at every width
  hero: "100vw",
  // a chapter head's plate is half of the 1160 px container, full width on a phone
  head: "(max-width: 860px) 100vw, 560px",
  // five cards to a row on the wide layout
  card: "(max-width: 860px) 50vw, 240px",
  contact: "(max-width: 860px) 100vw, 560px",
  // a framed product screen: half the container, full width on a phone
  screen: "(max-width: 860px) 100vw, 640px",
  diagram: "(max-width: 1200px) 100vw, 1160px",
  figure: "(max-width: 1200px) 100vw, 1160px",
};

export const sizesFor = (slot: Slot): string => SIZES[slot];

/** Everything an <Image> needs for one asset: src, width, height, sizes and a safe alt. */
export function image(path: string, slot: Slot, alt?: string) {
  const i = info(path);
  return {
    src: src(path),
    width: i?.w ?? undefined,
    height: i?.h ?? undefined,
    sizes: sizesFor(slot),
    alt: alt ?? "",
  };
}

/** An SVG is inlined by the mocks; here it is served as a file and drawn at its natural ratio. */
export const isSvg = (path: string) => path.toLowerCase().endsWith(".svg");
