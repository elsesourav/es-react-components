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
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });

  await page.goto("http://localhost:5173/?component=segmented-ab-tabs", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));

  // Find the button with text 'Usage & Code'
  const buttons = await page.$$("button");
  let clicked = false;
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes("Usage & Code")) {
      await b.click();
      clicked = true;
      break;
    }
  }
  console.log("Usage & Code tab clicked:", clicked);
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(PROJECT_DIR, "175-segmented-ab-tabs-code-tab.png") });
  copyToArtifacts("175-segmented-ab-tabs-code-tab.png");

  // Also check Parameter Slider code tab
  await page.goto("http://localhost:5173/?component=parameter-slider", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 600));
  const buttons2 = await page.$$("button");
  for (const b of buttons2) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes("Usage & Code")) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(PROJECT_DIR, "176-parameter-slider-code-tab.png") });
  copyToArtifacts("176-parameter-slider-code-tab.png");

  await browser.close();
  console.log("Done capturing code tabs.");
})();
