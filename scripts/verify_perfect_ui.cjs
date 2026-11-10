const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots/perfect-ui";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/748ea79f-5a89-40eb-b5b4-ea4da65281ff/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const captureList = [
  // Desktop Tests
  { id: "01-desktop-overview-midnight", url: "http://localhost:5173/?theme=midnight", w: 1280, h: 900 },
  { id: "02-desktop-overview-light", url: "http://localhost:5173/?theme=minimal-light", w: 1280, h: 900 },
  { id: "03-desktop-tree-expanded-midnight", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=midnight", w: 1280, h: 900 },
  { id: "04-desktop-liquid-glass-light", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=minimal-light", w: 1280, h: 900 },
  { id: "05-desktop-motion-loaders-cyberpunk", url: "http://localhost:5173/?component=motion-loaders&theme=cyberpunk", w: 1280, h: 900 },
  { id: "06-desktop-interactive-controls-light", url: "http://localhost:5173/?component=interactive-controls&theme=minimal-light", w: 1280, h: 900 },
  { id: "07-desktop-markdown-editor-midnight", url: "http://localhost:5173/?component=markdown-editor&theme=midnight", w: 1280, h: 900 },

  // Tablet Tests
  { id: "08-tablet-liquid-glass-ocean", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=ocean", w: 768, h: 1024 },
  { id: "09-tablet-card-coverflow-emerald", url: "http://localhost:5173/?component=card-coverflow&theme=emerald", w: 768, h: 1024 },
  { id: "10-tablet-interactive-controls-light", url: "http://localhost:5173/?component=interactive-controls&theme=minimal-light", w: 768, h: 1024 },
  { id: "11-tablet-markdown-editor-midnight", url: "http://localhost:5173/?component=markdown-editor&theme=midnight", w: 768, h: 1024 },

  // Mobile Tests
  { id: "12-mobile-navbar-and-header-light", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=minimal-light", w: 390, h: 844 },
  { id: "13-mobile-liquid-glass-sheet", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=sunset", w: 390, h: 844, scrollY: 180 },
  { id: "14-mobile-motion-loaders", url: "http://localhost:5173/?component=motion-loaders&theme=midnight", w: 390, h: 844, scrollY: 180 },
  { id: "15-mobile-interactive-controls", url: "http://localhost:5173/?component=interactive-controls&theme=minimal-light", w: 390, h: 844, scrollY: 180 },
  { id: "16-mobile-markdown-editor", url: "http://localhost:5173/?component=markdown-editor&theme=minimal-light", w: 390, h: 844, scrollY: 180 },
];

(async () => {
  console.log("Starting comprehensive visual perfection test suite...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
  });

  const page = await browser.newPage();

  for (let i = 0; i < captureList.length; i++) {
    const item = captureList[i];
    console.log(`[${i + 1}/${captureList.length}] Capturing ${item.id} (${item.w}x${item.h})...`);
    await page.setViewport({ width: item.w, height: item.h });
    await page.goto(item.url, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));

    if (item.scrollY) {
      await page.evaluate((y) => window.scrollBy(0, y), item.scrollY);
      await new Promise((r) => setTimeout(r, 300));
    }

    const projPath = path.join(PROJECT_DIR, `${item.id}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${item.id}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  // Special scenario: Mobile TreeView Drawer Open
  console.log("Capturing Mobile Navigation Drawer with TreeView...");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:5173/?theme=minimal-light", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));

  // Click hamburger button to open drawer
  await page.evaluate(() => {
    const hamburger = document.querySelector('header button');
    if (hamburger) (hamburger).click();
  });
  await new Promise((r) => setTimeout(r, 600));

  const drawerProj = path.join(PROJECT_DIR, "17-mobile-tree-drawer-open.png");
  const drawerArt = path.join(ARTIFACT_DIR, "17-mobile-tree-drawer-open.png");
  await page.screenshot({ path: drawerProj });
  fs.copyFileSync(drawerProj, drawerArt);

  await browser.close();
  console.log("Verification suite complete!");
})();
