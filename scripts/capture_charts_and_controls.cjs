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
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  console.log("=== CAPTURING MONO CHARTS IN CYBERPUNK THEME ===");
  await page.goto("http://localhost:5173/?component=mono-charts&theme=cyberpunk", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "140-desktop-mono-charts-cyberpunk.png") });
  copyToArtifacts("140-desktop-mono-charts-cyberpunk.png");

  console.log("=== CAPTURING INTERACTIVE CONTROLS IN EMERALD THEME ===");
  await page.goto("http://localhost:5173/?component=interactive-controls&theme=emerald", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Open context menu button
  const actionButton = await page.$('button[aria-haspopup="menu"]');
  if (actionButton) {
    await actionButton.click();
    await new Promise(r => setTimeout(r, 400));
  }

  await page.screenshot({ path: path.join(PROJECT_DIR, "141-desktop-interactive-controls-emerald.png") });
  copyToArtifacts("141-desktop-interactive-controls-emerald.png");

  await browser.close();
  console.log("DONE");
})();
