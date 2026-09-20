"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero as a film with callouts (Karim, 2026-09-20, entries 155-156: the EPS hero is the line running, "with OEE, KPI,
 * speed... callouts that appear on the line"). The take carries no text: the callouts are DRAWN HERE, timed to the
 * video's clock, so they stay crisp, editable and gated like any other words on the site.
 *
 * - the video sits where the plate sits (the plate stays underneath as the poster and as the whole hero when the
 *   viewer asked for reduced motion or the film cannot play);
 * - each callout names a point of the FRAME (x, y as fractions of the film's own picture); the frame is cover-fitted
 *   into the hero, so the point is mapped through the visible crop on every resize;
 * - a callout appears at its second and stays until the film loops; under 820px the callouts are hidden (the hero
 *   crops the picture hard on a phone and the words would land anywhere).
 */
export interface Callout {
  /** the second of the film at which it appears */
  at: number;
  /** the anchor on the film's picture, 0..1 of its width and height */
  x: number;
  y: number;
  label: string;
  value: string;
}
export interface Film {
  src: string;
  callouts: Callout[];
}

export default function HeroFilm({ src, poster, callouts }: { src: string; poster?: string; callouts: Callout[] }) {
  const video = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [map, setMap] = useState<{ ox: number; oy: number; w: number; h: number } | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const v = video.current;
    const b = box.current;
    if (!v || !b) return;
    // the film's picture is cover-fitted into the hero: where does a point of the frame land in the box?
    const fit = () => {
      const vw = v.videoWidth || 16;
      const vh = v.videoHeight || 9;
      const W = b.clientWidth;
      const H = b.clientHeight;
      const s = Math.max(W / vw, H / vh);
      const w = vw * s;
      const h = vh * s;
      setMap({ ox: (W - w) / 2, oy: (H - h) / 2, w, h });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    v.addEventListener("loadedmetadata", fit);
    const tick = () => setT(v.currentTime);
    v.addEventListener("timeupdate", tick);
    v.addEventListener("seeked", tick);
    v.addEventListener("ended", tick);
    return () => {
      ro.disconnect();
      v.removeEventListener("loadedmetadata", fit);
      v.removeEventListener("timeupdate", tick);
      v.removeEventListener("seeked", tick);
      v.removeEventListener("ended", tick);
    };
  }, []);

  return (
    <div className="filmbox" ref={box} aria-hidden="true">
      {!still ? (
        <video ref={video} className="film" src={src} poster={poster} muted autoPlay loop playsInline preload="metadata" />
      ) : null}
      {map && !still ? (
        <div className="callouts">
          {callouts.map((c, i) => (
            <span
              key={i}
              className={"co" + (t >= c.at ? " on" : "")}
              style={{ left: map.ox + c.x * map.w, top: map.oy + c.y * map.h }}
            >
              <b>{c.label}</b>
              <i>{c.value}</i>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
