const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PROJECT_DIR = '/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots';
const ARTIFACT_DIR = '/Users/sourav/.gemini/antigravity/brain/aad8fc9a-2d93-48bc-a25c-5a3b7996848f/screenshots';

fs.mkdirSync(PROJECT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

function copyToArtifacts(filename) {
  const src = path.join(PROJECT_DIR, filename);
  const dest = path.join(ARTIFACT_DIR, filename);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('--- TEST 1: DESKTOP STICKY SIDEBAR VERIFICATION ---');
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Check initial sidebar position
  const initialSidebarRect = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    if (!aside) return null;
    const r = aside.getBoundingClientRect();
    return { top: r.top, left: r.left, height: r.height, sticky: window.getComputedStyle(aside).position };
  });
  console.log('Initial sidebar rect at scroll 0:', initialSidebarRect);

  // Scroll page down by 800px
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 500));

  const scrolledSidebarRect = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    if (!aside) return null;
    const r = aside.getBoundingClientRect();
    return { top: r.top, left: r.left, height: r.height, scrollY: window.scrollY };
  });
  console.log('Sidebar rect after 800px scroll:', scrolledSidebarRect);

  await page.screenshot({
    path: path.join(PROJECT_DIR, '125-desktop-sticky-sidebar-scrolled.png')
  });
  copyToArtifacts('125-desktop-sticky-sidebar-scrolled.png');

  console.log('--- TEST 2: PARAMETER SLIDER PLAYGROUND IN MIDNIGHT THEME ---');
  await page.goto('http://localhost:5173/?component=parameter-slider', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(PROJECT_DIR, '126-desktop-parameter-slider-midnight.png')
  });
  copyToArtifacts('126-desktop-parameter-slider-midnight.png');

  console.log('--- TEST 3: SWITCH TO CLEAN LIGHT THEME ---');
  await page.evaluate(() => {
    const select = document.querySelector('header select');
    if (select) {
      select.value = 'minimal-light';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(PROJECT_DIR, '127-desktop-parameter-slider-light.png')
  });
  copyToArtifacts('127-desktop-parameter-slider-light.png');

  console.log('--- TEST 4: SWITCH TO CYBERPUNK THEME ---');
  await page.evaluate(() => {
    const select = document.querySelector('header select');
    if (select) {
      select.value = 'cyberpunk';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(PROJECT_DIR, '128-desktop-parameter-slider-cyberpunk.png')
  });
  copyToArtifacts('128-desktop-parameter-slider-cyberpunk.png');

  console.log('--- TEST 5: MOBILE ZERO-OVERFLOW & TOUCH SCROLL LOCK AUDIT ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const overflowMetrics = await page.evaluate(() => {
    const docEl = document.documentElement;
    const body = document.body;
    return {
      docScrollWidth: docEl.scrollWidth,
      docClientWidth: docEl.clientWidth,
      bodyScrollWidth: body.scrollWidth,
      bodyClientWidth: body.clientWidth,
      diff: docEl.scrollWidth - docEl.clientWidth
    };
  });
  console.log('Mobile overflow metrics:', overflowMetrics);

  // Test mobile directory modal open and scroll lock
  const openMenuBtn = await page.$('button[aria-label="Open navigation menu"]');
  if (openMenuBtn) {
    await openMenuBtn.click();
    await new Promise(r => setTimeout(r, 500));

    const lockedState = await page.evaluate(() => {
      return {
        htmlOverflow: document.documentElement.style.overflow,
        bodyOverflow: document.body.style.overflow
      };
    });
    console.log('Modal OPEN document overflow lock state:', lockedState);

    await page.screenshot({
      path: path.join(PROJECT_DIR, '129-mobile-scroll-and-sidebar-verified.png')
    });
    copyToArtifacts('129-mobile-scroll-and-sidebar-verified.png');

    // Close modal
    const closeBtn = await page.$('button[aria-label="Close dialog"]');
    if (closeBtn) await closeBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const restoredState = await page.evaluate(() => {
      return {
        htmlOverflow: document.documentElement.style.overflow,
        bodyOverflow: document.body.style.overflow
      };
    });
    console.log('Modal CLOSED document overflow restored state:', restoredState);
  }

  await browser.close();
  console.log('Verification completed successfully!');
})();
