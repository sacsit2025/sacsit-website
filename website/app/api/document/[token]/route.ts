/**
 * GET /api/document/<token> - the file itself (D89).
 *
 * The token is the whole permission: an HMAC over the document id and an expiry, minted by the gate
 * fifteen minutes earlier (../sign.ts). Wrong, tampered with, expired, unknown id or the file absent
 * all answer the same 404 - the link says nothing about what exists. The bytes come from `documents/`
 * at the repo root, the only folder this route will open, and are sent as an attachment.
 */

import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { documentById } from "@/content/documents";
import { documentOnDisk } from "../files";
import { readToken } from "../sign";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const notFound = () =>
  new NextResponse("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const id = readToken(token);
  if (!id) {
    console.warn("document: a download link was wrong or expired - 404");
    return notFound();
  }

  const doc = documentById(id);
  if (!doc) {
    console.warn("document: token names an unknown document -", id);
    return notFound();
  }

  const path = await documentOnDisk(doc.file);
  if (!path) {
    console.warn(`document: ${doc.file} is not in documents/ - 404`);
    return notFound();
  }

  const bytes = await readFile(path);
  console.log(`document: served ${doc.id} (${bytes.length} bytes)`);
  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-length": String(bytes.length),
      "content-disposition": `attachment; filename="${basename(doc.file)}"`,
      "cache-control": "private, no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
