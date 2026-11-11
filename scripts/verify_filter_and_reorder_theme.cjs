const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/748ea79f-5a89-40eb-b5b4-ea4da65281ff/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

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
  await page.setViewport({ width: 1280, height: 950, deviceScaleFactor: 2 });

  // 1. FILTER GRID - MIDNIGHT (DARK)
  console.log("=== 1. FILTER GRID - MIDNIGHT ===");
  await page.goto("http://localhost:5173/?component=filter-grid&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "filter-grid-midnight.png") });
  copyToArtifacts("filter-grid-midnight.png");

  // Click second filter chip
  const chips = await page.$$('div[role="tablist"] button');
  if (chips.length > 1) {
    await chips[1].click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(PROJECT_DIR, "filter-grid-midnight-active.png") });
    copyToArtifacts("filter-grid-midnight-active.png");
  }

  // 2. FILTER GRID - MINIMAL LIGHT
  console.log("=== 2. FILTER GRID - LIGHT ===");
  await page.goto("http://localhost:5173/?component=filter-grid&theme=minimal-light", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "filter-grid-light.png") });
  copyToArtifacts("filter-grid-light.png");

  // 3. REORDER LIST - MIDNIGHT
  console.log("=== 3. REORDER LIST - MIDNIGHT ===");
  await page.goto("http://localhost:5173/?component=reorder-list&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "reorder-list-midnight.png") });
  copyToArtifacts("reorder-list-midnight.png");

  // Interact with ReorderList via keyboard to test grabbed state
  const firstRow = await page.$('ul[aria-label="Ingress Pipeline Tasks"] li, [role="button"][aria-describedby]');
  if (firstRow) {
    await firstRow.focus();
    await page.keyboard.press("Space");
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(PROJECT_DIR, "reorder-list-midnight-grabbed.png") });
    copyToArtifacts("reorder-list-midnight-grabbed.png");
    // Move down
    await page.keyboard.press("ArrowDown");
    await new Promise(r => setTimeout(r, 300));
    await page.keyboard.press("Space");
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(PROJECT_DIR, "reorder-list-midnight-reordered.png") });
    copyToArtifacts("reorder-list-midnight-reordered.png");
  }

  // 4. REORDER LIST - MINIMAL LIGHT
  console.log("=== 4. REORDER LIST - LIGHT ===");
  await page.goto("http://localhost:5173/?component=reorder-list&theme=minimal-light", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "reorder-list-light.png") });
  copyToArtifacts("reorder-list-light.png");

  const firstRowLight = await page.$('ul[aria-label="Ingress Pipeline Tasks"] li, [role="button"][aria-describedby]');
  if (firstRowLight) {
    await firstRowLight.focus();
    await page.keyboard.press("Space");
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(PROJECT_DIR, "reorder-list-light-grabbed.png") });
    copyToArtifacts("reorder-list-light-grabbed.png");
    await page.keyboard.press("Space");
  }

  // 5. RESPONSIVE MOBILE VIEW (390x844)
  console.log("=== 5. RESPONSIVE MOBILE VIEW ===");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=reorder-list&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "reorder-list-mobile-midnight.png") });
  copyToArtifacts("reorder-list-mobile-midnight.png");

  await page.goto("http://localhost:5173/?component=filter-grid&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "filter-grid-mobile-midnight.png") });
  copyToArtifacts("filter-grid-mobile-midnight.png");

  await browser.close();
  console.log("All screenshots captured successfully!");
})();
