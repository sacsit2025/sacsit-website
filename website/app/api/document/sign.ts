/**
 * The short-lived download link (D89) - SERVER ONLY.
 *
 * A gated PDF must not be fetchable by URL, so the file never lives in public/. What the visitor gets
 * back is a token: the document id and an expiry, signed with an HMAC. Fifteen minutes later the same
 * link is a 404. Nothing is stored - the signature IS the record, which is what lets the site keep no
 * database (D29).
 *
 * D88: with LEAD_SIGNING_SECRET unset a random secret is minted per boot and said so on the console.
 * That is enough for a local run but NOT for production: on Vercel the POST route and the download
 * route are two functions with two memories, so an unset secret there means every link 404s. DevOps
 * sets it (see .env.example).
 */

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const TTL_MS = 15 * 60 * 1000;

let booted: string | null = null;

function signingSecret(): string {
  const fromEnv = process.env.LEAD_SIGNING_SECRET;
  if (fromEnv) return fromEnv;
  if (!booted) {
    booted = randomBytes(32).toString("hex");
    console.log(
      "documents: LEAD_SIGNING_SECRET unset - minted a random one for this boot (links die on restart; set it in production)",
    );
  }
  return booted;
}

const mac = (payload: string): string =>
  createHmac("sha256", signingSecret()).update(payload).digest("base64url");

/** A token for one document, good for fifteen minutes. */
export function mintToken(doc: string, ttlMs: number = TTL_MS): string {
  const payload = `${doc}.${Date.now() + ttlMs}`;
  return `${Buffer.from(payload).toString("base64url")}.${mac(payload)}`;
}

/** The document id a token stands for, or null when it is wrong, tampered with or expired. */
export function readToken(token: string): string | null {
  const cut = token.lastIndexOf(".");
  if (cut < 1) return null;
  const body = token.slice(0, cut);
  const given = token.slice(cut + 1);
  let payload: string;
  try {
    payload = Buffer.from(body, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const want = Buffer.from(mac(payload));
  const have = Buffer.from(given);
  if (want.length !== have.length || !timingSafeEqual(want, have)) return null;

  const dot = payload.lastIndexOf(".");
  if (dot < 1) return null;
  const doc = payload.slice(0, dot);
  const expires = Number(payload.slice(dot + 1));
  if (!Number.isFinite(expires) || expires < Date.now()) return null;
  return doc;
}

export const TOKEN_TTL_MS = TTL_MS;
