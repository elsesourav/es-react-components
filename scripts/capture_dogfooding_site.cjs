const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const scenarios = [
  // ── Overview Showcase Across Themes ──
  { name: "100-desktop-overview-midnight", url: "http://localhost:5173/?component=overview&theme=midnight", w: 1280, h: 900 },
  { name: "101-desktop-overview-light", url: "http://localhost:5173/?component=overview&theme=minimal-light", w: 1280, h: 900 },
  { name: "102-desktop-overview-cyberpunk", url: "http://localhost:5173/?component=overview&theme=cyberpunk", w: 1280, h: 900 },

  // ── Command Palette Spotlight ──
  { name: "103-desktop-command-palette", url: "http://localhost:5173/?component=overview&theme=midnight", w: 1280, h: 900, action: "open_command" },

  // ── Theme Customizer with SliderDetents ──
  { name: "104-desktop-theme-customizer", url: "http://localhost:5173/?component=overview&theme=midnight", w: 1280, h: 900, action: "open_theme_editor" },

  // ── Component Documentation with AICodeBlock ──
  { name: "105-desktop-component-doc-code", url: "http://localhost:5173/?component=filter-grid&theme=midnight", w: 1280, h: 900, action: "switch_to_code_tab" },

  // ── Tablet & Mobile Viewports ──
  { name: "106-tablet-overview-sunset", url: "http://localhost:5173/?component=overview&theme=sunset", w: 768, h: 1024 },
  { name: "107-mobile-overview-emerald", url: "http://localhost:5173/?component=overview&theme=emerald", w: 390, h: 844 },
  { name: "108-mobile-menu-modal", url: "http://localhost:5173/?component=overview&theme=ocean", w: 390, h: 844, action: "open_mobile_menu" },
];

(async () => {
  console.log(`Starting puppeteer screenshot capture of ${scenarios.length} dogfooding showcase scenarios...`);
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

    if (s.action === "open_command") {
      try {
        await page.keyboard.down("Meta");
        await page.keyboard.press("KeyK");
        await page.keyboard.up("Meta");
        await new Promise((r) => setTimeout(r, 700));
      } catch (err) {
        console.warn("Could not trigger CommandPalette:", err.message);
      }
    } else if (s.action === "open_theme_editor") {
      try {
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const themeBtn = buttons.find((b) => b.textContent && b.textContent.includes("Theme Editor"));
          if (themeBtn) themeBtn.click();
        });
        await new Promise((r) => setTimeout(r, 900));
      } catch (err) {
        console.warn("Could not open Theme Customizer:", err.message);
      }
    } else if (s.action === "switch_to_code_tab") {
      try {
        const tabs = await page.$$("button[role='tab']");
        for (const tab of tabs) {
          const text = await page.evaluate((el) => el.textContent, tab);
          if (text && text.includes("Code")) {
            await tab.click();
            await new Promise((r) => setTimeout(r, 600));
            break;
          }
        }
      } catch (err) {
        console.warn("Could not click code tab:", err.message);
      }
    } else if (s.action === "open_mobile_menu") {
      try {
        const menuBtn = await page.$("button.md\\:hidden");
        if (menuBtn) {
          await menuBtn.click();
          await new Promise((r) => setTimeout(r, 700));
        }
      } catch (err) {
        console.warn("Could not open mobile menu:", err.message);
      }
    }

    const projPath = path.join(PROJECT_DIR, `${s.name}.png`);
    const artPath = path.join(ARTIFACT_DIR, `${s.name}.png`);

    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, artPath);
  }

  await browser.close();
  console.log("All 9 dogfooding site screenshots captured and synchronized successfully!");
})();
