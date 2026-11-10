const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  // ── Tabs (Migrated Spring Plateau) ──
  { name: "43-desktop-midnight-tabs", url: "http://localhost:5173/?component=tabs&theme=midnight", w: 1280, h: 850 },
  { name: "44-tablet-light-tabs", url: "http://localhost:5173/?component=tabs&theme=minimal-light", w: 768, h: 1024 },
  { name: "45-mobile-cyberpunk-tabs", url: "http://localhost:5173/?component=tabs&theme=cyberpunk", w: 390, h: 844 },

  // ── Segmented Control ──
  { name: "46-desktop-ocean-segmented-control", url: "http://localhost:5173/?component=segmented-control&theme=ocean", w: 1280, h: 850 },
  { name: "47-tablet-sunset-segmented-control", url: "http://localhost:5173/?component=segmented-control&theme=sunset", w: 768, h: 1024 },
  { name: "48-mobile-light-segmented-control", url: "http://localhost:5173/?component=segmented-control&theme=minimal-light", w: 390, h: 844 },

  // ── Accordion ──
  { name: "49-desktop-emerald-accordion", url: "http://localhost:5173/?component=accordion&theme=emerald", w: 1280, h: 850 },
  { name: "50-tablet-midnight-accordion", url: "http://localhost:5173/?component=accordion&theme=midnight", w: 768, h: 1024 },
  { name: "51-mobile-sunset-accordion", url: "http://localhost:5173/?component=accordion&theme=sunset", w: 390, h: 844 },

  // ── Wizard Steps ──
  { name: "52-desktop-cyberpunk-wizard-steps", url: "http://localhost:5173/?component=wizard-steps&theme=cyberpunk", w: 1280, h: 850 },
  { name: "53-tablet-ocean-wizard-steps", url: "http://localhost:5173/?component=wizard-steps&theme=ocean", w: 768, h: 1024 },
  { name: "54-mobile-light-wizard-steps", url: "http://localhost:5173/?component=wizard-steps&theme=minimal-light", w: 390, h: 844 },

  // ── Pagination ──
  { name: "55-desktop-sunset-pagination", url: "http://localhost:5173/?component=pagination&theme=sunset", w: 1280, h: 850 },
  { name: "56-tablet-emerald-pagination", url: "http://localhost:5173/?component=pagination&theme=emerald", w: 768, h: 1024 },
  { name: "57-mobile-midnight-pagination", url: "http://localhost:5173/?component=pagination&theme=midnight", w: 390, h: 844 },

  // ── Tree View ──
  { name: "58-desktop-light-tree-view", url: "http://localhost:5173/?component=tree-view&theme=minimal-light", w: 1280, h: 850 },
  { name: "59-tablet-cyberpunk-tree-view", url: "http://localhost:5173/?component=tree-view&theme=cyberpunk", w: 768, h: 1024 },
  { name: "60-mobile-ocean-tree-view", url: "http://localhost:5173/?component=tree-view&theme=ocean", w: 390, h: 844 },
];

(async () => {
  console.log(`Starting puppeteer screenshot capture of ${scenarios.length} scenarios...`);
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
    // Small delay to ensure motion spring settlements
    await new Promise((r) => setTimeout(r, 600));

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All 18 screenshots captured and synchronized successfully!");
})();
