const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  // ── Filter Grid ──
  { name: "73-desktop-midnight-filter-grid", url: "http://localhost:5173/?component=filter-grid&theme=midnight", w: 1280, h: 850 },
  { name: "74-tablet-ocean-filter-grid", url: "http://localhost:5173/?component=filter-grid&theme=ocean", w: 768, h: 1024 },
  { name: "75-mobile-light-filter-grid", url: "http://localhost:5173/?component=filter-grid&theme=minimal-light", w: 390, h: 844 },

  // ── Poll Results ──
  { name: "76-desktop-cyberpunk-poll-results", url: "http://localhost:5173/?component=poll-results&theme=cyberpunk", w: 1280, h: 850, action: "vote" },
  { name: "77-tablet-sunset-poll-results", url: "http://localhost:5173/?component=poll-results&theme=sunset", w: 768, h: 1024, action: "vote" },
  { name: "78-mobile-midnight-poll-results", url: "http://localhost:5173/?component=poll-results&theme=midnight", w: 390, h: 844 },

  // ── Slider Detents ──
  { name: "79-desktop-emerald-slider-detents", url: "http://localhost:5173/?component=slider-detents&theme=emerald", w: 1280, h: 850 },
  { name: "80-tablet-light-slider-detents", url: "http://localhost:5173/?component=slider-detents&theme=minimal-light", w: 768, h: 1024 },
  { name: "81-mobile-sunset-slider-detents", url: "http://localhost:5173/?component=slider-detents&theme=sunset", w: 390, h: 844 },

  // ── Reorder List ──
  { name: "82-desktop-ocean-reorder-list", url: "http://localhost:5173/?component=reorder-list&theme=ocean", w: 1280, h: 850 },
  { name: "83-tablet-midnight-reorder-list", url: "http://localhost:5173/?component=reorder-list&theme=midnight", w: 768, h: 1024 },
  { name: "84-mobile-cyberpunk-reorder-list", url: "http://localhost:5173/?component=reorder-list&theme=cyberpunk", w: 390, h: 844 },

  // ── Lightbox ──
  { name: "85-desktop-midnight-lightbox", url: "http://localhost:5173/?component=lightbox&theme=midnight", w: 1280, h: 850, action: "open_lightbox" },
  { name: "86-tablet-light-lightbox", url: "http://localhost:5173/?component=lightbox&theme=minimal-light", w: 768, h: 1024 },
  { name: "87-mobile-ocean-lightbox", url: "http://localhost:5173/?component=lightbox&theme=ocean", w: 390, h: 844 },
];

(async () => {
  console.log(`Starting puppeteer screenshot capture of ${scenarios.length} scenarios for Batch 6...`);
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
    await new Promise((r) => setTimeout(r, 600));

    // Optional interactive actions
    if (s.action === "vote") {
      try {
        const optionBtn = await page.$("button[aria-pressed]");
        if (optionBtn) {
          await optionBtn.click();
          await new Promise((r) => setTimeout(r, 600));
        }
      } catch (err) {
        console.warn("Could not click vote option:", err.message);
      }
    } else if (s.action === "open_lightbox") {
      try {
        // Click the thumbnail to open modal
        const thumbBtn = await page.$("button.cursor-zoom-in");
        if (thumbBtn) {
          await thumbBtn.click();
          await new Promise((r) => setTimeout(r, 800));
        }
      } catch (err) {
        console.warn("Could not open lightbox:", err.message);
      }
    }

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All 15 Batch 6 screenshots captured and synchronized successfully!");
})();
