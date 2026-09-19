import { rich } from "@/lib/rich";
import type { ScreenSpec } from "@/lib/spec";
import { Pic, bound, nativeStyle } from "./Asset";

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
 *
 * Four things a frame can carry since 2026-09-19, all of them Karim's ("must be zoom in focus on the
 * lens time player - see how to best visual experience"):
 *   `zoom`   a detail of the SAME file under the shot, cropped by the page - no second image on disk -
 *            with a hairline rectangle marking on the shot above where the detail comes from;
 *   `phones` phone captures side by side under it, at their own width, with air between them;
 *   `cap`    the visible height of a very tall capture before its foot fades out;
 *   `fade`   the edges of a source capture that are themselves cut - the page fades them so the cut
 *            reads as the panel continuing, and nobody ever edits the file on disk.
 */
export function Frame({ screen }: { screen: ScreenSpec }) {
  const paths = screenPaths(screen);
  const pair = pairOf(screen);
  // a pair carries ONE alt for the tile; a single screen falls back to its caption (as the kit does)
  const alt = pair ? (screen.alt ?? "") : (screen.alt ?? screen.caption ?? "");
  const cls = ["frame", screen.wide ? "wide" : "", screen.fade ? `fade-${screen.fade}` : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <figure className={cls} style={nativeStyle(screen.size, paths, pair !== null)}>
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
        <Shot screen={screen} path={paths[0]!} alt={alt} />
      )}
      {screen.zoom ? <Zoom screen={screen} path={paths[0]!} /> : null}
      {screen.phones?.length ? (
        <div className="phones">
          {screen.phones.map((p) => (
            <span key={p.path}>
              <Pic path={p.path} slot="screen" alt={p.alt} />
            </span>
          ))}
        </div>
      ) : null}
      {screen.caption ? <figcaption>{rich(screen.caption, "cap")}</figcaption> : null}
    </figure>
  );
}

/** The establishing shot: the whole capture, capped in height if it is very tall, marked if a detail follows. */
function Shot({ screen, path, alt }: { screen: ScreenSpec; path: string; alt: string }) {
  const z = screen.zoom;
  if (!z && !screen.cap) return <Pic path={path} slot="screen" alt={alt} />;
  return (
    <div className="shotbox" style={screen.cap ? { maxHeight: `${screen.cap}px` } : undefined}>
      <Pic path={path} slot="screen" alt={alt} />
      {z ? (
        <i
          className="mark"
          aria-hidden="true"
          style={{
            left: `${z.x * 100}%`,
            top: `${z.y * 100}%`,
            width: `${z.w * 100}%`,
            height: `${z.h * 100}%`,
          }}
        />
      ) : null}
    </div>
  );
}

/**
 * The detail: the same file, shown through a window the size of the region.
 *
 * The window's ratio is the region's own pixels; inside it the whole image is laid out at
 * `100/w` per cent of the window's width and pulled left and up by the region's offset - so the
 * region fills the window exactly. `top` resolves against the window's HEIGHT, which is why the
 * vertical offset is `y/h` and not `y*H/(w*W)`.
 */
function Zoom({ screen, path }: { screen: ScreenSpec; path: string }) {
  const z = screen.zoom!;
  const { w: W, h: H } = bound(path, "screen");
  return (
    <>
      <div className="zoom" style={{ aspectRatio: `${z.w * W} / ${z.h * H}` }}>
        <Pic
          path={path}
          slot="screen"
          alt=""
          style={{
            position: "absolute",
            width: `${100 / z.w}%`,
            maxWidth: "none",
            height: "auto",
            maxHeight: "none",
            left: `${(-z.x / z.w) * 100}%`,
            top: `${(-z.y / z.h) * 100}%`,
          }}
        />
      </div>
      {z.caption ? <p className="zoomcap">{rich(z.caption, "zoomcap")}</p> : null}
    </>
  );
}

export default Frame;
