// Removes original image assets (.jpg/.jpeg/.png) from dist/_astro that
// Vite emits but Astro never references in HTML. Astro's <Image> /
// getImage() pipeline emits optimized .webp variants and links to those,
// but Vite still ships the source file alongside as a dead asset. For
// large images (e.g. the photo gallery), this can balloon the build by
// ~80MB. This script walks dist/, collects every /_astro/* URL referenced
// in any built HTML file, then deletes any .jpg/.jpeg/.png in dist/_astro/
// that isn't in that set.

import { readdir, readFile, stat, unlink } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";
const ASTRO_DIR = join(DIST, "_astro");

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const allFiles = await walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

const referenced = new Set();
const refRegex = /_astro\/([A-Za-z0-9._\-]+)/g;
for (const f of htmlFiles) {
  const content = await readFile(f, "utf8");
  for (const m of content.matchAll(refRegex)) referenced.add(m[1]);
}

const astroFiles = await readdir(ASTRO_DIR);
let removed = 0;
let bytes = 0;
for (const name of astroFiles) {
  if (!/\.(jpe?g|png)$/i.test(name)) continue;
  if (referenced.has(name)) continue;
  const p = join(ASTRO_DIR, name);
  const s = await stat(p);
  bytes += s.size;
  await unlink(p);
  removed++;
}

const mb = (bytes / 1024 / 1024).toFixed(1);
console.log(`clean-orphan-assets: removed ${removed} orphan(s), freed ${mb} MB`);
