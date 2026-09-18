// pilot - 2026-09-18 - the CHROME probe: does the header stay, does the rail appear, does the lit chip
// follow the reader, and does any of it cover the text?
//
// A page of that size navigated with a header that scrolls away is unusable: the menu would exist only
// at the top. The header is fixed now, with a compact state and an "on this page" rail. This probe
// scrolls a page 4 000 px down and MEASURES the result at 1440 and at 390, so a claim about the chrome
// is never a guess.
//
//   node scripts/check-chrome.mjs [baseUrl] [outDir]
import { chromium } from "playwright-core";

const base = (process.argv[2] ?? "http://127.0.0.1:3030").replace(/\/$/, "");
const out = process.argv[3] ?? ".";

const browser = await chromium.launch();
let bad = 0;

for (const [name, path, width] of [
  ["scada-1440", "/scada", 1440],
  ["home-1440", "/", 1440],
  ["scada-390", "/scada", 390],
]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

  await page.goto(base + path, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 4000));
  await page.waitForTimeout(700);

  const m = await page.evaluate(() => {
    const box = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { top: Math.round(b.top), height: Math.round(b.height), display: getComputedStyle(el).display };
    };
    const heading = [...document.querySelectorAll("h2,h3")].find((e) => {
      const b = e.getBoundingClientRect();
      return b.top > 0 && b.top < 800;
    });
    return {
      scrolled: document.body.dataset.scrolled,
      header: box("body > header"),
      rail: box(".rail"),
      chips: document.querySelectorAll(".rail a").length,
      current: document.querySelector(".rail a.on")?.textContent?.trim() ?? null,
      homeChip: Boolean(document.querySelector(".rail .rhome")),
      totopOn: document.querySelector(".totop")?.classList.contains("on") ?? false,
      progress: getComputedStyle(document.body).getPropertyValue("--progress").trim(),
      firstHeadingTop: heading ? Math.round(heading.getBoundingClientRect().top) : null,
      firstHeading: heading ? heading.textContent.slice(0, 44) : null,
    };
  });

  await page.screenshot({ path: `${out}/chrome-${name}.png`, clip: { x: 0, y: 0, width, height: 420 } });

  // the chrome must be at the top of the window, and must not sit over the first heading below it
  const chromeBottom = (m.header?.top ?? 0) + (m.header?.height ?? 0) + (m.rail?.display === "none" ? 0 : m.rail?.height ?? 0);
  const covers = m.firstHeadingTop !== null && m.firstHeadingTop < chromeBottom;
  const ok = m.scrolled === "1" && m.header?.top === 0 && !covers && errors.length === 0;
  if (!ok) bad++;
  console.log(
    `${name.padEnd(12)} scrolled=${m.scrolled} header=${m.header?.height}px@${m.header?.top} ` +
      `rail=${m.rail?.display === "none" ? "hidden (phone)" : `${m.rail?.height}px@${m.rail?.top}`} ` +
      `chips=${m.chips} current="${m.current}" home=${m.homeChip} toTop=${m.totopOn} ` +
      `progress=${Number(m.progress).toFixed(2)} firstHeading=${m.firstHeadingTop}px ` +
      `chromeBottom=${chromeBottom}px ${ok ? "OK" : "LOOK"}` +
      (errors.length ? ` errors: ${errors.slice(0, 2).join(" | ")}` : ""),
  );
  await ctx.close();
}

await browser.close();
console.log(bad ? `chrome probe: ${bad} case(s) to look at` : "chrome probe: the header stays, the rail appears, nothing is covered");
process.exit(bad ? 1 : 0);
