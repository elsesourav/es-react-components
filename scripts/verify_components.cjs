const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

if (!fs.existsSync(PROJECT_DIR)) fs.mkdirSync(PROJECT_DIR, { recursive: true });
if (!fs.existsSync(ARTIFACT_DIR)) fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

function copyToArtifacts(filename) {
  const src = path.join(PROJECT_DIR, filename);
  const dest = path.join(ARTIFACT_DIR, filename);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${filename} to artifacts.`);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log("=== CAPTURING 143: PARAMETER SLIDER VARIANTS ===");
  await page.goto("http://localhost:5173/?component=parameter-slider", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "143-desktop-parameter-slider-variants.png") });
  copyToArtifacts("143-desktop-parameter-slider-variants.png");

  console.log("=== CAPTURING 144: SEGMENTED A/B TABS ===");
  await page.goto("http://localhost:5173/?component=segmented-ab-tabs", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "144-desktop-segmented-ab-tabs.png") });
  copyToArtifacts("144-desktop-segmented-ab-tabs.png");

  console.log("=== CAPTURING 145: QUANTITY COUNTER ===");
  await page.goto("http://localhost:5173/?component=quantity-counter", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "145-desktop-quantity-counter.png") });
  copyToArtifacts("145-desktop-quantity-counter.png");

  console.log("=== CAPTURING 146: SEGMENTED A/B TABS LIGHT MODE ===");
  await page.evaluate(() => {
    // Click light theme preset button or toggle
    const buttons = Array.from(document.querySelectorAll("button"));
    const lightBtn = buttons.find(b => b.textContent && b.textContent.includes("Light"));
    if (lightBtn) lightBtn.click();
    else {
      const modeBtn = buttons.find(b => b.title && b.title.toLowerCase().includes("light"));
      if (modeBtn) modeBtn.click();
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "146-desktop-segmented-ab-tabs-light.png") });
  copyToArtifacts("146-desktop-segmented-ab-tabs-light.png");

  // Restore dark theme
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const darkBtn = buttons.find(b => b.textContent && b.textContent.includes("Dark"));
    if (darkBtn) darkBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  console.log("=== CAPTURING 147: MOBILE PARAMETER SLIDER (390x844) ===");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=parameter-slider", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "147-mobile-parameter-slider.png") });
  copyToArtifacts("147-mobile-parameter-slider.png");

  console.log("=== CAPTURING 148: MOBILE QUANTITY COUNTER (390x844) ===");
  await page.goto("http://localhost:5173/?component=quantity-counter", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "148-mobile-quantity-counter.png") });
  copyToArtifacts("148-mobile-quantity-counter.png");

  await browser.close();
  console.log("=== ALL SCREENSHOTS SUCCESSFULLY CAPTURED ===");
})();
