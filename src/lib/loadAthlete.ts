import fs from "fs";
import path from "path";
import type { AthleteData } from "@/types/athlete";

const DATA_DIR = path.join(process.cwd(), "src/data");

export function getAthleteSlugs(): string[] {
  const dir = path.join(DATA_DIR, "athletes");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getAthleteBySlug(slug: string): AthleteData | null {
  const file = path.join(DATA_DIR, "athletes", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as AthleteData;
}
