const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  // ── Parameter Slider / Scrubber Visualizer Showcase ──
  { name: "109-desktop-parameter-slider-midnight", url: "http://localhost:5173/?component=parameter-slider&theme=midnight", w: 1280, h: 900 },
  { name: "110-desktop-parameter-slider-light", url: "http://localhost:5173/?component=parameter-slider&theme=minimal-light", w: 1280, h: 900 },
  { name: "111-desktop-parameter-slider-cyberpunk", url: "http://localhost:5173/?component=parameter-slider&theme=cyberpunk", w: 1280, h: 900 },

  // ── Integrated Parameter Controls in Button & TextLoop ──
  { name: "112-desktop-button-parameter-controls", url: "http://localhost:5173/?component=button&theme=midnight", w: 1280, h: 900 },
  { name: "113-desktop-text-loop-parameters", url: "http://localhost:5173/?component=text-loop&theme=midnight", w: 1280, h: 900 },

  // ── Responsive Viewports ──
  { name: "114-tablet-parameter-slider-sunset", url: "http://localhost:5173/?component=parameter-slider&theme=sunset", w: 768, h: 1024 },
  { name: "115-mobile-parameter-slider-ocean", url: "http://localhost:5173/?component=parameter-slider&theme=ocean", w: 390, h: 844 },
];

(async () => {
  console.log(`Starting puppeteer screenshot capture of ${scenarios.length} ParameterSlider scenarios...`);
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
    await new Promise((r) => setTimeout(r, 650));

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All 7 ParameterSlider screenshots captured and synchronized successfully!");
})();
