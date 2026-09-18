"use client";

/**
 * "Get the file", wired (D89, which closes D86's deferral).
 *
 * The shelf's eight buttons carried `data-defer="react"` in the mocks; in React they open a short
 * panel - name, e-mail, company, Turnstile - and the download link comes back from the route. The
 * lead is mailed and written to the sheet either way (D92), so a document whose PDF has not landed
 * yet still recorded: the panel then prints `documents.missing`, which says the file will be sent by hand.
 *
 * Same three doors as the contact form: the off-screen honeypot, the three-second time trap and
 * Turnstile. Every word comes from messages/en.json (`documents.*` and `contact.*` for the fields).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Turnstile from "./Turnstile";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type State = "idle" | "sending" | "ready" | "missing" | "failed";

export interface DocumentButtonProps {
  /** the id in content/documents.ts ("platform", "scada", "ems", ...) */
  doc: string;
  /** the document's title, printed in the panel and sent with the lead */
  title: string;
}

export default function DocumentButton({ doc, title }: DocumentButtonProps) {
  const t = useTranslations("documents");
  const f = useTranslations("contact");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const opened = useRef(0);

  // the time trap's clock starts when the panel opens, not when the page loads
  useEffect(() => {
    if (open) opened.current = Date.now();
  }, [open]);

  const onToken = useCallback((value: string | null) => setToken(value), []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();

    const payload = {
      doc,
      name: value("name"),
      email: value("email"),
      company: value("company"),
      website: String(form.get("website") ?? ""),
      elapsed: opened.current ? Date.now() - opened.current : undefined,
      turnstile: token,
    };

    if (!payload.name || !payload.email) {
      setError(f("required"));
      return;
    }
    if (!EMAIL.test(payload.email)) {
      setError(f("badEmail"));
      return;
    }

    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/document", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
        url?: string;
        reason?: string;
      };
      if (json.ok && json.url) {
        setUrl(json.url);
        setState("ready");
        return;
      }
      setResetKey((n) => n + 1);
      if (json.reason === "missing") {
        setState("missing");
        return;
      }
      setState("failed");
      setError(json.reason === "robot" ? f("robot") : json.reason === "invalid" ? f("required") : t("failed"));
    } catch {
      setResetKey((n) => n + 1);
      setState("failed");
      setError(t("failed"));
    }
  }

  const panelId = `doc-gate-${doc}`;

  return (
    <>
      <button
        className="plain"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((was) => !was)}
      >
        {t("title")}
      </button>

      {open ? (
        <div id={panelId}>
          {state === "ready" && url ? (
            <div className="form">
              <p className="ok">{t("ready")}</p>
              <div>
                <a className="cta" href={url} download>
                  {t("download")}
                </a>
              </div>
            </div>
          ) : state === "missing" ? (
            <div className="form">
              <p className="note">{t("missing")}</p>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <p className="note">{t("lede")}</p>
              <label>
                {f("name")}
                <input name="name" type="text" autoComplete="name" required maxLength={200} />
              </label>
              <label>
                {f("email")}
                <input name="email" type="email" autoComplete="email" required maxLength={320} />
              </label>
              <label>
                {f("company")}
                <input name="company" type="text" autoComplete="organization" maxLength={200} />
              </label>

              {/* the honeypot, off-screen and hidden from assistive tech (see ContactForm) */}
              <div className="hp" aria-hidden="true">
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <input type="hidden" name="doc" value={doc} readOnly />
              <input type="hidden" name="title" value={title} readOnly />

              <Turnstile onToken={onToken} resetKey={resetKey} theme="light" />

              <div>
                <button className="cta" type="submit" disabled={state === "sending"}>
                  {state === "sending" ? t("sending") : t("send")}
                </button>
              </div>

              {error ? <p className="err">{error}</p> : null}
              <p className="note">{f("privacy")}</p>
            </form>
          )}
        </div>
      ) : null}
    </>
  );
}
