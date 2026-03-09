import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const root = process.cwd();
const inputPath = path.join(root, "presentation.html");
const outputPath = path.join(root, "ASV-11-Presentation.pdf");

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(inputPath).href, {
    waitUntil: "networkidle0",
  });
  await page.pdf({
    path: outputPath,
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: {
      top: "0mm",
      right: "0mm",
      bottom: "0mm",
      left: "0mm",
    },
  });
  console.log(`Generated ${outputPath}`);
} finally {
  await browser.close();
}
