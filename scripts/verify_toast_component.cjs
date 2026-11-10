const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
  const outDir = path.join(__dirname, "../screenshots/toast-verification");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Desktop 1280x850 Midnight Theme
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto("http://localhost:5173/?component=toast&theme=midnight", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(outDir, "01-toast-desktop-inline-midnight.png"),
    fullPage: false,
  });

  // Click "Success Toast" and "Danger Toast" to trigger floating toasts
  const buttons = await page.$$("button");
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes("Success Toast")) {
      await btn.click();
    }
  }
  await new Promise((r) => setTimeout(r, 400));

  await page.screenshot({
    path: path.join(outDir, "02-toast-desktop-floating-midnight.png"),
    fullPage: false,
  });

  // Mobile viewport (iPhone 14 style: 390x844)
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:5173/?component=toast&theme=midnight", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(outDir, "03-toast-mobile-midnight.png"),
    fullPage: false,
  });

  // Light theme desktop
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto("http://localhost:5173/?component=toast&theme=minimal-light", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(outDir, "04-toast-desktop-light.png"),
    fullPage: false,
  });

  await browser.close();
  console.log("All toast verification screenshots captured successfully!");
})();
