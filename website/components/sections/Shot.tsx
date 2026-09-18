import { rich } from "@/lib/rich";
import type { ScreenSpec } from "@/lib/spec";
import { Pic, nativeStyle } from "./Asset";
import { pairOf, screenPaths } from "./Frame";

/**
 * One tile of the navy "Seen in the product" panel - the kit's `shot()`.
 * `"native"` caps the tile at the image's own bound width (and .shot.native justifies it left);
 * `"full"` gives it the whole panel width.
 */
export function Shot({ screen }: { screen: ScreenSpec }) {
  const paths = screenPaths(screen);
  const pair = pairOf(screen);
  const size = (screen.size ?? "").toLowerCase();
  const cls = "shot" + (size === "native" ? " native" : size === "full" ? " full" : "");
  const alt = pair ? (screen.alt ?? "") : (screen.alt ?? screen.caption ?? "");
  return (
    <figure className={cls} style={nativeStyle(screen.size, paths, pair !== null)}>
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

export default Shot;
