const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Test home page overview
  await page.goto("http://localhost:5173/?theme=midnight", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(__dirname, "../screenshots/verify-top-clean.png"),
    fullPage: false,
  });

  // Test issue-board with custom checkbox and select
  await page.goto("http://localhost:5173/?component=issue-board&theme=midnight", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(__dirname, "../screenshots/verify-issue-board.png"),
    fullPage: false,
  });

  await browser.close();
  console.log("Screenshots captured successfully!");
})();
