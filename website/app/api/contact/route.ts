/**
 * POST /api/contact - the contact band's desk (D19, D90, D92).
 *
 * The order of business: rate limit · honeypot · time trap · Turnstile · record. A trap answers
 * 200 {ok:true} on purpose - a bot that is told it failed comes back better. The console line says
 * what really happened, for the DevOps run.
 *
 * D88: no secret is needed to run this. With none set the mail is skipped, the sheet is skipped,
 * Turnstile is accepted, and the visitor is still answered 200 - so the form is testable today and
 * live tomorrow with four pasted keys and no code change.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, rateLimited, recordLead, trapped, leadLost } from "@/lib/leads";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** D19 fixes the four tokens; the form's first field offers exactly these (components/forms/ContactForm.tsx). */
const DESKS = ["PARTNER", "PLANT", "PRESS", "INVEST"] as const;

const Body = z.object({
  desk: z.enum(DESKS).optional(),
  name: z.string().min(1).max(200),
  email: z.email().max(320),
  company: z.string().max(200).optional(),
  country: z.string().max(200).optional(),
  message: z.string().max(5000).optional(),
  /** the honeypot - a person cannot see this field, so a value in it is a bot */
  website: z.string().max(500).optional(),
  /** milliseconds between the form appearing and the submit - the time trap */
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
    console.warn("contact: body was not JSON - refused");
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    console.warn(
      "contact: refused -",
      parsed.error.issues.map((i) => `${i.path.join(".")}:${i.code}`).join(", "),
    );
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  const form = parsed.data;

  if (trapped("contact", form.website, form.elapsed)) {
    // 200 on purpose: the bot is told nothing, and nothing is recorded
    return NextResponse.json({ ok: true });
  }

  if (!(await verifyTurnstile(form.turnstile, ip))) {
    return NextResponse.json({ ok: false, reason: "robot" }, { status: 403 });
  }

  const outcome = await recordLead({
    kind: "contact",
    desk: form.desk ?? DESKS[0],
    name: form.name,
    email: form.email,
    company: form.company,
    country: form.country,
    message: form.message,
  });

  if (leadLost(outcome)) {
    // everything that was configured to take this lead failed: say so, so the visitor writes directly
    return NextResponse.json({ ok: false, reason: "send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
