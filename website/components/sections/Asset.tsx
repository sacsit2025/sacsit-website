import Image from "next/image";
import { info, isSvg, sizesFor, src as assetSrc, type Slot } from "@/lib/assets";

/**
 * One image of a page spec - the React twin of the page kit's `asset()` (build-page.py).
 *
 * The kit REFUSES a spec that names an asset which is not on disk ("this kit has no stand-ins").
 * Here the manifest is that disk: scripts/sync-assets.mjs writes a row for every file it copied into
 * public/assets, so a path with no row is a path with no file. It throws, at build time, with the
 * path in the message - never a placeholder, never a silent gap.
 */
export function bound(path: string, slot: Slot) {
  const i = info(path);
  if (!i || !i.w || !i.h) {
    throw new Error(
      `asset not bound: "${path}" has no measured row in lib/asset-manifest.json - ` +
        `the file is not under public/assets. Run \`npm run assets\`, or fix the path in the spec. ` +
        `(The page kit refuses the same spec at build time; this site has no stand-ins either.)`,
    );
  }
  return { src: assetSrc(path), w: i.w, h: i.h, sizes: sizesFor(slot) };
}

/**
 * The bound width of a product screen in CSS pixels - what `"size":"native"` caps a tile at.
 * The kit binds a screen at most 1200 px wide (SLOTS["screen"]) and never upscales, so the cap is
 * part of the number: min(the file's own width, 1200). Proven against every mock's own max-width.
 */
const SCREEN_CAP = 1200;

export function nativeWidth(paths: string[], duo: boolean): number {
  const sum = paths
    .map((p) => Math.min(bound(p, "screen").w, SCREEN_CAP))
    .reduce((a, b) => a + b, 0);
  // a .duo (a pair or a trio in one tile) adds 6 px of gutter between and around its images
  return duo ? sum + 6 * (paths.length + 1) : sum;
}

/** `"size":"native"` -> the inline cap the mocks carry; anything else -> no style at all. */
export function nativeStyle(size: string | undefined, paths: string[], duo: boolean) {
  return (size ?? "").toLowerCase() === "native"
    ? { maxWidth: `${nativeWidth(paths, duo)}px` }
    : undefined;
}

/** An asset on the page: next/image for a raster, a plain <img> for an SVG (the optimizer skips it). */
export function Pic({
  path,
  slot,
  alt,
  className,
  priority,
  style,
}: {
  path: string;
  slot: Slot;
  alt: string;
  className?: string;
  priority?: boolean;
  /** only for a cropped detail, which positions the whole image inside a smaller window */
  style?: React.CSSProperties;
}) {
  const a = bound(path, slot);
  if (isSvg(path)) {
    // an SVG is served as the file it is: the optimizer does not resize one, so next/image would only
    // wrap it. `loading`/`decoding` are next/image's own defaults, kept so a drawing behaves like
    // every other image on the page (and React hoists no preload for it).
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={a.src}
        width={a.w}
        height={a.h}
        alt={alt}
        className={className}
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }
  return (
    <Image
      src={a.src}
      width={a.w}
      height={a.h}
      sizes={a.sizes}
      alt={alt}
      className={className}
      style={style}
      priority={priority}
    />
  );
}
