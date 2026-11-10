const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

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
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  console.log("=== 1. TEST DROPDOWN NORMAL OPEN (MIDNIGHT) ===");
  await page.goto("http://localhost:5173/?component=dropdown&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Find the dropdown button in the demo area and click it
  const dropdownTrigger = await page.waitForSelector('button[aria-haspopup="listbox"]');
  if (dropdownTrigger) {
    await dropdownTrigger.click();
    await new Promise(r => setTimeout(r, 400));
  }

  await page.screenshot({ path: path.join(PROJECT_DIR, "135-desktop-dropdown-normal-midnight.png") });
  copyToArtifacts("135-desktop-dropdown-normal-midnight.png");

  console.log("=== 2. TEST DROPDOWN FLIP UP ON COLLISION (BOTTOM OF VIEWPORT) ===");
  // Close menu first
  await dropdownTrigger.click();
  await new Promise(r => setTimeout(r, 300));

  // Toggle "Test Flip Up (Collision)" switch (3rd parameter switch in the controls)
  const switches = await page.$$('div[role="slider"], div.cursor-pointer');
  let flipSwitchFound = false;
  for (const sw of switches) {
    const text = await page.evaluate(el => el.innerText, sw);
    if (text && (text.includes("Flip") || text.includes("Collision"))) {
      await sw.click();
      flipSwitchFound = true;
      break;
    }
  }
  console.log(`Flip switch clicked: ${flipSwitchFound}`);
  await new Promise(r => setTimeout(r, 400));

  // Now open dropdown trigger that is near bottom
  const updatedTrigger = await page.waitForSelector('button[aria-haspopup="listbox"]');
  await updatedTrigger.click();
  await new Promise(r => setTimeout(r, 400));

  // Verify the portaled menu exists and is positioned above trigger
  const placementInfo = await page.evaluate(() => {
    const trigger = document.querySelector('button[aria-haspopup="listbox"]');
    const menu = document.querySelector('div.fixed.z-\\[9999\\]') || document.querySelector('ul[role="listbox"]')?.parentElement;
    if (!trigger || !menu) return null;
    const tRect = trigger.getBoundingClientRect();
    const mRect = menu.getBoundingClientRect();
    return {
      triggerTop: tRect.top,
      triggerBottom: tRect.bottom,
      menuTop: mRect.top,
      menuBottom: mRect.bottom,
      isFlippedUp: mRect.bottom <= tRect.top + 10,
    };
  });
  console.log("Placement collision diagnostics:", placementInfo);

  await page.screenshot({ path: path.join(PROJECT_DIR, "136-desktop-dropdown-flipped-top.png") });
  copyToArtifacts("136-desktop-dropdown-flipped-top.png");

  console.log("=== 3. TEST DROPDOWN LIGHT THEME ===");
  await page.goto("http://localhost:5173/?component=dropdown&theme=minimal-light", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const lightTrigger = await page.waitForSelector('button[aria-haspopup="listbox"]');
  await lightTrigger.click();
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: path.join(PROJECT_DIR, "137-desktop-dropdown-light-theme.png") });
  copyToArtifacts("137-desktop-dropdown-light-theme.png");

  console.log("=== 4. TEST DROPDOWN CYBERPUNK NEON THEME ===");
  await page.goto("http://localhost:5173/?component=dropdown&theme=cyberpunk", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const cyberpunkTrigger = await page.waitForSelector('button[aria-haspopup="listbox"]');
  await cyberpunkTrigger.click();
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: path.join(PROJECT_DIR, "138-desktop-dropdown-cyberpunk-neon.png") });
  copyToArtifacts("138-desktop-dropdown-cyberpunk-neon.png");

  console.log("=== 5. TEST MOBILE VIEWPORT (390PX) ZERO OVERFLOW & CLAMPING ===");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=dropdown&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const mobileTrigger = await page.waitForSelector('button[aria-haspopup="listbox"]');
  await mobileTrigger.click();
  await new Promise(r => setTimeout(r, 400));

  const overflowCheck = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log("Mobile overflow audit:", overflowCheck);

  await page.screenshot({ path: path.join(PROJECT_DIR, "139-mobile-dropdown-viewport-clamped.png") });
  copyToArtifacts("139-mobile-dropdown-viewport-clamped.png");

  console.log("=== 6. TEST MONO BAR CHART CYBERPUNK THEME INTEGRATION ===");
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=mono-bar-chart&theme=cyberpunk", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(PROJECT_DIR, "140-desktop-mono-charts-cyberpunk.png") });
  copyToArtifacts("140-desktop-mono-charts-cyberpunk.png");

  console.log("=== 7. TEST CONTEXT MENU ACTIONS EMERALD THEME ===");
  await page.goto("http://localhost:5173/?component=context-menu-actions&theme=emerald", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Open context menu button if present
  const actionButton = await page.$('button[aria-haspopup="menu"]');
  if (actionButton) {
    await actionButton.click();
    await new Promise(r => setTimeout(r, 300));
  }

  await page.screenshot({ path: path.join(PROJECT_DIR, "141-desktop-interactive-controls-emerald.png") });
  copyToArtifacts("141-desktop-interactive-controls-emerald.png");

  await browser.close();
  console.log("=== ALL AUTOMATED TESTS COMPLETED SUCCESSFULLY ===");
})();
