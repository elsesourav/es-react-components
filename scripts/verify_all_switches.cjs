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

async function clickButtonWithText(page, text) {
  const buttons = await page.$$("button");
  for (const btn of buttons) {
    const t = await page.evaluate(el => el.textContent, btn);
    if (t && t.trim().includes(text)) {
      await btn.click();
      return true;
    }
  }
  return false;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950, deviceScaleFactor: 2 });

  // 1. DESKTOP MIDNIGHT (DARK) - PILL (ROUND) ON
  console.log("=== 1. MIDNIGHT (ON) - PILL ===");
  await page.goto("http://localhost:5173/?component=squish-switch&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Scroll switches showcase card into view
  await page.evaluate(() => {
    const el = document.getElementById("main-kinetic-switch");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-midnight-on.png") });
  copyToArtifacts("squish-switch-midnight-on.png");

  // Toggle main switch to OFF
  console.log("=== 2. MIDNIGHT (OFF) - PILL ===");
  const mainSwitch = await page.$("#main-kinetic-switch");
  if (mainSwitch) {
    await mainSwitch.click();
    await new Promise(r => setTimeout(r, 450));
    await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-midnight-off.png") });
    copyToArtifacts("squish-switch-midnight-off.png");

    // Toggle back to ON
    await mainSwitch.click();
    await new Promise(r => setTimeout(r, 350));
  }

  // 3. SHAPE VARIANT: RECTANGLE (TACTILE)
  console.log("=== 3. MIDNIGHT - RECTANGLE SHAPE ===");
  await clickButtonWithText(page, "Rectangle (Tactile)");
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const el = document.getElementById("main-kinetic-switch");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-rectangle-on.png") });
  copyToArtifacts("squish-switch-rectangle-on.png");

  if (mainSwitch) {
    await mainSwitch.click();
    await new Promise(r => setTimeout(r, 450));
    await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-rectangle-off.png") });
    copyToArtifacts("squish-switch-rectangle-off.png");

    // Toggle back ON
    await mainSwitch.click();
    await new Promise(r => setTimeout(r, 350));
  }

  // 4. SHAPE VARIANT: ROUNDED (SQUIRCLE)
  console.log("=== 4. MIDNIGHT - ROUNDED SQUIRCLE SHAPE ===");
  await clickButtonWithText(page, "Rounded (Squircle)");
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const el = document.getElementById("main-kinetic-switch");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-rounded-on.png") });
  copyToArtifacts("squish-switch-rounded-on.png");

  // 5. LIGHT THEME (MINIMAL LIGHT)
  console.log("=== 5. MINIMAL LIGHT - RECTANGLE & PILL ===");
  await page.goto("http://localhost:5173/?component=squish-switch&theme=minimal-light", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    const el = document.getElementById("main-kinetic-switch");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-light-on.png") });
  copyToArtifacts("squish-switch-light-on.png");

  // Toggle Rectangle in Light theme
  await clickButtonWithText(page, "Rectangle (Tactile)");
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const el = document.getElementById("main-kinetic-switch");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-light-rectangle.png") });
  copyToArtifacts("squish-switch-light-rectangle.png");

  // 6. MOBILE RESPONSIVE VIEW (390x844)
  console.log("=== 6. MOBILE VIEW ===");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=squish-switch&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    const el = document.getElementById("main-kinetic-switch");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-mobile-midnight-demo.png") });
  copyToArtifacts("squish-switch-mobile-midnight-demo.png");

  // Switch to Rectangle on Mobile
  await clickButtonWithText(page, "Rectangle (Tactile)");
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const el = document.getElementById("main-kinetic-switch");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-mobile-rectangle.png") });
  copyToArtifacts("squish-switch-mobile-rectangle.png");

  // Mobile Light
  await page.goto("http://localhost:5173/?component=squish-switch&theme=minimal-light", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    const el = document.getElementById("main-kinetic-switch");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-mobile-light-demo.png") });
  copyToArtifacts("squish-switch-mobile-light-demo.png");

  await browser.close();
  console.log("All switch shape and centering screenshots captured successfully!");
})();
