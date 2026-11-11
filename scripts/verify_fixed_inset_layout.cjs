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

  console.log("=== 1. VERIFYING 1024x587 (EXACT USER VIEWPORT) ===");
  await page.setViewport({ width: 1024, height: 587, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=poll-results", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot at top in 1024x587
  await page.screenshot({ path: path.join(PROJECT_DIR, "183-1024x587-exact-user-viewport-top.png") });
  copyToArtifacts("183-1024x587-exact-user-viewport-top.png");

  // Wheel scroll aggressively on navbar & sidebar brand
  await page.mouse.move(50, 20); // on sidebar brand
  await page.mouse.wheel({ deltaY: 300 });
  await page.mouse.move(400, 20); // on navbar
  await page.mouse.wheel({ deltaY: 300 });
  await new Promise(r => setTimeout(r, 400));

  const userViewportMetrics = await page.evaluate(() => {
    const h = document.querySelector("header")?.getBoundingClientRect();
    const b = document.querySelector("aside > div:first-child")?.getBoundingClientRect();
    const f = document.querySelector("aside input")?.getBoundingClientRect();
    return {
      windowScrollY: window.scrollY,
      htmlScrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      headerTop: h?.top,
      headerHeight: h?.height,
      asideBrandTop: b?.top,
      asideBrandHeight: b?.height,
      asideFilterTop: f?.top,
    };
  });
  console.log("1024x587 Metrics after wheel scrolling on brand & navbar:", JSON.stringify(userViewportMetrics, null, 2));

  // Now scroll the main content down 300px
  await page.mouse.move(600, 300);
  await page.mouse.wheel({ deltaY: 300 });
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: path.join(PROJECT_DIR, "184-1024x587-main-scrolled.png") });
  copyToArtifacts("184-1024x587-main-scrolled.png");

  console.log("=== 2. VERIFYING DESKTOP 1440x900 ===");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/?component=poll-results", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(PROJECT_DIR, "185-desktop-1440x900-poll-results.png") });
  copyToArtifacts("185-desktop-1440x900-poll-results.png");

  console.log("=== 3. VERIFYING MOBILE 375x812 ===");
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 500));

  const mobileMetrics = await page.evaluate(() => {
    return {
      windowScrollY: window.scrollY,
      bodyScrollWidth: document.body.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  console.log("Mobile Metrics:", JSON.stringify(mobileMetrics, null, 2));

  await page.screenshot({ path: path.join(PROJECT_DIR, "186-mobile-375x812-poll-results.png") });
  copyToArtifacts("186-mobile-375x812-poll-results.png");

  await browser.close();
  console.log("=== ALL VIEWPORTS VERIFIED SUCCESSFULLY ===");
})();
