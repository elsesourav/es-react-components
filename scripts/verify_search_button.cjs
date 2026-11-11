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

  console.log("=== CAPTURING 149: TOP NAVBAR SEARCH WITH ANIMATED PLACEHOLDER ===");
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(PROJECT_DIR, "149-desktop-top-navbar-search.png") });
  copyToArtifacts("149-desktop-top-navbar-search.png");

  console.log("=== CAPTURING 150: SEARCH BUTTON COMPONENT PLAYGROUND ===");
  await page.goto("http://localhost:5173/?component=search-button", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "150-desktop-search-button-playground.png") });
  copyToArtifacts("150-desktop-search-button-playground.png");

  console.log("=== CAPTURING 151: COMMAND PALETTE WITH SCOPE BAR ===");
  // Press Cmd+K or click the search button to open command palette
  await page.evaluate(() => {
    const searchBtn = document.querySelector('header button[aria-label*="Search"]');
    if (searchBtn) searchBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "151-desktop-command-palette-scopes.png") });
  copyToArtifacts("151-desktop-command-palette-scopes.png");

  // Click a scope in the command palette, e.g. "Sliders & Range"
  await page.evaluate(() => {
    const scopeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Sliders & Range'));
    if (scopeBtn) scopeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(PROJECT_DIR, "152-desktop-command-palette-filtered-scope.png") });
  copyToArtifacts("152-desktop-command-palette-filtered-scope.png");

  // Close palette with Escape
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // Light theme capture
  console.log("=== CAPTURING 153: SEARCH BUTTON IN LIGHT THEME ===");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const lightBtn = buttons.find(b => b.textContent && b.textContent.includes('Light'));
    if (lightBtn) lightBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "153-desktop-search-button-light.png") });
  copyToArtifacts("153-desktop-search-button-light.png");

  // Restore dark
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const darkBtn = buttons.find(b => b.textContent && b.textContent.includes('Dark'));
    if (darkBtn) darkBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Mobile viewport
  console.log("=== CAPTURING 154: MOBILE TOP SEARCH (390x844) ===");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=search-button", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(PROJECT_DIR, "154-mobile-search-button.png") });
  copyToArtifacts("154-mobile-search-button.png");

  await browser.close();
  console.log("=== SEARCH COMPONENT SCREENSHOTS SUCCESSFULLY CAPTURED ===");
})();
