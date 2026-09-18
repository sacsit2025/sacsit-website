/**
 * Where the eight PDFs live, and the one door to them - SERVER ONLY.
 *
 * `documents/` at the repo root, NOT in public/: a gated file must not be fetchable by URL (D89).
 * Only a name that comes out of content/documents.ts is ever opened, and the resolved path is checked
 * against the folder anyway - a belt and braces against any future caller that passes a name along.
 */

import { stat } from "node:fs/promises";
import { join, resolve, sep } from "node:path";

/** The drop folder DevOps fills (documents/README.md). */
export const documentsDir = (): string => resolve(join(process.cwd(), "documents"));

/** The absolute path of a document that is really there, or null (absent, a folder, or outside). */
export async function documentOnDisk(file: string): Promise<string | null> {
  const dir = documentsDir();
  const path = resolve(join(dir, file));
  if (!path.startsWith(dir + sep)) {
    console.warn("document: path escapes documents/ - refused:", file);
    return null;
  }
  try {
    const found = await stat(path);
    return found.isFile() ? path : null;
  } catch {
    return null;
  }
}
