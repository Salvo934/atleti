/**
 * Legge src/data/athletes/*.json e genera src/generated/host-map.ts
 * per il middleware (dominio / sottodominio → slug).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const athletesDir = path.join(root, "src", "data", "athletes");
const outFile = path.join(root, "src", "generated", "host-map.ts");

const map = Object.create(null);
const seen = new Map();

if (!fs.existsSync(athletesDir)) {
  console.warn("generate-host-map: cartella athletes assente");
  process.exit(0);
}

for (const f of fs.readdirSync(athletesDir).filter((x) => x.endsWith(".json"))) {
  const raw = fs.readFileSync(path.join(athletesDir, f), "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.warn("generate-host-map: JSON non valido:", f);
    continue;
  }
  const slug = data.slug;
  const hosts = data.site?.hosts;
  if (!slug || !Array.isArray(hosts)) continue;

  for (let h of hosts) {
    h = String(h).trim().toLowerCase().split(":")[0];
    if (!h) continue;
    if (map[h] && map[h] !== slug) {
      console.warn(
        `generate-host-map: host duplicato "${h}" → "${map[h]}" e "${slug}" (vince ${slug})`,
      );
    }
    if (seen.has(h) && seen.get(h) !== slug) {
      console.warn(`generate-host-map: sovrascrittura host "${h}"`);
    }
    seen.set(h, slug);
    map[h] = slug;
  }
}

const entries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
const body = entries.map(([host, slug]) => `  ${JSON.stringify(host)}: ${JSON.stringify(slug)},`).join("\n");

const content = `/**
 * Mappa host → slug atleta. Generata da scripts/generate-host-map.mjs
 * in base a \`site.hosts\` nei JSON. Non modificare a mano.
 */
export const hostToSlug: Record<string, string> = {
${body}
};
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, content);
console.log(`generate-host-map: ${entries.length} host → slug`);
