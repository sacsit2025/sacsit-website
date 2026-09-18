import { rich } from "@/lib/rich";
import type { ScreenSpec } from "@/lib/spec";
import { Pic, nativeStyle } from "./Asset";

/** The paths a screen binds: a `pair` (two or three in one frame), or its one `asset`. */
export const pairOf = (screen: ScreenSpec): string[] | null =>
  screen.pair?.length ? screen.pair : null;

export function screenPaths(screen: ScreenSpec): string[] {
  const paths = pairOf(screen) ?? (screen.asset ? [screen.asset] : []);
  if (!paths.length) {
    throw new Error(`a screen in a spec names neither "asset" nor "pair": ${JSON.stringify(screen)}`);
  }
  return paths;
}

/**
 * One framed product screen - the kit's `frame()`: dark chrome, the image, a mono caption.
 * `pair` puts two (or three) images in one frame's .duo; `"size":"native"` caps the frame at the
 * images' own bound width, so a phone capture is never blown up.
 */
export function Frame({ screen }: { screen: ScreenSpec }) {
  const paths = screenPaths(screen);
  const pair = pairOf(screen);
  // a pair carries ONE alt for the tile; a single screen falls back to its caption (as the kit does)
  const alt = pair ? (screen.alt ?? "") : (screen.alt ?? screen.caption ?? "");
  return (
    <figure className="frame" style={nativeStyle(screen.size, paths, pair !== null)}>
      {screen.chrome ? (
        <div className="chrome">
          <i></i>
          <i></i>
          <i></i>
          <span>{rich(screen.chrome, "chrome")}</span>
        </div>
      ) : null}
      {pair ? (
        <div className={paths.length > 2 ? "duo trio" : "duo"}>
          {paths.map((p, i) => (
            <Pic key={p + i} path={p} slot="screen" alt={alt} />
          ))}
        </div>
      ) : (
        <Pic path={paths[0]!} slot="screen" alt={alt} />
      )}
      {screen.caption ? <figcaption>{rich(screen.caption, "cap")}</figcaption> : null}
    </figure>
  );
}

export default Frame;
