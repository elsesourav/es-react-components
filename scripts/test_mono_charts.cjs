const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const SCREENSHOT_DIR = path.join(__dirname, "../screenshots/mono-charts");
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

(async () => {
  console.log(`Starting detailed puppeteer verification...`);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"]
  });

  const page = await browser.newPage();

  // 1. Desktop Dark Full Charts View
  console.log("1. Desktop Dark Charts View...");
  await page.setViewport({ width: 1280, height: 1200 });
  await page.goto("http://localhost:5173/?component=mono-charts&theme=midnight", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.scrollBy(0, 480);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-dark-charts.png") });

  // 2. Desktop Light Full Charts View
  console.log("2. Desktop Light Charts View...");
  await page.goto("http://localhost:5173/?component=mono-charts&theme=minimal-light", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.scrollBy(0, 480);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-light-charts.png") });

  // 3. Tablet Dark
  console.log("3. Tablet Dark View...");
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto("http://localhost:5173/?component=mono-charts&theme=midnight", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.scrollBy(0, 480);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "tablet-dark-charts.png") });

  // 4. Mobile Dark
  console.log("4. Mobile Dark View...");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:5173/?component=mono-charts&theme=midnight", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.scrollBy(0, 460);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-dark-charts.png") });

  // 5. Mobile Light
  console.log("5. Mobile Light View...");
  await page.goto("http://localhost:5173/?component=mono-charts&theme=minimal-light", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.scrollBy(0, 460);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-light-charts.png") });

  await browser.close();
  console.log("Detailed screenshots captured successfully!");
})();
