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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log("=== 1. VERIFYING POLL RESULTS AT TOP ===");
  await page.goto("http://localhost:5173/?component=poll-results", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(PROJECT_DIR, "179-poll-results-overflow-fixed-top.png") });
  copyToArtifacts("179-poll-results-overflow-fixed-top.png");

  console.log("=== 2. VERIFYING SCROLLED STATE (EXACT USER SCENARIO) ===");
  await page.evaluate(() => {
    const main = document.getElementById("main-scroll-container");
    if (main) main.scrollTop = 350;
  });
  await new Promise(r => setTimeout(r, 600));

  const scrollMetrics = await page.evaluate(() => {
    const aside = document.querySelector("aside");
    const header = document.querySelector("header");
    const main = document.getElementById("main-scroll-container");
    const asideRect = aside?.getBoundingClientRect();
    const headerRect = header?.getBoundingClientRect();
    return {
      windowScrollY: window.scrollY,
      windowScrollX: window.scrollX,
      mainScrollTop: main?.scrollTop,
      asideBoundingTop: asideRect?.top,
      asideHeight: asideRect?.height,
      headerBoundingTop: headerRect?.top,
      headerHeight: headerRect?.height,
      isAsideFixed: asideRect?.top === 0,
      isHeaderSticky: headerRect?.top === 0,
      hasWindowScroll: window.scrollY > 0,
    };
  });
  console.log("Scroll Metrics:", JSON.stringify(scrollMetrics, null, 2));

  await page.screenshot({ path: path.join(PROJECT_DIR, "180-poll-results-overflow-fixed-scrolled.png") });
  copyToArtifacts("180-poll-results-overflow-fixed-scrolled.png");

  console.log("=== 3. VERIFYING MOBILE VIEWPORT (375x812) ===");
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const main = document.getElementById("main-scroll-container");
    if (main) main.scrollTop = 0;
  });
  await new Promise(r => setTimeout(r, 500));

  const mobileMetrics = await page.evaluate(() => {
    return {
      bodyScrollWidth: document.body.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasHorizontalOverflow: document.body.scrollWidth > document.documentElement.clientWidth,
    };
  });
  console.log("Mobile Metrics:", JSON.stringify(mobileMetrics, null, 2));

  await page.screenshot({ path: path.join(PROJECT_DIR, "181-mobile-overflow-fixed.png") });
  copyToArtifacts("181-mobile-overflow-fixed.png");

  await browser.close();
  console.log("=== OVERFLOW SOLUTION VERIFICATION COMPLETE ===");
})();
