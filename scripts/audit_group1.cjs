const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const OUT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots/components-audit";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/748ea79f-5a89-40eb-b5b4-ea4da65281ff/screenshots/audit";

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const group1 = [
  "reorder-list",
  "filter-grid",
  "mono-charts",
  "show-more",
  "blur-up-image",
  "logo-marquee",
  "load-more",
  "motion-loaders",
  "interactive-controls",
  "card-coverflow",
  "card-carousel",
  "liquid-glass-sheet",
];

async function saveScreen(page, name) {
  const pPath = path.join(OUT_DIR, `${name}.png`);
  const aPath = path.join(ARTIFACT_DIR, `${name}.png`);
  await page.screenshot({ path: pPath, fullPage: false });
  await page.screenshot({ path: aPath, fullPage: false });
  console.log(`Saved screenshot: ${name}.png`);
}

(async () => {
  console.log(`Starting Group 1 Audit (${group1.length} components)...`);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });

  for (const compId of group1) {
    console.log(`\nTesting component: ${compId}...`);

    // 1. Dark Theme (Midnight)
    const urlDark = `http://localhost:5173/?component=${compId}&theme=midnight`;
    await page.goto(urlDark, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));

    // Verify component rendered in DOM
    const existsDark = await page.evaluate(() => {
      const main = document.querySelector("main");
      return Boolean(main && main.children.length > 0);
    });
    console.log(`  [Dark] Rendered: ${existsDark}`);
    await saveScreen(page, `${compId}-dark`);

    // 2. Light Theme (Minimal Light)
    const urlLight = `http://localhost:5173/?component=${compId}&theme=minimal-light`;
    await page.goto(urlLight, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));

    const existsLight = await page.evaluate(() => {
      const main = document.querySelector("main");
      return Boolean(main && main.children.length > 0);
    });
    console.log(`  [Light] Rendered: ${existsLight}`);
    await saveScreen(page, `${compId}-light`);
  }

  await browser.close();
  console.log("\nGroup 1 Audit complete!");
  if (errors.length > 0) {
    console.log("Logged errors:", errors);
  } else {
    console.log("No console errors detected!");
  }
})();
