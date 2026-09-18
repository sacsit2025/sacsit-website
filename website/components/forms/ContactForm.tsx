"use client";

/**
 * The contact band's form (D19) - the desk token first, then who you are and what you need.
 *
 * Three cheap doors, as D19 set them: a honeypot field no person can see, a time trap (a form filled
 * in under three seconds was not filled in by a person), and Cloudflare Turnstile. The route decides;
 * this component only carries the evidence.
 *
 * Every word comes from messages/en.json (`contact.*`) - nothing English is written here. The four
 * desk tokens are identifiers, not copy: PARTNER · PLANT · PRESS · INVEST are never translated, the
 * same rule the platform uses for tags and units.
 *
 * With JavaScript off the fields still render and the submit does nothing - which is why the mailto
 * link D19 keeps is printed underneath at all times, not as a fallback that appears on failure.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Turnstile from "./Turnstile";

/** D19: the subject tokens, the form's first field. */
export const DESKS = ["PARTNER", "PLANT", "PRESS", "INVEST"] as const;

export const CONTACT_EMAIL = "info@sacsit.com";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type State = "idle" | "sending" | "sent" | "failed";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const mounted = useRef(0);
  const t0 = useRef<HTMLInputElement | null>(null);

  // the time trap's clock: written on mount, into a hidden field as well so it is visible evidence
  useEffect(() => {
    mounted.current = Date.now();
    if (t0.current) t0.current.value = String(mounted.current);
  }, []);

  const onToken = useCallback((value: string | null) => setToken(value), []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();

    const payload = {
      desk: value("desk"),
      name: value("name"),
      email: value("email"),
      company: value("company"),
      country: value("country"),
      message: value("message"),
      website: String(form.get("website") ?? ""),
      elapsed: mounted.current ? Date.now() - mounted.current : undefined,
      turnstile: token,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError(t("required"));
      return;
    }
    if (!EMAIL.test(payload.email)) {
      setError(t("badEmail"));
      return;
    }

    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean; reason?: string };
      if (json.ok) {
        setState("sent");
        return;
      }
      setState("failed");
      setResetKey((n) => n + 1);
      setError(json.reason === "robot" ? t("robot") : json.reason === "invalid" ? t("required") : t("failed"));
    } catch {
      setState("failed");
      setResetKey((n) => n + 1);
      setError(t("failed"));
    }
  }

  const mailto = (
    <p className="note">
      {t("privacy")}{" "}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </p>
  );

  if (state === "sent") {
    return (
      <div className="form">
        <p className="ok">{t("sent")}</p>
        {mailto}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <label>
        {t("desk")}
        <select name="desk" defaultValue={DESKS[0]}>
          {DESKS.map((desk) => (
            <option key={desk} value={desk}>
              {desk}
            </option>
          ))}
        </select>
      </label>

      <div className="row">
        <label>
          {t("name")}
          <input name="name" type="text" autoComplete="name" required maxLength={200} />
        </label>
        <label>
          {t("email")}
          <input name="email" type="email" autoComplete="email" required maxLength={320} />
        </label>
      </div>

      <div className="row">
        <label>
          {t("company")}
          <input name="company" type="text" autoComplete="organization" maxLength={200} />
        </label>
        <label>
          {t("country")}
          <input name="country" type="text" autoComplete="country-name" maxLength={200} />
        </label>
      </div>

      <label>
        {t("message")}
        <textarea name="message" maxLength={5000} required />
      </label>

      {/* the honeypot: off-screen (.hp), hidden from assistive tech, never tabbed into - a filled
          "website" field is a bot, and the route answers it 200 so it learns nothing */}
      <div className="hp" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={t0} name="t0" type="hidden" defaultValue="" />

      <Turnstile onToken={onToken} resetKey={resetKey} theme="dark" />

      <div>
        <button className="cta" type="submit" disabled={state === "sending"}>
          {state === "sending" ? t("sending") : t("send")}
        </button>
      </div>

      {error ? <p className="err">{error}</p> : null}
      {mailto}
    </form>
  );
}
