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
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  await page.goto("http://localhost:5173/?component=dropdown&theme=midnight", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Find the dropdown button
  const trigger = await page.waitForSelector('button[aria-haspopup="listbox"]');

  // Scroll down so that the trigger is near the bottom of the viewport
  // Viewport is 900px height. We want trigger.getBoundingClientRect().bottom to be around 800px.
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-haspopup="listbox"]');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      // Scroll so that rect.bottom is at 780px
      const targetScroll = window.scrollY + rect.bottom - 780;
      window.scrollTo({ top: targetScroll, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 300));

  // Click the trigger to open the dropdown
  await trigger.click();
  await new Promise(r => setTimeout(r, 400));

  const diag = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-haspopup="listbox"]');
    const menu = document.querySelector('div.fixed.z-\\[9999\\]');
    if (!btn || !menu) return null;
    const bRect = btn.getBoundingClientRect();
    const mRect = menu.getBoundingClientRect();
    return {
      windowHeight: window.innerHeight,
      triggerTop: bRect.top,
      triggerBottom: bRect.bottom,
      spaceBelow: window.innerHeight - bRect.bottom - 6 - 12,
      spaceAbove: bRect.top - 6 - 12,
      menuTop: mRect.top,
      menuBottom: mRect.bottom,
      isFlippedUp: mRect.bottom <= bRect.top + 5,
    };
  });
  console.log("Flipped upward collision diagnostics:", diag);

  await page.screenshot({ path: path.join(PROJECT_DIR, "136-desktop-dropdown-flipped-top.png") });
  copyToArtifacts("136-desktop-dropdown-flipped-top.png");

  await browser.close();
})();
