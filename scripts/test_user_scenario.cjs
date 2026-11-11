const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:5173/?component=poll-results", { waitUntil: "networkidle2" });

  const check = async (label) => {
    const data = await page.evaluate(() => {
      const h = document.querySelector("header")?.getBoundingClientRect();
      const b = document.querySelector("aside > div:first-child")?.getBoundingClientRect();
      const input = document.querySelector("aside input")?.getBoundingClientRect();
      return {
        windowScrollY: window.scrollY,
        bodyScrollTop: document.body.scrollTop,
        htmlScrollTop: document.documentElement.scrollTop,
        mainScrollTop: document.getElementById("main-scroll-container")?.scrollTop,
        headerTop: h?.top,
        asideBrandTop: b?.top,
        filterTop: input?.top,
      };
    });
    console.log(label, data);
  };

  await check("1. Init:");

  // Test 1: Press '/'
  await page.keyboard.press("/");
  await new Promise(r => setTimeout(r, 200));
  await check("2. After / key:");

  // Test 2: Type in filter
  await page.keyboard.type("poll");
  await new Promise(r => setTimeout(r, 200));
  await check("3. After typing poll:");

  // Test 3: Click item
  const item = await page.$('[data-id="poll-results"]');
  if (item) await item.click();
  await new Promise(r => setTimeout(r, 200));
  await check("4. After clicking item:");

  // Test 4: Mouse wheel on sidebar
  await page.mouse.move(100, 300);
  await page.mouse.wheel({ deltaY: 300 });
  await new Promise(r => setTimeout(r, 200));
  await check("5. After wheel on sidebar:");

  // Test 5: Mouse wheel on main content
  await page.mouse.move(600, 300);
  await page.mouse.wheel({ deltaY: 300 });
  await new Promise(r => setTimeout(r, 200));
  await check("6. After wheel on main:");

  await browser.close();
})();
