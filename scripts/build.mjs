import { build, createServer } from "vite";
import { readFile, writeFile } from "node:fs/promises";

await import("./generate-pages.mjs");
await build();
const server = await createServer({ optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: "custom" });
try {
  const { render } = await server.ssrLoadModule("/prerender.tsx");
  const html = await readFile("dist/index.html", "utf8");
  if (!html.includes('<div id="root"></div>')) throw new Error("Missing render target");
  await writeFile("dist/index.html", html.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`));
} finally {
  await server.close();
}
