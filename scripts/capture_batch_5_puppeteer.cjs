const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  // ── Sticky Header ──
  { name: "61-desktop-midnight-sticky-header", url: "http://localhost:5173/?component=sticky-header&theme=midnight", w: 1280, h: 850 },
  { name: "62-tablet-light-sticky-header", url: "http://localhost:5173/?component=sticky-header&theme=minimal-light", w: 768, h: 1024 },
  { name: "63-mobile-cyberpunk-sticky-header", url: "http://localhost:5173/?component=sticky-header&theme=cyberpunk", w: 390, h: 844 },

  // ── Reading Progress ──
  { name: "64-desktop-ocean-reading-progress", url: "http://localhost:5173/?component=reading-progress&theme=ocean", w: 1280, h: 850 },
  { name: "65-tablet-sunset-reading-progress", url: "http://localhost:5173/?component=reading-progress&theme=sunset", w: 768, h: 1024 },
  { name: "66-mobile-light-reading-progress", url: "http://localhost:5173/?component=reading-progress&theme=minimal-light", w: 390, h: 844 },

  // ── Scroll Spy ──
  { name: "67-desktop-emerald-scroll-spy", url: "http://localhost:5173/?component=scroll-spy&theme=emerald", w: 1280, h: 850 },
  { name: "68-tablet-midnight-scroll-spy", url: "http://localhost:5173/?component=scroll-spy&theme=midnight", w: 768, h: 1024 },
  { name: "69-mobile-ocean-scroll-spy", url: "http://localhost:5173/?component=scroll-spy&theme=ocean", w: 390, h: 844 },

  // ── Hide On Scroll ──
  { name: "70-desktop-cyberpunk-hide-on-scroll", url: "http://localhost:5173/?component=hide-on-scroll&theme=cyberpunk", w: 1280, h: 850 },
  { name: "71-tablet-sunset-hide-on-scroll", url: "http://localhost:5173/?component=hide-on-scroll&theme=sunset", w: 768, h: 1024 },
  { name: "72-mobile-midnight-hide-on-scroll", url: "http://localhost:5173/?component=hide-on-scroll&theme=midnight", w: 390, h: 844 },
];

(async () => {
  console.log(`Starting puppeteer screenshot capture of ${scenarios.length} scenarios for Batch 5...`);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"]
  });

  const page = await browser.newPage();

  for (let i = 0; i < scenarios.length; i++) {
    const s = scenarios[i];
    console.log(`[${i + 1}/${scenarios.length}] Capturing ${s.name} (${s.w}x${s.h})...`);
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto(s.url, { waitUntil: "networkidle0" });
    // Small delay to ensure motion settlements
    await new Promise((r) => setTimeout(r, 600));

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All 12 Batch 5 screenshots captured and synchronized successfully!");
})();
