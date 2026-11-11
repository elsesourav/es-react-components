const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

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
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  console.log("=== 1. VERIFYING LOCALHOST:5173 ===");
  await page.goto("http://localhost:5173/?component=segmented-ab-tabs", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));

  // Screenshot of Segmented A/B Tabs Preview
  await page.screenshot({ path: path.join(PROJECT_DIR, "168-segmented-ab-tabs-preview.png") });
  copyToArtifacts("168-segmented-ab-tabs-preview.png");

  // Click on Usage & Code tab
  const codeTab = await page.$('button[role="tab"]:nth-of-type(2)');
  if (codeTab) {
    await codeTab.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(PROJECT_DIR, "169-segmented-ab-tabs-code-highlighted.png") });
    copyToArtifacts("169-segmented-ab-tabs-code-highlighted.png");
  }

  // Navigate to Quantity Counter
  console.log("=== 2. VERIFYING QUANTITY COUNTER ===");
  await page.goto("http://localhost:5173/?component=quantity-counter", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "170-quantity-counter-preview.png") });
  copyToArtifacts("170-quantity-counter-preview.png");

  // Navigate to Parameter Slider
  console.log("=== 3. VERIFYING PARAMETER SLIDER & CONTROLS ===");
  await page.goto("http://localhost:5173/?component=parameter-slider", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "171-parameter-slider-preview.png") });
  copyToArtifacts("171-parameter-slider-preview.png");

  // Click on Usage & Code tab on Parameter Slider
  const codeTab2 = await page.$('button[role="tab"]:nth-of-type(2)');
  if (codeTab2) {
    await codeTab2.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(PROJECT_DIR, "172-parameter-slider-code.png") });
    copyToArtifacts("172-parameter-slider-code.png");
  }

  // Navigate to Reorder List (interior [.] dev match)
  console.log("=== 4. VERIFYING REORDER LIST ===");
  await page.goto("http://localhost:5173/?component=reorder-list", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "173-reorder-list-preview.png") });
  copyToArtifacts("173-reorder-list-preview.png");

  // Verify Live GitHub Pages
  console.log("=== 5. VERIFYING LIVE GITHUB PAGES DEPLOYMENT ===");
  await page.goto("https://elsesourav.github.io/es-react-components/?component=segmented-ab-tabs", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(PROJECT_DIR, "174-live-github-pages-segmented.png") });
  copyToArtifacts("174-live-github-pages-segmented.png");

  await browser.close();
  console.log("=== VERIFICATION COMPLETED SUCCESSFULLY ===");
})();
