const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '../screenshots/four-components-verified');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const COMPONENTS = [
  { id: 'text-loop', name: 'TextLoop' },
  { id: 'split-flap-text', name: 'SplitFlapText' },
  { id: 'branched-menu', name: 'BranchedMenu' },
  { id: 'peek-rating', name: 'PeekRating' }
];

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900, scrollY: 180 },
  { name: 'tablet', width: 768, height: 1024, scrollY: 220 },
  { name: 'mobile', width: 390, height: 844, scrollY: 280 }
];

const THEMES = [
  { key: 'minimal-light', label: 'Light' },
  { key: 'midnight', label: 'Dark Midnight' },
  { key: 'cyberpunk', label: 'Cyberpunk' }
];

(async () => {
  console.log('Starting comprehensive verification of all 4 components across themes and viewports...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
  });

  const page = await browser.newPage();

  for (const comp of COMPONENTS) {
    console.log(`\n========================================\nVerifying Component: ${comp.name} (${comp.id})\n========================================`);

    for (const vp of VIEWPORTS) {
      for (const th of THEMES) {
        await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
        const url = `http://localhost:5173/?component=${comp.id}&theme=${th.key}`;
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Let components mount and animate
        await new Promise((r) => setTimeout(r, 500));

        // Scroll to bring interactive playground into view
        await page.evaluate((y) => {
          window.scrollTo({ top: y, behavior: 'instant' });
        }, vp.scrollY);

        await new Promise((r) => setTimeout(r, 400));

        // Check for body overflow / layout breaks
        const overflowCheck = await page.evaluate(() => {
          const body = document.body;
          const html = document.documentElement;
          return {
            windowWidth: window.innerWidth,
            bodyScrollWidth: body.scrollWidth,
            htmlScrollWidth: html.scrollWidth,
            hasBodyOverflow: body.scrollWidth > window.innerWidth + 2
          };
        });

        const filename = `${comp.id}-${vp.name}-${th.key}.png`;
        const filePath = path.join(OUTPUT_DIR, filename);
        await page.screenshot({ path: filePath, fullPage: false });

        console.log(`✓ [${comp.name}] [${vp.name.toUpperCase()}] [${th.label}] -> ${filename} (Overflow: ${overflowCheck.hasBodyOverflow ? 'YES (ISSUE!)' : 'None - Clean'})`);
      }
    }
  }

  // Interactivity Test: PeekRating hover and click
  console.log('\nTesting PeekRating interactivity...');
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/?component=peek-rating&theme=minimal-light', { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.scrollTo({ top: 320, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 400));

  // Find buttons inside peek-rating
  const stars = await page.$$('button[aria-label*="of 5"]');
  if (stars.length >= 5) {
    // Hover on 5th star
    await stars[4].hover();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'peek-rating-interactive-hover-star5.png') });
    console.log('✓ Captured PeekRating hover state with tooltip');

    // Click 5th star
    await stars[4].click();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'peek-rating-interactive-click-star5.png') });
    console.log('✓ Captured PeekRating click commit state');
  }

  // Interactivity Test: BranchedMenu selection
  console.log('\nTesting BranchedMenu selection...');
  await page.goto('http://localhost:5173/?component=branched-menu&theme=midnight', { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.scrollTo({ top: 320, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 400));

  const menuItems = await page.$$('.branched-menu__item');
  if (menuItems.length >= 2) {
    await menuItems[1].click(); // click quick start or configuration
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'branched-menu-interactive-selected.png') });
    console.log('✓ Captured BranchedMenu item selection transition');
  }

  await browser.close();
  console.log('\nAll tests and screenshots completed successfully in:', OUTPUT_DIR);
})();
