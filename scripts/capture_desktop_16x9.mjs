import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5174';
const RAW_DIR = path.resolve('showcase/.raw_16x9');
fs.mkdirSync(RAW_DIR, { recursive: true });

async function capture16x9() {
  console.log('Spawning Chrome for 16:9 Desktop Captures (1920x1080)...');
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9340',
    '--user-data-dir=/tmp/chrome_16x9_' + Date.now(),
    '--window-size=1920,1080',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  try {
    let listRes = null;
    for (let i = 0; i < 30; i++) {
      try {
        listRes = await fetch('http://127.0.0.1:9340/json/list');
        if (listRes.ok) break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 300));
      }
    }
    if (!listRes) throw new Error('Could not connect to Chrome debugger on port 9340');

    const pages = await listRes.json();
    const page = pages.find((p) => p.type === 'page');
    if (!page) throw new Error('No target page found');

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise(resolve => {
        const msgId = id++;
        const handler = (e) => {
          const d = JSON.parse(e.data);
          if (d.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Page.enable');

    // Optimized Desktop Viewport: 1440 x 810 (16:9) @ 2.0x Retina
    // Eliminates empty side gaps so content, cards, and sidebar fill the frame horizontally
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 810,
      deviceScaleFactor: 2.0,
      mobile: false,
    });

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    async function snap(filename) {
      const snap = await send('Page.captureScreenshot', { format: 'png' });
      const dest = path.join(RAW_DIR, filename);
      fs.writeFileSync(dest, Buffer.from(snap.data, 'base64'));
      console.log(`✓ Saved 16:9 desktop capture: ${filename}`);
    }

    // 1. Overview Dashboard
    console.log('1. Capturing 16:9 Overview...');
    await send('Page.navigate', { url: `${BASE_URL}/` });
    await wait(3500);
    // Keep scroll at top: 0 so the entire hero title, badges, and stats start cleanly
    await send('Runtime.evaluate', {
      expression: `
        const container = document.getElementById('main-scroll-container');
        if (container) container.scrollTo({ top: 0, behavior: 'instant' });
      `
    });
    await wait(800);
    await snap('raw_16x9_01_overview.png');

    // 2. Tactile 3D Hardware Deck
    console.log('2. Capturing 16:9 Tactile 3D Suite...');
    await send('Page.navigate', { url: `${BASE_URL}/?component=tactile-primitives` });
    await wait(2200);
    await send('Runtime.evaluate', {
      expression: `
        const container = document.getElementById('main-scroll-container');
        if (container) container.scrollTo({ top: 220, behavior: 'instant' });
      `
    });
    await wait(600);
    await snap('raw_16x9_02_tactile.png');

    // 3. Theme Engine & Live Customizer
    console.log('3. Capturing 16:9 Theme Customizer...');
    await send('Page.navigate', { url: `${BASE_URL}/?component=tactile-primitives` });
    await wait(1800);
    await send('Runtime.evaluate', {
      expression: `
        const themeBtn = document.querySelector('button[aria-label="Open theme customizer"]');
        if (themeBtn) themeBtn.click();
      `
    });
    await wait(1200);
    await snap('raw_16x9_03_theme.png');

    // 4. Kinetic Toast Stack
    console.log('4. Capturing 16:9 Toast Stack...');
    await send('Page.navigate', { url: `${BASE_URL}/?component=toast` });
    await wait(1800);
    await send('Runtime.evaluate', {
      expression: `
        const btns = Array.from(document.querySelectorAll('button')).filter(b => 
          b.textContent?.includes('Success') || 
          b.textContent?.includes('Info') || 
          b.textContent?.includes('Error') ||
          b.textContent?.includes('Warning')
        );
        if (btns.length >= 3) {
          btns[0].click();
          setTimeout(() => btns[1].click(), 180);
          setTimeout(() => btns[2].click(), 360);
        }
      `
    });
    await wait(1500);
    await snap('raw_16x9_04_toast.png');

    // 5. Image Crop & Upload (Wide Landscape Ratio in Expanded Modal)
    console.log('5. Capturing 16:9 Image Crop Studio...');
    await send('Page.navigate', { url: `${BASE_URL}/?component=image-upload` });
    await wait(2000);
    await send('Runtime.evaluate', {
      expression: `
        const bannerPresetBtn = Array.from(document.querySelectorAll('button')).find(b => 
          b.textContent?.includes('Hero Banner (16:9)') || b.textContent?.includes('Desktop Banner (21:9)')
        );
        if (bannerPresetBtn) bannerPresetBtn.click();
        
        setTimeout(() => {
          const editBtn = Array.from(document.querySelectorAll('button')).find(b => 
            b.textContent?.includes('Crop') || 
            b.textContent?.includes('Edit') || 
            b.textContent?.includes('Upload')
          );
          if (editBtn) editBtn.click();
        }, 400);
      `
    });
    await wait(1800);
    await snap('raw_16x9_05_image_crop.png');

    // 6. Mono Charts & Analytics with Custom Theme (Cyberpunk Neon)
    console.log('6. Capturing 16:9 Mono Charts (Custom Cyberpunk Theme)...');
    await send('Page.navigate', { url: `${BASE_URL}/?component=mono-charts&theme=cyberpunk` });
    await wait(2200);
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 130, behavior: 'instant' });`
    });
    await wait(600);
    await snap('raw_16x9_06_charts.png');

    ws.close();
    console.log('All 16:9 captures saved successfully!');
  } finally {
    chrome.kill('SIGKILL');
  }
}

capture16x9().catch(err => {
  console.error(err);
  process.exit(1);
});
