const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"]
  });

  const page = await browser.newPage();

  // Desktop 1280x900 Overview
  console.log("Capturing 122-desktop-new-categories-overview.png...");
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "122-desktop-new-categories-overview.png"), fullPage: false });
  fs.copyFileSync(path.join(PROJECT_DIR, "122-desktop-new-categories-overview.png"), path.join(ARTIFACT_DIR, "122-desktop-new-categories-overview.png"));

  // Mobile 390x844 Overview
  console.log("Capturing 123-mobile-zero-overflow-homepage.png...");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  const overflowReport = await page.evaluate(() => {
    return {
      dw: document.documentElement.clientWidth,
      sw: document.documentElement.scrollWidth,
      diff: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bodyOverflow: window.getComputedStyle(document.body).overflowX
    };
  });
  console.log("Mobile zero-overflow audit:", overflowReport);

  await page.screenshot({ path: path.join(PROJECT_DIR, "123-mobile-zero-overflow-homepage.png"), fullPage: false });
  fs.copyFileSync(path.join(PROJECT_DIR, "123-mobile-zero-overflow-homepage.png"), path.join(ARTIFACT_DIR, "123-mobile-zero-overflow-homepage.png"));

  // Mobile 390x844 Drawer / Tree Navigation
  console.log("Capturing 124-mobile-drawer-categories.png...");
  await page.evaluate(() => {
    const hamburger = document.querySelector('button[aria-label="Open navigation menu"]');
    if (hamburger) hamburger.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "124-mobile-drawer-categories.png"), fullPage: false });
  fs.copyFileSync(path.join(PROJECT_DIR, "124-mobile-drawer-categories.png"), path.join(ARTIFACT_DIR, "124-mobile-drawer-categories.png"));

  await browser.close();
  console.log("Category and zero-overflow verification complete!");
})();
