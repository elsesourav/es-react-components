const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots/responsive-verify";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/748ea79f-5a89-40eb-b5b4-ea4da65281ff/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  // ── Liquid Glass Sheet ──
  { name: "01-desktop-liquid-glass-light", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=minimal-light", w: 1280, h: 900 },
  { name: "02-desktop-liquid-glass-midnight", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=midnight", w: 1280, h: 900 },
  { name: "03-tablet-liquid-glass-ocean", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=ocean", w: 768, h: 1024 },
  { name: "04-mobile-liquid-glass-sunset", url: "http://localhost:5173/?component=liquid-glass-sheet&theme=sunset", w: 390, h: 844 },

  // ── Card CoverFlow ──
  { name: "05-desktop-card-coverflow-light", url: "http://localhost:5173/?component=card-coverflow&theme=minimal-light", w: 1280, h: 900 },
  { name: "06-desktop-card-coverflow-cyberpunk", url: "http://localhost:5173/?component=card-coverflow&theme=cyberpunk", w: 1280, h: 900 },
  { name: "07-tablet-card-coverflow-ocean", url: "http://localhost:5173/?component=card-coverflow&theme=ocean", w: 768, h: 1024 },
  { name: "08-mobile-card-coverflow-midnight", url: "http://localhost:5173/?component=card-coverflow&theme=midnight", w: 390, h: 844 },

  // ── Card Carousel ──
  { name: "09-desktop-card-carousel-light", url: "http://localhost:5173/?component=card-carousel&theme=minimal-light", w: 1280, h: 900 },
  { name: "10-desktop-card-carousel-midnight", url: "http://localhost:5173/?component=card-carousel&theme=midnight", w: 1280, h: 900 },
  { name: "11-tablet-card-carousel-emerald", url: "http://localhost:5173/?component=card-carousel&theme=emerald", w: 768, h: 1024 },
  { name: "12-mobile-card-carousel-sunset", url: "http://localhost:5173/?component=card-carousel&theme=sunset", w: 390, h: 844 },

  // ── Interactive Micro-Controls ──
  { name: "13-desktop-interactive-controls-light", url: "http://localhost:5173/?component=interactive-controls&theme=minimal-light", w: 1280, h: 900 },
  { name: "14-desktop-interactive-controls-midnight", url: "http://localhost:5173/?component=interactive-controls&theme=midnight", w: 1280, h: 900 },
  { name: "15-tablet-interactive-controls-ocean", url: "http://localhost:5173/?component=interactive-controls&theme=ocean", w: 768, h: 1024 },
  { name: "16-mobile-interactive-controls-light", url: "http://localhost:5173/?component=interactive-controls&theme=minimal-light", w: 390, h: 844 },

  // ── Motion Loaders ──
  { name: "17-desktop-motion-loaders-light", url: "http://localhost:5173/?component=motion-loaders&theme=minimal-light", w: 1280, h: 900 },
  { name: "18-desktop-motion-loaders-cyberpunk", url: "http://localhost:5173/?component=motion-loaders&theme=cyberpunk", w: 1280, h: 900 },
  { name: "19-mobile-motion-loaders-midnight", url: "http://localhost:5173/?component=motion-loaders&theme=midnight", w: 390, h: 844 },

  // ── Markdown Editor & KaTeX Preview ──
  { name: "20-desktop-markdown-editor-light", url: "http://localhost:5173/?component=markdown-editor&theme=minimal-light", w: 1280, h: 900 },
  { name: "21-desktop-markdown-editor-midnight", url: "http://localhost:5173/?component=markdown-editor&theme=midnight", w: 1280, h: 900 },
  { name: "22-tablet-markdown-editor-emerald", url: "http://localhost:5173/?component=markdown-editor&theme=emerald", w: 768, h: 1024 },
  { name: "23-mobile-markdown-editor-light", url: "http://localhost:5173/?component=markdown-editor&theme=minimal-light", w: 390, h: 844 },
];

(async () => {
  console.log(`Starting responsive & theme verification for ${scenarios.length} scenarios...`);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"]
  });

  const page = await browser.newPage();

  for (let i = 0; i < scenarios.length; i++) {
    const s = scenarios[i];
    console.log(`[${i + 1}/${scenarios.length}] Capturing ${s.name} (${s.w}x${s.h})...`);
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto(s.url, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));

    // Scroll slightly down to focus on playground area
    await page.evaluate(() => {
      const playground = document.querySelector('[role="main"], main, .space-y-8, .space-y-6');
      if (playground) playground.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 300));

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath, fullPage: false });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All scenarios successfully captured and saved.");
})();
