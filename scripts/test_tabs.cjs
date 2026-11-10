const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const SCREENSHOT_DIR = path.join(__dirname, "../screenshots/mono-charts");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"]
  });

  const page = await browser.newPage();

  // Mobile Dark View
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:5173/?component=mono-charts&theme=midnight", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.scrollBy(0, 950);
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-dark-clean.png") });

  // Mobile Light View
  await page.goto("http://localhost:5173/?component=mono-charts&theme=minimal-light", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.scrollBy(0, 950);
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-light-clean.png") });

  // Mobile Donut Chart Tab
  const buttons = await page.$$("button");
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes("4. Soft Arc")) {
      await b.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-donut-tab.png") });

  await browser.close();
  console.log("Mobile verification complete!");
})();
