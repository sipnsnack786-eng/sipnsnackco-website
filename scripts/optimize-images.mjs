import { access } from "node:fs/promises";
import path from "node:path";
// Use the already-installed image optimizer without modifying npm dependencies.
// Image generation is optional; existing source PNGs remain usable if Sharp is absent.
let sharp;
try { sharp = (await import("sharp")).default; }
catch { console.warn("Sharp unavailable: skipping optional WebP generation."); }
if (sharp) {
const dir = path.resolve("public/images");
const images = ["hero-model","collection","iced","chai","chocolate","latte","pallet-classic","pallet-wrapped","cafe-latte-art","espresso-moment"];
for (const name of images) {
  const src = path.join(dir, name + ".png");
  await access(src);
  const width = name === "hero-model" ? 1000 : 900;
  await sharp(src).rotate().resize({width, withoutEnlargement:true}).webp({quality:74, effort:5}).toFile(path.join(dir,name+".webp"));
  if (name === "hero-model") await sharp(src).rotate().resize({width:480, withoutEnlargement:true}).webp({quality:72, effort:5}).toFile(path.join(dir,name+"-480.webp"));
}
await sharp(path.join(dir,"sip-n-snack-logo-final.png")).resize({width:620,withoutEnlargement:true}).webp({quality:82,effort:5}).toFile(path.join(dir,"sip-n-snack-logo-final.webp"));
console.log("Optimized image assets for production.");
}
