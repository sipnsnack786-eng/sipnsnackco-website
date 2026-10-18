import { access, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let sharp;
try { sharp = (await import("sharp")).default; }
catch {
  // Install a build-only optimizer without modifying the committed lockfile.
  execFileSync("npm", ["install", "--no-save", "--no-package-lock", "--ignore-scripts=false", "sharp@0.34.4"], { stdio: "inherit" });
  sharp = (await import("sharp")).default;
}
const dir = path.resolve("public/images");
const images = ["hero-model","collection","iced","chai","chocolate","latte","pallet-classic","pallet-wrapped"];
for (const name of images) {
  const src = path.join(dir, name + ".png");
  await access(src);
  const width = name === "hero-model" ? 1000 : 900;
  await sharp(src).rotate().resize({width, withoutEnlargement:true}).webp({quality:74, effort:5}).toFile(path.join(dir,name+".webp"));
  if (name === "hero-model") await sharp(src).rotate().resize({width:480, withoutEnlargement:true}).webp({quality:72, effort:5}).toFile(path.join(dir,name+"-480.webp"));
}
await sharp(path.join(dir,"sip-n-snack-logo-final.png")).resize({width:620,withoutEnlargement:true}).webp({quality:82,effort:5}).toFile(path.join(dir,"sip-n-snack-logo-final.webp"));
console.log("Optimized image assets for production.");
