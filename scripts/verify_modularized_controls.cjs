const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  { name: "116-desktop-tabs-parameters", url: "http://localhost:5173/?component=tabs&theme=midnight", w: 1280, h: 900 },
  { name: "117-desktop-segmented-parameters", url: "http://localhost:5173/?component=segmented-control&theme=midnight", w: 1280, h: 900 },
  { name: "118-desktop-sticky-header-parameters", url: "http://localhost:5173/?component=sticky-header&theme=midnight", w: 1280, h: 900 },
  { name: "119-desktop-peek-rating-parameters", url: "http://localhost:5173/?component=peek-rating&theme=midnight", w: 1280, h: 900 },
  { name: "120-desktop-input-parameters", url: "http://localhost:5173/?component=input&theme=midnight", w: 1280, h: 900 },
  { name: "121-desktop-pagination-parameters", url: "http://localhost:5173/?component=pagination&theme=midnight", w: 1280, h: 900 },
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
    const sc = scenarios[i];
    console.log(`[${i + 1}/${scenarios.length}] Capturing ${sc.name} (${sc.w}x${sc.h})...`);
    await page.setViewport({ width: sc.w, height: sc.h, deviceScaleFactor: 2 });
    await page.goto(sc.url, { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 600));

    const projPath = path.join(PROJECT_DIR, `${sc.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${sc.name}.png`);
    await page.screenshot({ path: projPath, fullPage: false });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All parameter control screenshots captured and synchronized successfully!");
})();
