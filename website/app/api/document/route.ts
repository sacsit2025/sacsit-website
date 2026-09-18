/**
 * POST /api/document - the gate in front of the eight brochures (D89, D90, D92).
 *
 * Same three doors as the contact route, then the lead is recorded, and only then is the file looked
 * for. That order is deliberate: a document whose PDF has not landed yet still produces a LEAD, and
 * the answer {ok:false, reason:"missing"} makes the panel print `documents.missing` - "write to
 * info@sacsit.com and we will send it to you". The name and the e-mail are already recorded, so the
 * request can be answered by hand.
 *
 * The PDFs live in `documents/` at the repo root, never in public/: a gated file must not be
 * fetchable by URL. What comes back is a signed, fifteen-minute link (app/api/document/sign.ts).
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { documentById } from "@/content/documents";
import { clientIp, rateLimited, recordLead, trapped, leadLost } from "@/lib/leads";
import { verifyTurnstile } from "@/lib/turnstile";
import { mintToken } from "./sign";
import { documentOnDisk } from "./files";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  doc: z.string().min(1).max(64),
  name: z.string().min(1).max(200),
  email: z.email().max(320),
  company: z.string().max(200).optional(),
  website: z.string().max(500).optional(),
  elapsed: z.number().optional(),
  turnstile: z.string().max(4096).nullable().optional(),
});

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, reason: "rate" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.warn("document: body was not JSON - refused");
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    console.warn(
      "document: refused -",
      parsed.error.issues.map((i) => `${i.path.join(".")}:${i.code}`).join(", "),
    );
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  const form = parsed.data;

  const doc = documentById(form.doc);
  if (!doc) {
    console.warn("document: unknown id -", form.doc);
    return NextResponse.json({ ok: false, reason: "unknown" }, { status: 404 });
  }

  if (trapped("document", form.website, form.elapsed)) {
    return NextResponse.json({ ok: true, url: null });
  }

  if (!(await verifyTurnstile(form.turnstile, ip))) {
    return NextResponse.json({ ok: false, reason: "robot" }, { status: 403 });
  }

  const outcome = await recordLead({
    kind: "document",
    document: doc.title,
    name: form.name,
    email: form.email,
    company: form.company,
  });

  if (leadLost(outcome)) {
    return NextResponse.json({ ok: false, reason: "send" }, { status: 502 });
  }

  const onDisk = await documentOnDisk(doc.file);
  if (!onDisk) {
    console.log(`document: ${doc.id} requested, ${doc.file} not in documents/ - answered "missing"`);
    return NextResponse.json({ ok: false, reason: "missing" });
  }

  console.log(`document: ${doc.id} link minted for ${form.email}`);
  return NextResponse.json({ ok: true, url: `/api/document/${mintToken(doc.id)}`, title: doc.title });
}
