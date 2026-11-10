const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots/perfect-ui";
const ARTIFACT_DIR = "/Users/sourav/.gemini/antigravity/brain/748ea79f-5a89-40eb-b5b4-ea4da65281ff/screenshots";

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

async function saveScreen(page, name) {
  const pPath = path.join(PROJECT_DIR, `${name}.png`);
  const aPath = path.join(ARTIFACT_DIR, `${name}.png`);
  await page.screenshot({ path: pPath });
  await page.screenshot({ path: aPath });
  console.log(`Saved screenshot: ${name}.png`);
}

(async () => {
  console.log("Launching headless Chrome for Search & Sidebar verification...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Test 1: Desktop Initial Load (Default Unexpanded Tree)
  console.log("\n--- Test 1: Desktop Initial Load (Default Unexpanded Tree) ---");
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://localhost:5173/?component=card-coverflow&theme=cyberpunk", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));
  await saveScreen(page, "24-desktop-sidebar-default-unexpanded");

  // Test 2: Click "Expand" in Sidebar to expand all and verify internal scroll
  console.log("\n--- Test 2: Click 'Expand' button in Sidebar ---");
  const expandBtn = await page.$('button[aria-label="Expand all categories"], button[title="Expand all categories"]');
  if (expandBtn) {
    await expandBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    console.log("Clicked Expand button!");
    await saveScreen(page, "25-desktop-sidebar-expanded-scroll");

    // Scroll internal tree container
    await page.evaluate(() => {
      const scrollable = document.querySelector('aside .overflow-y-auto');
      if (scrollable) scrollable.scrollTop = 250;
    });
    await new Promise((r) => setTimeout(r, 300));
    await saveScreen(page, "26-desktop-sidebar-internal-scrolled");

    // Click "Collapse" button
    const collapseBtn = await page.$('button[aria-label="Collapse all categories"], button[title="Collapse all categories"]');
    if (collapseBtn) {
      await collapseBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      console.log("Clicked Collapse button!");
      await saveScreen(page, "27-desktop-sidebar-collapsed-again");
    }
  } else {
    console.warn("Expand button not found!");
  }

  // Test 3: Search Component via Cmd+K
  console.log("\n--- Test 3: Cmd+K Search Open and Typing ---");
  // Press Meta+K
  await page.keyboard.down("Meta");
  await page.keyboard.press("k");
  await page.keyboard.up("Meta");
  await new Promise((r) => setTimeout(r, 400));

  // Check if input is focused
  const isInputFocused = await page.evaluate(() => {
    const active = document.activeElement;
    return active && active.tagName === "INPUT" && active.getAttribute("role") === "combobox";
  });
  console.log(`Is search input focused on Cmd+K? -> ${isInputFocused}`);

  // Take screenshot of empty search modal with focus
  await saveScreen(page, "28-search-modal-opened-focused");

  // Type "coverflow" into search input
  console.log("Typing 'coverflow' into search input...");
  await page.keyboard.type("coverflow", { delay: 50 });
  await new Promise((r) => setTimeout(r, 400));

  // Verify input value and modal still open
  const searchStatus = await page.evaluate(() => {
    const input = document.querySelector('input[role="combobox"]');
    const options = document.querySelectorAll('li[role="option"]');
    return {
      isOpen: Boolean(input),
      inputValue: input ? input.value : null,
      optionsCount: options.length,
      firstOptionText: options[0] ? options[0].textContent.trim() : null,
    };
  });
  console.log("Search status after typing:", JSON.stringify(searchStatus, null, 2));

  await saveScreen(page, "29-search-typed-coverflow-results");

  // Test ArrowDown navigation
  console.log("Navigating with ArrowDown...");
  await page.keyboard.press("ArrowDown");
  await new Promise((r) => setTimeout(r, 200));

  // Test clearing search with the (X) clear button
  console.log("Clicking clear search button...");
  const clearBtn = await page.$('button[aria-label="Clear search"]');
  if (clearBtn) {
    await clearBtn.click();
    await new Promise((r) => setTimeout(r, 200));
  }

  // Type "liquid"
  console.log("Typing 'liquid'...");
  await page.keyboard.type("liquid", { delay: 50 });
  await new Promise((r) => setTimeout(r, 300));
  await saveScreen(page, "30-search-typed-liquid-results");

  // Press Enter to select
  console.log("Pressing Enter to select Liquid Glass Sheet...");
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 500));
  await saveScreen(page, "31-desktop-after-search-select-liquid");

  // Test 4: Mobile search & drawer
  console.log("\n--- Test 4: Mobile Viewport ---");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:5173/?theme=minimal-light", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));
  await saveScreen(page, "32-mobile-light-overview");

  // Click mobile search button in navbar
  console.log("Clicking mobile search button in navbar...");
  await page.evaluate(() => {
    const btn = document.querySelector('header button.md\\:hidden[aria-label="Search components"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.keyboard.type("slider", { delay: 50 });
  await new Promise((r) => setTimeout(r, 300));
  await saveScreen(page, "33-mobile-search-typed-slider");
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 400));

  // Click mobile drawer hamburger
  console.log("Opening mobile drawer...");
  await page.evaluate(() => {
    const btn = document.querySelector('header button[aria-label="Open navigation menu"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await saveScreen(page, "34-mobile-drawer-unexpanded");

  // Click Expand All in drawer
  const expandAllMobile = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const found = btns.find((b) => b.textContent && b.textContent.includes('Expand All'));
    if (found) {
      found.click();
      return true;
    }
    return false;
  });
  if (expandAllMobile) {
    await new Promise((r) => setTimeout(r, 400));
    await saveScreen(page, "35-mobile-drawer-expanded");
  }

  await browser.close();
  console.log("\nVerification test suite completed successfully!");
})();
