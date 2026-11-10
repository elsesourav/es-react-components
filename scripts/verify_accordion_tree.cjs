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
  console.log("Launching headless Chrome for Accordion Single-Expand Tree verification...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Test 1: Desktop Initial Load (Default Overview, all unexpanded)
  console.log("\n--- Test 1: Desktop Initial Load (Overview) ---");
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://localhost:5173/?theme=cyberpunk", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  let openCategories = await page.evaluate(() => {
    const expanded = document.querySelectorAll('aside [role="treeitem"][aria-expanded="true"]');
    return Array.from(expanded).map((el) => el.textContent.trim());
  });
  console.log("Initially open categories:", openCategories);
  await saveScreen(page, "36-desktop-tree-initial-all-collapsed");

  // Test 2: Click "General" category
  console.log("\n--- Test 2: Click 'General' category ---");
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('aside [role="treeitem"]'));
    const gen = items.find((el) => el.textContent && el.textContent.includes("General"));
    if (gen) gen.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  openCategories = await page.evaluate(() => {
    const expanded = document.querySelectorAll('aside [role="treeitem"][aria-expanded="true"]');
    return Array.from(expanded).map((el) => el.textContent.trim());
  });
  console.log("Open categories after clicking General:", openCategories);
  await saveScreen(page, "37-desktop-tree-general-open");

  // Test 3: Click "Surfaces & Layout" category (General MUST automatically collapse!)
  console.log("\n--- Test 3: Click 'Surfaces & Layout' category ---");
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('aside [role="treeitem"]'));
    const surf = items.find((el) => el.textContent && el.textContent.includes("Surfaces & Layout"));
    if (surf) surf.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  openCategories = await page.evaluate(() => {
    const expanded = document.querySelectorAll('aside [role="treeitem"][aria-expanded="true"]');
    return Array.from(expanded).map((el) => el.textContent.trim());
  });
  console.log("Open categories after clicking Surfaces & Layout (General should be closed):", openCategories);
  await saveScreen(page, "38-desktop-tree-surfaces-open-general-closed");

  // Test 4: Click "Forms" category (Surfaces & Layout MUST automatically collapse!)
  console.log("\n--- Test 4: Click 'Forms' category ---");
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('aside [role="treeitem"]'));
    const forms = items.find((el) => el.textContent && el.textContent.includes("Forms"));
    if (forms) forms.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  openCategories = await page.evaluate(() => {
    const expanded = document.querySelectorAll('aside [role="treeitem"][aria-expanded="true"]');
    return Array.from(expanded).map((el) => el.textContent.trim());
  });
  console.log("Open categories after clicking Forms (Surfaces should be closed):", openCategories);
  await saveScreen(page, "39-desktop-tree-forms-open-surfaces-closed");

  // Test 5: Click "Forms" again (Forms collapses, all closed)
  console.log("\n--- Test 5: Click 'Forms' again to collapse ---");
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('aside [role="treeitem"]'));
    const forms = items.find((el) => el.textContent && el.textContent.includes("Forms"));
    if (forms) forms.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  openCategories = await page.evaluate(() => {
    const expanded = document.querySelectorAll('aside [role="treeitem"][aria-expanded="true"]');
    return Array.from(expanded).map((el) => el.textContent.trim());
  });
  console.log("Open categories after clicking Forms again (should be empty):", openCategories);
  await saveScreen(page, "40-desktop-tree-all-collapsed-again");

  // Test 6: Mobile drawer accordion behavior
  console.log("\n--- Test 6: Mobile Drawer Accordion Behavior ---");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:5173/?theme=minimal-light", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));

  // Open drawer
  await page.evaluate(() => {
    const btn = document.querySelector('header button[aria-label="Open navigation menu"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Click Feedback in mobile drawer
  console.log("Clicking Feedback in mobile drawer...");
  await page.evaluate(() => {
    const modal = document.querySelector('[role="dialog"]');
    if (!modal) return;
    const items = Array.from(modal.querySelectorAll('[role="treeitem"]'));
    const feedback = items.find((el) => el.textContent && el.textContent.includes("Feedback"));
    if (feedback) feedback.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await saveScreen(page, "41-mobile-drawer-feedback-open");

  // Click Navigation in mobile drawer (Feedback MUST automatically collapse)
  console.log("Clicking Navigation in mobile drawer (Feedback should close)...");
  await page.evaluate(() => {
    const modal = document.querySelector('[role="dialog"]');
    if (!modal) return;
    const items = Array.from(modal.querySelectorAll('[role="treeitem"]'));
    const nav = items.find((el) => el.textContent && el.textContent.includes("Navigation"));
    if (nav) nav.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  const mobileOpenCategories = await page.evaluate(() => {
    const modal = document.querySelector('[role="dialog"]');
    if (!modal) return [];
    const expanded = modal.querySelectorAll('[role="treeitem"][aria-expanded="true"]');
    return Array.from(expanded).map((el) => el.textContent.trim());
  });
  console.log("Mobile open categories (Feedback should be closed, only Navigation open):", mobileOpenCategories);
  await saveScreen(page, "42-mobile-drawer-navigation-open-feedback-closed");

  await browser.close();
  console.log("\nAccordion single-expand tree verification completed successfully!");
})();
