import type { AthleteData, ThemePreset } from "@/types/athlete";

export function resolveThemePreset(data: AthleteData): ThemePreset {
  return data.theme?.preset ?? "atleti";
}

/** Classe sul wrapper della pagina atleta: attiva variabili CSS in `globals.css`. */
export function themeRootClass(preset: ThemePreset): string {
  return `theme-${preset}`;
}
