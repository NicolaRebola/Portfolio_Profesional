/**
 * After `next build` (static export), `/` is a client bundle; this script **overwrites** `out/index.html`
 * with a tiny HTML redirect so static hosts work **without JS** (meta refresh + link).
 * `output: "export"` cannot use Next middleware — see `app/page.tsx` for dev / hydrated redirect.
 * Relative `en/` works on GitHub Pages project sites and plain `out/` hosting.
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "out");
const target = "en/";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Nicola Rebola</title>
  <meta http-equiv="refresh" content="0;url=${target}" />
  <link rel="canonical" href="${target}" />
</head>
<body>
  <p>Redirecting… <a href="${target}">Continue in English</a>.</p>
  <script>
    window.location.replace(new URL("${target}", window.location.href));
  </script>
</body>
</html>
`;

writeFileSync(join(outDir, "index.html"), html, "utf8");
