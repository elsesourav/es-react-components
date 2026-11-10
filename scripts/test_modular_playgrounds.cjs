const puppeteer = require("puppeteer");
const path = require("path");

const componentsToTest = [
  "parameter-slider",
  "text-loop",
  "split-flap-text",
  "branched-menu",
  "peek-rating",
  "button",
  "issue-board",
  "mono-charts",
];

(async () => {
  console.log("Testing modular playgrounds in browser...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  for (const c of componentsToTest) {
    await page.goto(`http://localhost:5173/?component=${c}&theme=midnight`, {
      waitUntil: "networkidle0",
    });
    await new Promise((r) => setTimeout(r, 400));
    console.log(`✓ Component [${c}] rendered without error.`);
  }

  await browser.close();

  if (errors.length > 0) {
    console.error("Browser errors encountered:", errors);
    process.exit(1);
  } else {
    console.log("All tested modular playgrounds rendered with ZERO browser errors!");
  }
})();
