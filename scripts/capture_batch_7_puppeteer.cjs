const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  // ── Text Reveal ──
  { name: "88-desktop-midnight-text-reveal", url: "http://localhost:5173/?component=text-reveal&theme=midnight", w: 1280, h: 850 },
  { name: "89-tablet-cyberpunk-text-reveal", url: "http://localhost:5173/?component=text-reveal&theme=cyberpunk", w: 768, h: 1024 },
  { name: "90-mobile-light-text-reveal", url: "http://localhost:5173/?component=text-reveal&theme=minimal-light", w: 390, h: 844 },

  // ── Logo Marquee ──
  { name: "91-desktop-ocean-logo-marquee", url: "http://localhost:5173/?component=logo-marquee&theme=ocean", w: 1280, h: 850 },
  { name: "92-tablet-sunset-logo-marquee", url: "http://localhost:5173/?component=logo-marquee&theme=sunset", w: 768, h: 1024 },
  { name: "93-mobile-emerald-logo-marquee", url: "http://localhost:5173/?component=logo-marquee&theme=emerald", w: 390, h: 844 },

  // ── Blur-Up Image ──
  { name: "94-desktop-light-blur-up-image", url: "http://localhost:5173/?component=blur-up-image&theme=minimal-light", w: 1280, h: 850 },
  { name: "95-tablet-midnight-blur-up-image", url: "http://localhost:5173/?component=blur-up-image&theme=midnight", w: 768, h: 1024 },
  { name: "96-mobile-cyberpunk-blur-up-image", url: "http://localhost:5173/?component=blur-up-image&theme=cyberpunk", w: 390, h: 844 },

  // ── Show More ──
  { name: "97-desktop-sunset-show-more", url: "http://localhost:5173/?component=show-more&theme=sunset", w: 1280, h: 850, action: "expand_show_more" },
  { name: "98-tablet-emerald-show-more", url: "http://localhost:5173/?component=show-more&theme=emerald", w: 768, h: 1024 },
  { name: "99-mobile-ocean-show-more", url: "http://localhost:5173/?component=show-more&theme=ocean", w: 390, h: 844 },
];

(async () => {
  console.log(`Starting puppeteer screenshot capture of ${scenarios.length} scenarios for Batch 7...`);
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

    if (s.action === "expand_show_more") {
      try {
        const toggleBtn = await page.$("button[aria-expanded]");
        if (toggleBtn) {
          await toggleBtn.click();
          await new Promise((r) => setTimeout(r, 600));
        }
      } catch (err) {
        console.warn("Could not toggle show more:", err.message);
      }
    }

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All 12 Batch 7 screenshots captured and synchronized successfully!");
})();
