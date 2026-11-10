const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "../screenshots/slider-verification");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Parameter slider showcase page - Midnight / Dark
  await page.goto("http://localhost:5173/?component=parameter-slider&theme=midnight", {
    waitUntil: "networkidle0",
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "01-parameter-slider-midnight.png"),
    fullPage: false,
  });

  // 2. Light mode
  await page.goto("http://localhost:5173/?component=parameter-slider&theme=minimal-light", {
    waitUntil: "networkidle0",
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "02-parameter-slider-light.png"),
    fullPage: false,
  });

  // 3. TextLoop playground with parameter sliders - Midnight
  await page.goto("http://localhost:5173/?component=text-loop&theme=midnight", {
    waitUntil: "networkidle0",
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "03-text-loop-sliders-midnight.png"),
    fullPage: false,
  });

  // 4. SplitFlapText playground - Light
  await page.goto("http://localhost:5173/?component=split-flap-text&theme=minimal-light", {
    waitUntil: "networkidle0",
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "04-split-flap-sliders-light.png"),
    fullPage: false,
  });

  await browser.close();
  console.log("Screenshots captured successfully in", OUTPUT_DIR);
})();
