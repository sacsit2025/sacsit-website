/**
 * What happens to a lead - SERVER ONLY, imported by the two routes and by nothing else.
 *
 * D92: every form (the contact band and the document gate) does two things with a lead - it MAILS it
 * to info@sacsit.com through Resend (D90) and it APPENDS A ROW to the owner's Google Sheet. The sheet is
 * the list of record; the site itself stores nothing (D29), so there is no database call here.
 *
 * D88 is the law of this file: the site is built today and wired tomorrow. Every secret is read from
 * the environment, a missing secret is a clearly-logged SKIP and not an error, and `recordLead` never
 * throws at its caller - it reports what worked so a DevOps run can be read off the console.
 *
 * What is NOT recorded: the IP address and the user agent. The form's own privacy line promises "what
 * you send ... and nothing else" (messages/en.json contact.privacy), so the IP is used for the rate
 * limit and for Turnstile in memory, and never written to the mail or the sheet.
 */

import { Resend } from "resend";
import { appendSheetRow, sheetConfigured } from "./google-sheet";

export type LeadKind = "contact" | "document";

export interface Lead {
  kind: LeadKind;
  /** the contact form's first field: PARTNER · PLANT · PRESS · INVEST (D19) */
  desk?: string;
  /** the gated document's title, for a `document` lead (D89) */
  document?: string;
  name: string;
  email: string;
  company?: string;
  country?: string;
  message?: string;
}

export interface LeadOutcome {
  mailed: boolean;
  sheeted: boolean;
  /** was there anywhere at all for this lead to go? (a mail transport or a sheet, configured) */
  configured: boolean;
  /** one string per thing that was configured and still failed - empty in local mode */
  errors: string[];
}

/** The sheet's header row, so the tab and this file agree (paste it into row 1 once). */
export const SHEET_HEADER = [
  "received",
  "kind",
  "desk / document",
  "name",
  "e-mail",
  "company",
  "country",
  "message",
] as const;

const DEFAULT_TO = "info@sacsit.com";
const DEFAULT_FROM = "SACS-IT website <info@sacsit.com>";

const subjectOf = (lead: Lead): string =>
  lead.kind === "document"
    ? `SOP document · ${lead.document ?? "unknown"} · ${lead.name}`
    : `SOP ${lead.desk ?? "PARTNER"} · ${lead.name}`;

const bodyOf = (lead: Lead): string =>
  [
    `Received   ${new Date().toISOString()}`,
    `Form       ${lead.kind === "document" ? "document gate (D89)" : "contact band (D19)"}`,
    lead.kind === "document" ? `Document   ${lead.document ?? ""}` : `Desk       ${lead.desk ?? ""}`,
    `Name       ${lead.name}`,
    `E-mail     ${lead.email}`,
    `Company    ${lead.company ?? ""}`,
    `Country    ${lead.country ?? ""}`,
    "",
    "Message",
    lead.message?.trim() ? lead.message.trim() : "(none)",
    "",
    "-- sacsit.com, sent by the site itself. Reply to this mail to answer the sender.",
  ].join("\n");

async function mailLead(lead: Lead): Promise<string | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("resend: RESEND_API_KEY unset - mail skipped (local mode)");
    return null;
  }
  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM || DEFAULT_FROM,
      to: [process.env.LEAD_TO || DEFAULT_TO],
      replyTo: lead.email,
      subject: subjectOf(lead),
      text: bodyOf(lead),
    });
    if (error) return `resend: ${error.message ?? String(error)}`;
    return null;
  } catch (error) {
    return `resend: ${String(error)}`;
  }
}

/**
 * Mail it and write the row. Never throws. Returns what happened so the route can tell the visitor
 * "write to info@sacsit.com" only when a lead was really lost.
 */
export async function recordLead(lead: Lead): Promise<LeadOutcome> {
  const row = [
    new Date().toISOString(),
    lead.kind,
    lead.kind === "document" ? (lead.document ?? "") : (lead.desk ?? ""),
    lead.name,
    lead.email,
    lead.company ?? "",
    lead.country ?? "",
    (lead.message ?? "").replace(/\s+/g, " ").trim(),
  ];

  const wantedMail = Boolean(process.env.RESEND_API_KEY);
  const wantedSheet = sheetConfigured();

  const [mailError, sheetError] = await Promise.all([mailLead(lead), appendSheetRow(row)]);

  const outcome: LeadOutcome = {
    mailed: wantedMail && !mailError,
    sheeted: wantedSheet && !sheetError,
    configured: wantedMail || wantedSheet,
    errors: [mailError, sheetError].filter((e): e is string => Boolean(e)),
  };

  console.log(
    `lead: ${lead.kind} · ${lead.kind === "document" ? lead.document : lead.desk} · ` +
      `mail ${wantedMail ? (outcome.mailed ? "sent" : "FAILED") : "skipped"} · ` +
      `sheet ${wantedSheet ? (outcome.sheeted ? "appended" : "FAILED") : "skipped"}`,
  );
  for (const error of outcome.errors) console.error("lead:", error);

  return outcome;
}

/**
 * True when the lead did not reach anybody - and the visitor must be told, not thanked.
 *
 * Two ways that happens, and BOTH count (2026-09-18, before the site went on the live domain):
 *  - something was configured to receive it and failed;
 *  - nothing is configured at all. A live form that says "thank you" while the message goes nowhere
 *    is worse than a form that says "write to us directly": the first loses the customer silently.
 *    So with no keys set the routes answer 502 and the form prints the direct address.
 */
export const leadLost = (outcome: LeadOutcome): boolean =>
  !outcome.configured || (outcome.errors.length > 0 && !outcome.mailed && !outcome.sheeted);

/* ── the three cheap doors in front of the forms (D19) ─────────────────────────────────────────── */

/** A submission faster than this is not a person filling a form in. */
export const MIN_ELAPSED_MS = 3000;

/**
 * The honeypot and the time trap. Returns the reason to refuse, or null to let it through.
 * The caller answers 200 {ok:true} on a refusal: a bot that learns nothing comes back no wiser.
 */
export function trapped(
  kind: string,
  honeypot: string | undefined,
  elapsedMs: number | undefined,
): "honeypot" | "fast" | null {
  if (honeypot && honeypot.trim()) {
    console.warn(`${kind}: honeypot filled - refused silently`);
    return "honeypot";
  }
  if (typeof elapsedMs === "number" && elapsedMs >= 0 && elapsedMs < MIN_ELAPSED_MS) {
    console.warn(`${kind}: submitted after ${elapsedMs}ms (< ${MIN_ELAPSED_MS}) - refused silently`);
    return "fast";
  }
  return null;
}

/**
 * A courtesy rate limit, NOT a defence: it lives in this process's memory, so it resets on every cold
 * start and a second serverless instance keeps its own count. It stops one hand hammering one form;
 * anything organised is Turnstile's and Cloudflare's job, in front of the route.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_IN_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_IN_WINDOW) {
    hits.set(ip, recent);
    console.warn(`rate: ${recent.length} posts from ${ip} in ${WINDOW_MS / 60000} min - refused`);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // keep the map from growing for ever on a long-lived box
  if (hits.size > 5000) for (const [key, times] of hits) if (times.every((t) => now - t > WINDOW_MS)) hits.delete(key);
  return false;
}

/** The caller's address, for the rate limit and Turnstile only - never recorded. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "local";
}
