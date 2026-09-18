/**
 * POST /api/document/send - the brochure goes out, on the team's tick (D107, D108).
 *
 * The flow: a "Get the file" request is recorded as a lead (a mail to info@ and a row in the sheet)
 * and WAITS. When someone on the team ticks the row's `accept` cell, the sheet's own script
 * (deploy/sheet-script.gs) calls this route with the shared secret and the row. The route takes the
 * PDF from the private R2 bucket (lib/r2.ts) and mails it to the visitor through Resend - the same
 * account as the lead mail - with a prefilled subject and text; the script writes the answer back
 * into the row's `sent` cell.
 *
 * The secret is the whole permission: SEND_SECRET (Vercel) must equal the script's property. Unset
 * on the server, the route answers 503 and says so - never "sent". No visitor ever reaches this
 * route; the visitor's rate limit and human check do not apply here.
 */

import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";
import { z } from "zod";
import { DOCUMENTS, documentById } from "@/content/documents";
import { r2Get } from "@/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_FROM = "SACS-IT website <info@sacsit.com>";
const DEFAULT_REPLY_TO = "info@sacsit.com";

const Body = z.object({
  secret: z.string().min(1).max(512),
  /** the document's id ("scada") or its title exactly as the sheet holds it ("SCADA Core") */
  document: z.string().min(1).max(200),
  name: z.string().min(1).max(200),
  email: z.email().max(320),
  company: z.string().max(200).optional(),
  row: z.number().int().optional(),
});

const digest = (s: string): Buffer => createHash("sha256").update(s).digest();
const secretMatches = (given: string, expected: string): boolean => timingSafeEqual(digest(given), digest(expected));

const answer = (status: number, body: Record<string, unknown>) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  const expected = process.env.SEND_SECRET;
  if (!expected) {
    console.warn("send: SEND_SECRET unset - the route is closed");
    return answer(503, { ok: false, reason: "unconfigured", detail: "SEND_SECRET is not set on the server" });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return answer(400, { ok: false, reason: "body", detail: "the body was not JSON" });
  }
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return answer(400, { ok: false, reason: "body", detail: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") });
  }
  const form = parsed.data;

  if (!secretMatches(form.secret, expected)) {
    console.warn("send: wrong secret - refused");
    return answer(401, { ok: false, reason: "secret", detail: "the secret does not match SEND_SECRET" });
  }

  const doc = documentById(form.document) ?? DOCUMENTS.find((d) => d.title === form.document.trim());
  if (!doc) {
    return answer(404, { ok: false, reason: "document", detail: `no document known as "${form.document}"` });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("send: RESEND_API_KEY unset - nothing can be mailed");
    return answer(503, { ok: false, reason: "mail-unconfigured", detail: "RESEND_API_KEY is not set on the server" });
  }

  const file = await r2Get(doc.file);
  if (!file.ok) {
    console.warn(`send: ${doc.file} - ${file.reason}: ${file.detail}`);
    return answer(file.reason === "unconfigured" ? 503 : 502, { ok: false, reason: file.reason, detail: file.detail });
  }

  const firstName = form.name.trim().split(/\s+/)[0] || form.name.trim();
  const text = [
    `Hello ${firstName},`,
    "",
    `Thank you for your interest in SOP, the SCADA Open Platform. The brochure "${doc.title}" is attached.`,
    "",
    "To talk about your plant, reply to this e-mail.",
    "",
    "SACS-IT",
    "info@sacsit.com",
    "www.sacsit.com",
  ].join("\n");

  try {
    const resend = new Resend(key);
    const { data, error } = await resend.emails.send({
      from: process.env.LEAD_FROM || DEFAULT_FROM,
      to: [form.email],
      replyTo: process.env.LEAD_TO || DEFAULT_REPLY_TO,
      subject: `Your SOP brochure: ${doc.title}`,
      text,
      attachments: [{ filename: doc.file, content: file.bytes }],
    });
    if (error) {
      console.warn(`send: resend refused - ${error.message ?? String(error)}`);
      return answer(502, { ok: false, reason: "mail", detail: error.message ?? String(error) });
    }
    console.log(`send: ${doc.id} mailed to ${form.email}${form.row ? ` (row ${form.row})` : ""} - ${file.bytes.length} bytes`);
    return answer(200, { ok: true, id: data?.id ?? null, document: doc.id, bytes: file.bytes.length });
  } catch (error) {
    console.warn(`send: resend failed - ${String(error)}`);
    return answer(502, { ok: false, reason: "mail", detail: String(error) });
  }
}
