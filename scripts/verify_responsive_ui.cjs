const puppeteer = require("puppeteer");
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const SCREENSHOT_DIR = path.join(__dirname, "../screenshots/responsive-perfect");
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

(async () => {
  console.log("Building project with Vite...");
  execSync("pnpm run build", { stdio: "inherit" });

  console.log("Starting preview server on port 4185...");
  const server = spawn("pnpm", ["exec", "vite", "preview", "--port", "4185"], { stdio: "inherit" });
  await new Promise((r) => setTimeout(r, 2000));

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  const captures = [
    // ── Desktop (1440 x 900) ──
    { name: "01-desktop-docview-midnight", url: "http://localhost:4185/?component=text-loop&theme=midnight", w: 1440, h: 900 },
    { name: "02-desktop-docview-light", url: "http://localhost:4185/?component=text-loop&theme=minimal-light", w: 1440, h: 900 },
    { name: "03-desktop-overview-midnight", url: "http://localhost:4185/?theme=midnight", w: 1440, h: 900 },
    { name: "04-desktop-overview-light", url: "http://localhost:4185/?theme=minimal-light", w: 1440, h: 900 },
    { name: "05-desktop-footer-midnight", url: "http://localhost:4185/?theme=midnight", w: 1440, h: 900, scrollBottom: true },

    // ── Tablet (768 x 1024) ──
    { name: "06-tablet-docview-midnight", url: "http://localhost:4185/?component=text-loop&theme=midnight", w: 768, h: 1024 },
    { name: "07-tablet-docview-light", url: "http://localhost:4185/?component=text-loop&theme=minimal-light", w: 768, h: 1024 },
    { name: "08-tablet-overview-midnight", url: "http://localhost:4185/?theme=midnight", w: 768, h: 1024 },
    { name: "09-tablet-footer-light", url: "http://localhost:4185/?theme=minimal-light", w: 768, h: 1024, scrollBottom: true },

    // ── Mobile (390 x 844) ──
    { name: "10-mobile-docview-midnight", url: "http://localhost:4185/?component=text-loop&theme=midnight", w: 390, h: 844 },
    { name: "11-mobile-docview-light", url: "http://localhost:4185/?component=text-loop&theme=minimal-light", w: 390, h: 844 },
    { name: "12-mobile-overview-midnight", url: "http://localhost:4185/?theme=midnight", w: 390, h: 844 },
    { name: "13-mobile-footer-midnight", url: "http://localhost:4185/?theme=midnight", w: 390, h: 844, scrollBottom: true },
  ];

  for (const c of captures) {
    console.log(`Capturing [${c.name}] (${c.w}x${c.h})...`);
    await page.setViewport({ width: c.w, height: c.h });
    await page.goto(c.url, { waitUntil: "networkidle0" });
    if (c.scrollBottom) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
    await new Promise((r) => setTimeout(r, 600));

    const filePath = path.join(SCREENSHOT_DIR, `${c.name}.png`);
    await page.screenshot({ path: filePath });
  }

  await browser.close();
  server.kill("SIGTERM");
  console.log("All 13 responsive screenshots captured successfully!");
})();
