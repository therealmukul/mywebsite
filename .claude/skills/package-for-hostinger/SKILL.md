---
name: package-for-hostinger
description: Build the Astro site and package the dist/ output into a single zip ready to upload to Hostinger's File Manager. Use this when the user wants to deploy, publish, ship, or package the website for Hostinger (or asks to "build the zip", "make a deploy bundle", etc.).
---

This skill produces `mywebsite.zip` at the repo root — a flat archive of the contents of `dist/` that can be uploaded to Hostinger's File Manager and extracted into `public_html/`.

## Steps

### 1. Build the site

Run from the repo root:

```bash
npm run build
```

This runs `astro check && astro build` and writes the static output to `dist/`.

If the build fails because macOS Gatekeeper blocks the `node` binary ("'node' has been blocked..."), the fix is `brew reinstall node` (or `xattr -cr "$(brew --prefix node)"`). Do not delete node.

### 2. Verify the build output

Confirm `dist/` exists and contains `index.html`. If it doesn't, stop and report the build error — do not produce a zip.

### 3. Create the zip

Zip the **contents** of `dist/` (not the `dist/` folder itself), so that extracting the archive into `public_html/` puts `index.html` directly at the web root:

```bash
rm -f mywebsite.zip
cd dist && zip -r ../mywebsite.zip . && cd ..
```

### 4. Report

Tell the user:
- The zip path (`mywebsite.zip` at the repo root) and its size.
- The upload steps:
  1. Hostinger hPanel → **Files → File Manager → `public_html/`**
  2. Delete any default `index.html` / `default.php`
  3. Upload `mywebsite.zip`
  4. Right-click → **Extract** into `public_html/`
  5. Delete the zip after extraction

## Notes

- The site is configured as a static Astro build (no SSR adapter), so the `dist/` output is fully self-contained — no Node runtime needed on Hostinger.
- The canonical site URL is set in `astro.config.mjs` (`site:` field). If the user is deploying to a different domain, flag it.
- If `dist/work/.astro/` or `dist/work/node_modules/` show up in the zip listing, warn the user — those are stray dev artifacts inside `public/work/` that got copied into the build. They're harmless to deploy but should be cleaned up from the repo for future builds.
- If pages 404 after upload, recommend adding an `.htaccess` to `public_html/` with Apache rewrite rules to map clean URLs (`/about/` → `/about/index.html`).
