const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/b61930c2-8cfe-4ae5-a157-010478447c63/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  // ── Elastic Slider Scenarios ──
  { name: "116-desktop-elastic-slider-midnight", url: "http://localhost:5173/?component=elastic-slider&theme=midnight", w: 1280, h: 900 },
  { name: "117-desktop-elastic-slider-light", url: "http://localhost:5173/?component=elastic-slider&theme=minimal-light", w: 1280, h: 900 },
  { name: "118-desktop-elastic-slider-cyberpunk", url: "http://localhost:5173/?component=elastic-slider&theme=cyberpunk", w: 1280, h: 900 },

  // ── Wake Slider Scenarios ──
  { name: "119-desktop-wake-slider-ocean", url: "http://localhost:5173/?component=wake-slider&theme=ocean", w: 1280, h: 900 },
  { name: "120-tablet-wake-slider-emerald", url: "http://localhost:5173/?component=wake-slider&theme=emerald", w: 768, h: 1024 },
  { name: "121-mobile-wake-slider-sunset", url: "http://localhost:5173/?component=wake-slider&theme=sunset", w: 390, h: 844 },

  // ── Slider (Single & Dual Range) Scenarios ──
  { name: "122-desktop-slider-range-midnight", url: "http://localhost:5173/?component=slider&theme=midnight", w: 1280, h: 900 },
  { name: "123-desktop-slider-range-light", url: "http://localhost:5173/?component=slider&theme=minimal-light", w: 1280, h: 900 },
  { name: "124-mobile-slider-cyberpunk", url: "http://localhost:5173/?component=slider&theme=cyberpunk", w: 390, h: 844 },
];

(async () => {
  console.log(`Starting puppeteer screenshot capture of ${scenarios.length} slider scenarios...`);
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
    await new Promise((r) => setTimeout(r, 700));

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
})();
