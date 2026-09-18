/**
 * Cloudflare Turnstile, verified on the server (D19) - SERVER ONLY, never imported by a component.
 *
 * D88: the site is built today and wired tomorrow, so a missing secret is a mode, not an error. With
 * no TURNSTILE_SECRET_KEY the check is skipped and says so on the console; the browser half sends the
 * literal "dev-stub" token in that mode (components/forms/Turnstile.tsx).
 */

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** The token components/forms/Turnstile.tsx reports when no site key is configured. */
export const TURNSTILE_STUB = "dev-stub";

export const turnstileConfigured = (): boolean => Boolean(process.env.TURNSTILE_SECRET_KEY);

/**
 * True when the browser proved it is a browser - or when we are running with no secret at all.
 * Never throws: a Cloudflare outage must not swallow a lead, so a network failure is logged and
 * accepted (the honeypot, the time trap and the rate limit still stand).
 */
export async function verifyTurnstile(token: string | undefined | null, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.log("turnstile: no secret set - accepting (local mode)");
    return true;
  }
  if (!token || token === TURNSTILE_STUB) {
    console.warn("turnstile: no token on a submission (secret IS set) - refused");
    return false;
  }
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch(SITEVERIFY, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const json = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (json.success) {
      console.log("turnstile: verified");
      return true;
    }
    console.warn("turnstile: refused -", (json["error-codes"] ?? ["no reason given"]).join(","));
    return false;
  } catch (error) {
    // Cloudflare unreachable: accept rather than lose the lead, and leave a line that says why.
    console.warn("turnstile: siteverify unreachable, accepting -", String(error));
    return true;
  }
}
