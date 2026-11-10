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

  console.log("=== NAVIGATING TO LIVE GITHUB PAGES SITE ===");
  await page.goto("https://elsesourav.github.io/es-react-components/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1000));

  const pageTitle = await page.title();
  console.log("Live Page Title:", pageTitle);

  await page.screenshot({ path: path.join(PROJECT_DIR, "142-live-github-pages-hosted.png") });
  copyToArtifacts("142-live-github-pages-hosted.png");

  await browser.close();
  console.log("=== LIVE GITHUB PAGES VERIFICATION COMPLETE ===");
})();
