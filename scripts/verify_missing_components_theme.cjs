const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

function copyToArtifacts(filename) {
  const src = path.join(PROJECT_DIR, filename);
  const dest = path.join(ARTIFACT_DIR, filename);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
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

  console.log("--- CAPTURING INLINE VALIDATION INPUT (DARK) ---");
  await page.goto("http://localhost:5173/?component=inline-validation", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "130-desktop-inline-validation-dark.png") });
  copyToArtifacts("130-desktop-inline-validation-dark.png");

  console.log("--- CAPTURING INLINE VALIDATION INPUT (LIGHT) ---");
  await page.evaluate(() => {
    const select = document.querySelector("header select");
    if (select) {
      select.value = "minimal-light";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "131-desktop-inline-validation-light.png") });
  copyToArtifacts("131-desktop-inline-validation-light.png");

  console.log("--- CAPTURING MARKDOWN & LATEX RENDERER (LIGHT) ---");
  await page.goto("http://localhost:5173/?component=markdown-renderer", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "132-desktop-markdown-renderer-light.png") });
  copyToArtifacts("132-desktop-markdown-renderer-light.png");

  console.log("--- CAPTURING MARKDOWN & LATEX RENDERER (CYBERPUNK NEON) ---");
  await page.evaluate(() => {
    const select = document.querySelector("header select");
    if (select) {
      select.value = "cyberpunk";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "133-desktop-markdown-renderer-cyberpunk.png") });
  copyToArtifacts("133-desktop-markdown-renderer-cyberpunk.png");

  console.log("--- CAPTURING AI APPROVAL CARD THEME AUTO-SYNC (MIDNIGHT) ---");
  await page.goto("http://localhost:5173/?component=ai-approval-card", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const select = document.querySelector("header select");
    if (select) {
      select.value = "midnight";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "134-desktop-ai-approval-midnight.png") });
  copyToArtifacts("134-desktop-ai-approval-midnight.png");

  await browser.close();
  console.log("All screenshots captured and copied successfully!");
})();
