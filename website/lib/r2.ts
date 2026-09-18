/**
 * The brochures in Cloudflare R2 (D108) - SERVER ONLY.
 *
 * The eight PDFs live in a PRIVATE bucket - no public URL, no custom domain - and the only reader is
 * the send route (app/api/document/send), which fetches one object with an S3 signature (SigV4) made
 * from node's own crypto. No SDK: the site keeps its dependency list as it is (the same choice as the
 * sheet, lib/google-sheet.ts).
 *
 * Four variables, set by DevOps (DEVOPS-SETUP.html step 4 and 6; .env.example):
 *   R2_ACCOUNT_ID         the Cloudflare account id - the host is <id>.r2.cloudflarestorage.com
 *   R2_ACCESS_KEY_ID      an R2 API token with "Object Read only" on the one bucket
 *   R2_SECRET_ACCESS_KEY  its secret
 *   R2_BUCKET             the bucket name
 * Any of them unset: the route answers {ok:false, reason:"unconfigured"} and says which.
 */

import { createHash, createHmac } from "node:crypto";

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secret: string;
  bucket: string;
}

export type R2Result =
  | { ok: true; bytes: Buffer; contentType: string }
  | { ok: false; reason: "unconfigured" | "missing" | "denied" | "r2"; detail: string };

export function r2Config(): R2Config | null {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secret = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET;
  if (!accountId || !accessKeyId || !secret || !bucket) return null;
  return { accountId, accessKeyId, secret, bucket };
}

export const r2Missing = (): string[] =>
  ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET"].filter((k) => !process.env[k]);

const sha256Hex = (s: string | Buffer): string => createHash("sha256").update(s).digest("hex");
const hmac = (key: Buffer | string, s: string): Buffer => createHmac("sha256", key).update(s).digest();

/** AWS-style URI encoding of one path segment (RFC 3986, the five characters encodeURIComponent leaves) */
const encodeSegment = (s: string): string =>
  encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());

/** GET one object from the bucket. Never throws. */
export async function r2Get(key: string): Promise<R2Result> {
  const c = r2Config();
  if (!c) return { ok: false, reason: "unconfigured", detail: `unset: ${r2Missing().join(", ")}` };

  const host = `${c.accountId}.r2.cloudflarestorage.com`;
  const path = `/${encodeSegment(c.bucket)}/${key.split("/").map(encodeSegment).join("/")}`;
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ""); // 20260918T101500Z
  const date = amzDate.slice(0, 8);
  const scope = `${date}/auto/s3/aws4_request`;
  const payloadHash = sha256Hex("");
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = [
    "GET",
    path,
    "",
    `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256Hex(canonicalRequest)].join("\n");
  const kSigning = hmac(hmac(hmac(hmac("AWS4" + c.secret, date), "auto"), "s3"), "aws4_request");
  const signature = createHmac("sha256", kSigning).update(stringToSign).digest("hex");
  const authorization = `AWS4-HMAC-SHA256 Credential=${c.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  try {
    const res = await fetch(`https://${host}${path}`, {
      headers: { "x-amz-content-sha256": payloadHash, "x-amz-date": amzDate, authorization },
      cache: "no-store",
    });
    if (res.status === 404) return { ok: false, reason: "missing", detail: `${key} is not in the bucket` };
    if (res.status === 403) return { ok: false, reason: "denied", detail: "R2 refused the token (403)" };
    if (!res.ok) return { ok: false, reason: "r2", detail: `R2 answered ${res.status}` };
    const bytes = Buffer.from(await res.arrayBuffer());
    return { ok: true, bytes, contentType: res.headers.get("content-type") || "application/pdf" };
  } catch (error) {
    return { ok: false, reason: "r2", detail: String(error) };
  }
}
