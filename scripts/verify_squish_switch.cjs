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

  // 1. DESKTOP MIDNIGHT (DARK)
  console.log("=== 1. SQUISH SWITCH - MIDNIGHT (ON) ===");
  await page.goto("http://localhost:5173/?component=squish-switch&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-midnight-on.png") });
  copyToArtifacts("squish-switch-midnight-on.png");

  // Toggle switch to OFF
  console.log("=== 2. SQUISH SWITCH - MIDNIGHT (OFF) ===");
  const mainSwitch = await page.$('button[role="switch"]');
  if (mainSwitch) {
    await mainSwitch.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-midnight-off.png") });
    copyToArtifacts("squish-switch-midnight-off.png");

    // Click back to ON
    await mainSwitch.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // 3. DESKTOP LIGHT (MINIMAL LIGHT)
  console.log("=== 3. SQUISH SWITCH - LIGHT (ON) ===");
  await page.goto("http://localhost:5173/?component=squish-switch&theme=minimal-light", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-light-on.png") });
  copyToArtifacts("squish-switch-light-on.png");

  // Toggle switch in Light mode to OFF
  console.log("=== 4. SQUISH SWITCH - LIGHT (OFF) ===");
  const mainSwitchLight = await page.$('button[role="switch"]');
  if (mainSwitchLight) {
    await mainSwitchLight.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-light-off.png") });
    copyToArtifacts("squish-switch-light-off.png");
  }

  // 5. TEST COLOR VARIANTS (e.g. Success / Warning / Danger)
  console.log("=== 5. SQUISH SWITCH - VARIANTS & SIZES ===");
  await page.goto("http://localhost:5173/?component=squish-switch&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Click 'Large' size button
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.trim() === "Large") {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-large-size.png") });
  copyToArtifacts("squish-switch-large-size.png");

  // 6. MOBILE RESPONSIVE VIEW (390x844)
  console.log("=== 6. SQUISH SWITCH - MOBILE VIEW ===");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=squish-switch&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-mobile-midnight.png") });
  copyToArtifacts("squish-switch-mobile-midnight.png");

  // Scroll down to showcase card on mobile
  await page.evaluate(() => window.scrollBy(0, 360));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-mobile-midnight-demo.png") });
  copyToArtifacts("squish-switch-mobile-midnight-demo.png");

  await page.goto("http://localhost:5173/?component=squish-switch&theme=minimal-light", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => window.scrollBy(0, 360));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(PROJECT_DIR, "squish-switch-mobile-light-demo.png") });
  copyToArtifacts("squish-switch-mobile-light-demo.png");

  await browser.close();
  console.log("All SquishSwitch screenshots captured successfully!");
})();
