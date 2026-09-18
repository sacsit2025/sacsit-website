"use client";

/**
 * "Get the file", wired (D89, which closes D86's deferral) - now a modal dialog.
 *
 * The shelf's eight buttons carried `data-defer="react"` in the mocks; in React they open a small
 * dialog over the page - the document's title, then name, e-mail, company, Turnstile, one button -
 * and the download link comes back from the route. The lead is mailed and written to the sheet
 * either way (D92), so a document whose PDF has not landed on the site still records the request:
 * the dialog then thanks the visitor and says the team sends the file by e-mail (D107 - the team's
 * tick in the sheet does the sending).
 *
 * The dialog is the platform's own <dialog> (showModal): Escape closes it, focus is trapped inside
 * it, and a click on the backdrop closes it too. It is mounted only while open, so every opening
 * starts clean - fresh fields, a fresh time-trap clock, a fresh Turnstile.
 *
 * Same three doors as the contact form: the off-screen honeypot, the three-second time trap and
 * Turnstile. Every word comes from messages/en.json (`documents.*` and `contact.*` for the fields).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { rich } from "@/lib/rich";
import Turnstile from "./Turnstile";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type State = "idle" | "sending" | "ready" | "missing" | "failed";

export interface DocumentButtonProps {
  /** the id in content/documents.ts ("platform", "scada", "ems", ...) */
  doc: string;
  /** the document's title, printed in the dialog and sent with the lead */
  title: string;
  /** the shelf's own line under the title ("pdf · 14 pages"), printed in the dialog's header */
  meta?: string;
}

export default function DocumentButton({ doc, title, meta }: DocumentButtonProps) {
  const t = useTranslations("documents");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="plain" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        {t("title")}
      </button>
      {open ? <DocumentDialog doc={doc} title={title} meta={meta} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

interface DialogProps extends DocumentButtonProps {
  onClose: () => void;
}

function DocumentDialog({ doc, title, meta, onClose }: DialogProps) {
  const t = useTranslations("documents");
  const f = useTranslations("contact");
  const ref = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  // the time trap's clock starts when the dialog opens, not when the page loads
  const opened = useRef(Date.now());

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    // showModal moves focus to the first focusable element (the close button); the name field is
    // where a person wants to be
    dialog.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
  }, []);

  const onToken = useCallback((value: string | null) => setToken(value), []);

  /** a click on the backdrop - outside the card - closes; the card itself swallows its clicks */
  function onBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === ref.current) ref.current.close();
  }

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
      elapsed: Date.now() - opened.current,
      turnstile: token,
    };

    if (!payload.name || !payload.email) {
      setError(t("required"));
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
      setError(json.reason === "robot" ? f("robot") : json.reason === "invalid" ? t("required") : t("failed"));
    } catch {
      setResetKey((n) => n + 1);
      setState("failed");
      setError(t("failed"));
    }
  }

  const headingId = `doc-gate-${doc}-title`;

  return (
    <dialog ref={ref} className="gate" aria-labelledby={headingId} onClose={onClose} onClick={onBackdropClick}>
      <div className="gate-card on-white">
        <button className="gate-close" type="button" aria-label={t("close")} onClick={() => ref.current?.close()}>
          <span aria-hidden="true">×</span>
        </button>

        <header className="gate-head">
          <p className="kicker">{t("kicker")}</p>
          <h3 id={headingId}>{rich(title, `gate-${doc}`)}</h3>
          {meta ? <p className="meta">{meta}</p> : null}
        </header>

        {state === "ready" && url ? (
          <div className="form gate-answer">
            <p className="ok">{t("ready")}</p>
            <div>
              <a className="cta" href={url} download>
                {t("download")}
              </a>
            </div>
          </div>
        ) : state === "missing" ? (
          <div className="form gate-answer">
            <p className="ok">{t("thanks")}</p>
            <p className="note">{t("thanksNote")}</p>
            <div>
              <button className="cta" type="button" onClick={() => ref.current?.close()}>
                {t("close")}
              </button>
            </div>
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
    </dialog>
  );
}
