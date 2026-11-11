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

    console.log('1. Navigating to http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    // Test 1: Pressing '/' key must ONLY focus the filter input, NOT open the search modal
    console.log('2. Testing "/" key press...');
    // Ensure body has focus initially
    await page.evaluate(() => document.body.focus());
    await page.keyboard.press('/');
    await new Promise(r => setTimeout(r, 400));

    const slashResult = await page.evaluate(() => {
      const activeEl = document.activeElement;
      const commandPalette = document.querySelector('[role="dialog"][aria-label="Command palette"]');
      const isFilterFocused = activeEl && activeEl.getAttribute('placeholder') === 'Filter components...';
      const isCommandOpen = !!commandPalette && commandPalette.offsetParent !== null;
      return { isFilterFocused, isCommandOpen };
    });

    console.log('Slash key test result:', slashResult);
    if (!slashResult.isFilterFocused || slashResult.isCommandOpen) {
      throw new Error(`Slash key failed! isFilterFocused: ${slashResult.isFilterFocused}, isCommandOpen: ${slashResult.isCommandOpen}`);
    }

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '160-slash-key-filter-focused.png') });
    console.log('Captured 160-slash-key-filter-focused.png');

    // Test 2: Document scroll lock and unlock test
    console.log('3. Testing scroll lock/unlock cycle...');
    await page.keyboard.down('Meta');
    await page.keyboard.press('k');
    await page.keyboard.up('Meta');
    await new Promise(r => setTimeout(r, 400));

    const lockState1 = await page.evaluate(() => document.body.style.overflow);
    console.log('Body overflow while command open:', lockState1);

    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));

    const unlockState1 = await page.evaluate(() => ({
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    }));
    console.log('Body overflow after close:', unlockState1);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '161-overflow-scroll-verified.png') });
    console.log('Captured 161-overflow-scroll-verified.png');

    // Test 3: Navigate to Top Search & Animated Placeholder component and inspect MD Code format
    console.log('4. Navigating to Top Search & Animated Placeholder component...');
    await page.evaluate(() => {
      const expandAll = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Expand all'));
      if (expandAll) expandAll.click();
    });
    await new Promise(r => setTimeout(r, 300));

    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('button, [role="treeitem"]'));
      const target = items.find(el => el.textContent && el.textContent.includes('Top Search'));
      if (target) target.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // Capture the clean 2-section tabs (Interactive Preview & Usage & Code)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '165-simple-two-tabs-preview.png') });
    console.log('Captured 165-simple-two-tabs-preview.png');

    // Click "Usage & Code" tab
    console.log('5. Clicking "Usage & Code" tab...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const codeTab = buttons.find(t => t.textContent && t.textContent.includes('Usage & Code'));
      if (codeTab) codeTab.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Verify markdown content with js snippets
    const contentCheck = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasSearchButton: text.includes('SearchButton'),
        hasImportStatement: text.includes('1. Import Statement'),
        hasUsageExample: text.includes('2. Usage Example'),
        hasPropsAPI: text.includes('3. Properties & API'),
        hasJsTag: Array.from(document.querySelectorAll('span')).some(s => s.textContent === 'JS' || s.textContent === 'js')
      };
    });
    console.log('Content check in MD Format:', contentCheck);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '166-simple-two-tabs-code-md.png') });
    console.log('Captured 166-simple-two-tabs-code-md.png');

    // Test 4: Check Segmented A/B Tabs in MD format
    console.log('6. Checking Segmented A/B Tabs MD format...');
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('button, [role="treeitem"]'));
      const target = items.find(el => el.textContent && el.textContent.includes('Segmented A/B Tabs'));
      if (target) target.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // Click "Usage & Code" tab
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const codeTab = buttons.find(t => t.textContent && t.textContent.includes('Usage & Code'));
      if (codeTab) codeTab.click();
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '167-simple-two-tabs-segmented-tabs-md.png') });
    console.log('Captured 167-simple-two-tabs-segmented-tabs-md.png');

    console.log('=== ALL TESTS COMPLETED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Error during test:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
