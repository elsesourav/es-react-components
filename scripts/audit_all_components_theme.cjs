const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const dir = "src/showcase/data";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");

const components = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), "utf8");
  const regex = /id:\s*[\x27"]([a-z0-9-]+)[\x27"],\s*name:\s*[\x27"]([^\x27"]+)[\x27"],\s*category:\s*[\x27"]([^\x27"]+)[\x27"]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    components.push({ id: m[1], name: m[2], category: m[3] });
  }
}

console.log(`Auditing all ${components.length} components across themes...`);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const errors = [];
  const themeIssues = [];

  page.on("pageerror", err => {
    errors.push({ type: "pageerror", message: err.message });
  });

  page.on("console", msg => {
    if (msg.type() === "error") {
      errors.push({ type: "console.error", text: msg.text() });
    }
  });

  for (let i = 0; i < components.length; i++) {
    const comp = components[i];
    const url = `http://localhost:5173/?component=${comp.id}`;
    try {
      await page.goto(url, { waitUntil: "networkidle2" });
      await new Promise(r => setTimeout(r, 200));

      const evaluation = await page.evaluate((compName) => {
        // Check if main rendered playground or fallback
        const playground = document.querySelector("main");
        const text = playground ? playground.innerText : "";
        const hasContent = text.length > 50;

        // Check contrast between background and text in main
        const mainEl = document.querySelector("main");
        const style = mainEl ? window.getComputedStyle(mainEl) : null;

        // Check if component-specific playground mounted
        const notFound = text.includes("Select a component") || text.includes("Component not found");

        return {
          hasContent,
          notFound,
          textSample: text.slice(0, 100).replace(/\n/g, " ")
        };
      }, comp.name);

      if (evaluation.notFound || !evaluation.hasContent) {
        themeIssues.push({ id: comp.id, name: comp.name, issue: "Playground empty or not found" });
        console.log(`❌ [${i+1}/${components.length}] ${comp.id} (${comp.name}): EMPTY OR NOT FOUND`);
      } else {
        console.log(`✅ [${i+1}/${components.length}] ${comp.id} (${comp.name}): OK`);
      }
    } catch (err) {
      themeIssues.push({ id: comp.id, name: comp.name, issue: err.message });
      console.log(`❌ [${i+1}/${components.length}] ${comp.id} (${comp.name}): ERROR ${err.message}`);
    }
  }

  console.log("\n--- AUDIT SUMMARY ---");
  console.log(`Total checked: ${components.length}`);
  console.log(`Theme / Mounting Issues: ${themeIssues.length}`);
  console.log(`Console Errors: ${errors.length}`);
  if (themeIssues.length > 0) {
    console.log("Issues:", JSON.stringify(themeIssues, null, 2));
  }
  if (errors.length > 0) {
    console.log("Errors sample:", JSON.stringify(errors.slice(0, 5), null, 2));
  }

  await browser.close();
})();
