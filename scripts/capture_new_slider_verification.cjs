const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "../screenshots/new-slider-verified");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const scenarios = [
  // Desktop - 1280px
  { name: "01-desktop-parameter-slider-midnight", url: "http://localhost:5173/?component=parameter-slider&theme=midnight", w: 1280, h: 900 },
  { name: "02-desktop-parameter-slider-light", url: "http://localhost:5173/?component=parameter-slider&theme=minimal-light", w: 1280, h: 900 },
  { name: "03-desktop-text-loop-midnight", url: "http://localhost:5173/?component=text-loop&theme=midnight", w: 1280, h: 900 },
  { name: "04-desktop-split-flap-light", url: "http://localhost:5173/?component=split-flap-text&theme=minimal-light", w: 1280, h: 900 },
  { name: "05-desktop-peek-rating-midnight", url: "http://localhost:5173/?component=peek-rating&theme=midnight", w: 1280, h: 900 },
  // Tablet - 768px
  { name: "06-tablet-parameter-slider-midnight", url: "http://localhost:5173/?component=parameter-slider&theme=midnight", w: 768, h: 1024 },
  { name: "07-tablet-text-loop-light", url: "http://localhost:5173/?component=text-loop&theme=minimal-light", w: 768, h: 1024 },
  // Mobile - 390px
  { name: "08-mobile-parameter-slider-midnight", url: "http://localhost:5173/?component=parameter-slider&theme=midnight", w: 390, h: 844 },
  { name: "09-mobile-text-loop-midnight", url: "http://localhost:5173/?component=text-loop&theme=midnight", w: 390, h: 844 },
];

(async () => {
  console.log(`Starting capture of ${scenarios.length} scenarios...`);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const s of scenarios) {
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto(s.url, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));

    const outPath = path.join(OUTPUT_DIR, `${s.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Captured ${s.name}`);
  }

  await browser.close();
  console.log("All screenshots captured in", OUTPUT_DIR);
})();
