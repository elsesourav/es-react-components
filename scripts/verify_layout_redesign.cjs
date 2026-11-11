const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = path.resolve('/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots');
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // 1. Overview page
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '155-desktop-redesigned-layout-overview.png') });
    console.log('Captured 155-desktop-redesigned-layout-overview.png');

    // 2. Select a component (Badge) by expanding all and clicking
    await page.evaluate(() => {
      const expandBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Expand all'));
      if (expandBtn) expandBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('button, [role="treeitem"]'));
      const badge = items.find(el => el.textContent && el.textContent.trim() === 'Badge');
      if (badge) badge.click();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '156-desktop-redesigned-layout-component.png') });
    console.log('Captured 156-desktop-redesigned-layout-component.png');

    // 3. Select Segmented A/B Tabs
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('button, [role="treeitem"]'));
      const tabs = items.find(el => el.textContent && el.textContent.includes('Segmented A/B Tabs'));
      if (tabs) tabs.click();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '157-desktop-segmented-ab-component.png') });
    console.log('Captured 157-desktop-segmented-ab-component.png');

    // 4. Toggle to Light Theme
    await page.evaluate(() => {
      const sunBtn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('aria-label') && b.getAttribute('aria-label').includes('Switch to Light'));
      if (sunBtn) sunBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '159-desktop-segmented-ab-light.png') });
    console.log('Captured 159-desktop-segmented-ab-light.png');

    // Toggle back to dark theme
    await page.evaluate(() => {
      const moonBtn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('aria-label') && b.getAttribute('aria-label').includes('Switch to Dark'));
      if (moonBtn) moonBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 4. Mobile view
    await page.setViewport({ width: 390, height: 844 });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '158-mobile-redesigned-layout.png') });
    console.log('Captured 158-mobile-redesigned-layout.png');

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
}

run();
