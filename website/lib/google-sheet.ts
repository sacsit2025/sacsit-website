/**
 * One row appended to the owner's Google Sheet (D92) - SERVER ONLY.
 *
 * The sheet is the list of record; the site stores nothing (D29). A service account writes it: its
 * e-mail is shared as an editor on the sheet, and we sign a JWT with its private key, swap the JWT
 * for an access token and write the row.
 *
 * WHERE the row goes is decided here, not by `values:append`. Append looks for the last row holding
 * any value in any column - and the team's "accept" column, made with Insert > Checkbox, holds a
 * FALSE in every row down to 1000, so append put the leads at row 1001 (2026-09-18, twice). The
 * "received" stamp in column A is written by the site alone: the last row with one is the last
 * lead, and the new row goes right under it.
 *
 * No `googleapis` package: that dependency is ~50 MB for three HTTP calls we can make ourselves with
 * node's own crypto. The signing is plain RS256 over the two base64url segments - the same thing the
 * library does.
 *
 * D88: with the variables unset the whole thing is skipped with one console line and NOTHING throws.
 */

import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const JWT_GRANT = "urn:ietf:params:oauth:grant-type:jwt-bearer";

const b64url = (value: string | Buffer): string => Buffer.from(value).toString("base64url");

/** A key pasted into an env var carries literal \n; a key pasted into a file carries real ones. */
const privateKey = (): string => (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\n/g, "\n").trim();

export function sheetConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && privateKey(),
  );
}

let cached: { token: string; expires: number } | null = null;

async function accessToken(email: string, key: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cached && cached.expires > now + 60) return cached.token;

  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({ iss: email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  );
  const signed = `${header}.${claims}`;
  const signature = createSign("RSA-SHA256").update(signed).sign(key).toString("base64url");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: JWT_GRANT, assertion: `${signed}.${signature}` }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  const json = (await res.json()) as { access_token?: string; error_description?: string; error?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(`token ${res.status}: ${json.error_description ?? json.error ?? "no access_token"}`);
  }
  cached = { token: json.access_token, expires: now + 3000 };
  return json.access_token;
}

/**
 * Write one row to the sheet, under the last lead. Resolves to null on success, or to the reason
 * it did not happen - the caller decides what to do with it (lib/leads.ts logs it and carries on).
 */
export async function appendSheetRow(row: readonly (string | number)[]): Promise<string | null> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = privateKey();
  const tab = process.env.GOOGLE_SHEET_TAB || "leads";
  if (!sheetId || !email || !key) {
    console.log("sheet: GOOGLE_SHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY unset - skipped (local mode)");
    return null;
  }
  try {
    const token = await accessToken(email, key);
    const base = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/`;
    const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" };

    // the last row with a "received" stamp - column A is the site's own, nobody else writes it
    const read = await fetch(`${base}${encodeURIComponent(`${tab}!A:A`)}?majorDimension=COLUMNS`, {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!read.ok) return await failed(read);
    const column = ((await read.json()) as { values?: string[][] }).values?.[0] ?? [];
    let last = column.length;
    while (last > 0 && !String(column[last - 1] ?? "").trim()) last--;
    const next = Math.max(last, 1) + 1; // never row 1: that is the header, even on an empty tab

    const end = String.fromCharCode("A".charCodeAt(0) + row.length - 1);
    const range = `${tab}!A${next}:${end}${next}`;
    const res = await fetch(`${base}${encodeURIComponent(range)}?valueInputOption=RAW`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ range, majorDimension: "ROWS", values: [row] }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return await failed(res);
    return null;
  } catch (error) {
    cached = null;
    return `sheet: ${String(error)}`;
  }
}

async function failed(res: Response): Promise<string> {
  const detail = await res.text();
  // a stale token (rotated key, clock skew) must not poison the next request
  if (res.status === 401 || res.status === 403) cached = null;
  return `sheet ${res.status}: ${detail.slice(0, 300)}`;
}
