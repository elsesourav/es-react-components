const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:5173/?component=squish-switch ...');
  await page.goto('http://localhost:5173/?component=squish-switch', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Squish switch preview first, controls second
  await page.screenshot({
    path: path.resolve('screenshots/188-squish-switch-preview-first.png'),
    fullPage: false
  });
  console.log('Saved 188-squish-switch-preview-first.png');

  // 2. Click "Usage & Code" tab
  console.log('Clicking "Usage & Code" tab...');
  const tabs = await page.$$('button');
  for (const tab of tabs) {
    const text = await page.evaluate(el => el.textContent, tab);
    if (text && text.includes('Usage & Code')) {
      await tab.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.resolve('screenshots/189-squish-switch-usage-source-code.png'),
    fullPage: false
  });
  console.log('Saved 189-squish-switch-usage-source-code.png');

  // Scroll down in main to see full source code and properties table
  await page.evaluate(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 500;
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.resolve('screenshots/190-squish-switch-source-code-scrolled.png'),
    fullPage: false
  });
  console.log('Saved 190-squish-switch-source-code-scrolled.png');

  // 3. Navigate to Badge component
  console.log('Navigating to Badge component...');
  await page.goto('http://localhost:5173/?component=badge', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.resolve('screenshots/191-badge-preview-first.png'),
    fullPage: false
  });
  console.log('Saved 191-badge-preview-first.png');

  // Click Usage & Code tab for Badge
  const badgeTabs = await page.$$('button');
  for (const tab of badgeTabs) {
    const text = await page.evaluate(el => el.textContent, tab);
    if (text && text.includes('Usage & Code')) {
      await tab.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.resolve('screenshots/192-badge-usage-source-code.png'),
    fullPage: false
  });
  console.log('Saved 192-badge-usage-source-code.png');

  // 4. Navigate to Segmented A/B Tabs
  console.log('Navigating to Segmented A/B Tabs...');
  await page.goto('http://localhost:5173/?component=segmented-ab-tabs', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.resolve('screenshots/193-segmented-ab-tabs-preview-first.png'),
    fullPage: false
  });
  console.log('Saved 193-segmented-ab-tabs-preview-first.png');

  // 5. Navigate to Quantity Counter
  console.log('Navigating to Quantity Counter...');
  await page.goto('http://localhost:5173/?component=quantity-counter', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.resolve('screenshots/194-quantity-counter-preview-first.png'),
    fullPage: false
  });
  console.log('Saved 194-quantity-counter-preview-first.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
