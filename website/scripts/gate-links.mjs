// pilot - 2026-09-18 - the LINK GATE for the built site: the same rule the mocks were held to, run
// against the real server.
//
// Every internal link on every page must resolve to a page that answers 200, and a link carrying a
// #fragment must resolve to an id that EXISTS on that page. Every image must answer 200. A bare
// href="#" is a dead link and fails. This is what caught 21 dead CTAs in the mocks on 2026-09-17.
//
//   npm run build && npm run gate:links            # spawns `next start` on :3210 itself
//   node scripts/gate-links.mjs http://localhost:3000   # or check a server already running
import { spawn } from "node:child_process";

// a FREE port, found now: a gate that silently talks to someone else's stale server proves
// nothing - that cost an hour on 2026-09-18.
const PORT = await (async () => {
  const net = await import("node:net");
  return await new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
  });
})();
const given = process.argv[2];
const base = (given ?? `http://127.0.0.1:${PORT}`).replace(/\/$/, "");

const PAGES = [
  "/",
  "/platform",
  "/scada",
  "/ems",
  "/eps",
  "/maintenance",
  "/reporting",
  "/partners/system-integrators",
  "/partners/machine-builders",
  "/partners/erp-vendors",
  "/partners/ai-startups",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitFor(url, tries = 90) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { redirect: "manual" });
      if (r.status < 500) return true;
    } catch {
      /* not up yet */
    }
    await sleep(1000);
  }
  return false;
}

let server = null;
if (!given) {
  server = spawn(process.platform === "win32" ? "npx.cmd" : "npx", ["next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });
  server.stdout.on("data", () => {});
  server.stderr.on("data", (d) => process.stderr.write(String(d)));
  if (!(await waitFor(base + "/"))) {
    console.error("the server did not come up on " + base);
    server.kill();
    process.exit(1);
  }
}

const html = new Map();
const ids = new Map();
let failed = 0;

async function load(path) {
  if (html.has(path)) return html.get(path);
  const res = await fetch(base + path, { redirect: "follow" });
  const body = res.ok ? await res.text() : "";
  html.set(path, { status: res.status, body });
  ids.set(path, new Set([...body.matchAll(/id="([^"]+)"/g)].map((m) => m[1])));
  return html.get(path);
}

console.log(`link gate: ${base}`);
for (const path of PAGES) {
  const page = await load(path);
  if (page.status !== 200) {
    console.error(`  PAGE ${page.status}   ${path}`);
    failed++;
    continue;
  }
}

let links = 0;
let images = 0;
const seenImage = new Set();

for (const path of PAGES) {
  const page = html.get(path);
  if (!page || page.status !== 200) continue;

  for (const m of page.body.matchAll(/<a[^>]*href="([^"]*)"/g)) {
    const raw = m[1];
    if (!raw || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(raw)) continue;
    links++;
    if (raw === "#") {
      console.error(`  DEAD ANCHOR      ${path} -> href="#"`);
      failed++;
      continue;
    }
    const [target, frag] = raw.split("#");
    const targetPath = target === "" ? path : target.startsWith("/") ? target : path.replace(/\/[^/]*$/, "/") + target;
    const clean = targetPath.replace(/\/$/, "") || "/";
    const t = await load(clean);
    if (t.status !== 200) {
      console.error(`  MISSING PAGE     ${path} -> ${raw}  (${t.status})`);
      failed++;
      continue;
    }
    if (frag && !ids.get(clean)?.has(frag)) {
      console.error(`  MISSING ANCHOR   ${path} -> ${raw}`);
      failed++;
    }
  }

  for (const m of page.body.matchAll(/<img[^>]*src="([^"]+)"/g)) {
    let src = m[1];
    if (!src || src.startsWith("data:")) continue;
    src = src.replace(/&amp;/g, "&");
    if (!src.startsWith("/")) continue;
    if (seenImage.has(src)) continue;
    seenImage.add(src);
    images++;
    const r = await fetch(base + src, { method: "GET" });
    if (!r.ok) {
      console.error(`  MISSING IMAGE    ${path} -> ${src}  (${r.status})`);
      failed++;
    }
  }
}

console.log(
  `link gate: ${links} links and ${images} images across ${PAGES.length} pages - broken ${failed}`,
);

if (server) server.kill();
process.exit(failed ? 1 : 0);
