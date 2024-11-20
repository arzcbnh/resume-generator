import fsExtra from "fs-extra/esm"
import puppeteer from "puppeteer"
import mustache from "mustache"
import path from "node:path"
import fs from "node:fs"

// Read and decode data
const data = JSON.parse(fs.readFileSync("data.json", { encoding: "utf8" }));
data.ampersand = "&";

// Read HTML and CSS templates
const src = {
    html: fs.readFileSync(path.join("src", "index.html.mustache"), { encoding: "utf8" }),
    css: fs.readFileSync(path.join("src", "style.css.mustache"), { encoding: "utf8" }),
};

// Render and store files
const dist = {
    html: mustache.render(src.html, data),
    css: mustache.render(src.css, data),
};

await fsExtra.copy("public", "dist", { overwrite: true });
fs.writeFileSync(path.join("dist", "index.html"), dist.html);
fs.writeFileSync(path.join("dist", "style.css"), dist.css);

// Create PDF
const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(`file://${import.meta.dirname}/dist/index.html`, { waitUntil: "load" });
await page.pdf({
    path: "resume.pdf",
    format: "A4",
    printBackground: true,
});

await browser.close();
