"use client";

/**
 * The Cloudflare Turnstile widget (D19) - the browser half of lib/turnstile.ts.
 *
 * No npm package: the widget is one script tag and one explicit render call, mounted here with
 * next/script (the host is already named in the CSP in next.config.ts).
 *
 * D88, local mode: with NEXT_PUBLIC_TURNSTILE_SITE_KEY unset this renders NOTHING and immediately
 * reports the token "dev-stub", so both forms are testable on a laptop with no secret at all. The
 * server half accepts that token only while its own secret is unset too.
 */

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const API_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** The token reported when no site key is configured - lib/turnstile.ts knows this string. */
export const TURNSTILE_STUB = "dev-stub";

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string | undefined;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface TurnstileProps {
  /** called with a fresh token, or null when it expires or errors */
  onToken: (token: string | null) => void;
  /** bump this number to ask for a new challenge (a token is single-use) */
  resetKey?: number;
  /** the band the widget sits in: the navy contact band is dark, the document shelf is light */
  theme?: "auto" | "light" | "dark";
}

export default function Turnstile({ onToken, resetKey = 0, theme = "auto" }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const holder = useRef<HTMLDivElement | null>(null);
  const widget = useRef<string | null>(null);
  const report = useRef(onToken);
  const [ready, setReady] = useState(false);

  // keep the callback fresh without re-rendering the widget on every parent render
  useEffect(() => {
    report.current = onToken;
  }, [onToken]);

  // local mode: no key, no widget, a stub token straight away
  useEffect(() => {
    if (siteKey) return;
    console.log("turnstile: NEXT_PUBLIC_TURNSTILE_SITE_KEY unset - no widget, sending the dev stub");
    report.current(TURNSTILE_STUB);
  }, [siteKey]);

  // the real widget, once the script is in
  useEffect(() => {
    if (!siteKey || !ready) return;
    const api = window.turnstile;
    const el = holder.current;
    if (!api || !el) return;
    const id = api.render(el, {
      sitekey: siteKey,
      theme,
      appearance: "always",
      callback: (token: string) => report.current(token),
      "expired-callback": () => report.current(null),
      "timeout-callback": () => report.current(null),
      "error-callback": () => report.current(null),
    });
    widget.current = id ?? null;
    return () => {
      if (widget.current) api.remove(widget.current);
      widget.current = null;
    };
  }, [siteKey, ready, theme]);

  // a new challenge on demand (after a refused or failed submission)
  useEffect(() => {
    if (!resetKey || !widget.current) return;
    report.current(null);
    window.turnstile?.reset(widget.current);
  }, [resetKey]);

  if (!siteKey) return null;

  return (
    <div>
      <Script id="cf-turnstile" src={API_URL} strategy="afterInteractive" onReady={() => setReady(true)} />
      <div ref={holder} />
    </div>
  );
}
