const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/b61930c2-8cfe-4ae5-a157-010478447c63/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const testScenarios = [
  // ── 1. ElasticSlider: Light, Dark, Cyberpunk, Desktop, Tablet, Mobile ──
  { name: "125-elastic-slider-dark-desktop", url: "http://localhost:5173/?component=elastic-slider&theme=midnight", w: 1280, h: 900 },
  { name: "126-elastic-slider-light-desktop", url: "http://localhost:5173/?component=elastic-slider&theme=minimal-light", w: 1280, h: 900 },
  { name: "127-elastic-slider-cyberpunk-tablet", url: "http://localhost:5173/?component=elastic-slider&theme=cyberpunk", w: 768, h: 1024 },
  { name: "128-elastic-slider-sunset-mobile", url: "http://localhost:5173/?component=elastic-slider&theme=sunset", w: 390, h: 844, scroll: 380 },

  // ── 2. WakeSlider: Light, Dark, Ocean, Emerald, Desktop, Tablet, Mobile ──
  { name: "129-wake-slider-dark-desktop", url: "http://localhost:5173/?component=wake-slider&theme=midnight", w: 1280, h: 900 },
  { name: "130-wake-slider-light-desktop", url: "http://localhost:5173/?component=wake-slider&theme=minimal-light", w: 1280, h: 900 },
  { name: "131-wake-slider-emerald-tablet", url: "http://localhost:5173/?component=wake-slider&theme=emerald", w: 768, h: 1024 },
  { name: "132-wake-slider-ocean-mobile", url: "http://localhost:5173/?component=wake-slider&theme=ocean", w: 390, h: 844, scroll: 380 },

  // ── 3. Slider (Single & Dual Range): Light, Dark, Cyberpunk, Desktop, Tablet, Mobile ──
  { name: "133-slider-range-dark-desktop", url: "http://localhost:5173/?component=slider&theme=midnight", w: 1280, h: 900 },
  { name: "134-slider-range-light-desktop", url: "http://localhost:5173/?component=slider&theme=minimal-light", w: 1280, h: 900 },
  { name: "135-slider-range-cyberpunk-tablet", url: "http://localhost:5173/?component=slider&theme=cyberpunk", w: 768, h: 1024 },
  { name: "136-slider-range-sunset-mobile", url: "http://localhost:5173/?component=slider&theme=sunset", w: 390, h: 844, scroll: 380 },
];

(async () => {
  console.log(`Starting comprehensive verification of ${testScenarios.length} slider configurations...`);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"]
  });

  const page = await browser.newPage();

  for (let i = 0; i < testScenarios.length; i++) {
    const s = testScenarios[i];
    console.log(`[${i + 1}/${testScenarios.length}] Capturing ${s.name} (${s.w}x${s.h})...`);
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto(s.url, { waitUntil: "networkidle0" });
    if (s.scroll) {
      await page.evaluate((y) => window.scrollTo(0, y), s.scroll);
    }
    await new Promise((r) => setTimeout(r, 600));

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All comprehensive verification screenshots captured successfully!");
})();
