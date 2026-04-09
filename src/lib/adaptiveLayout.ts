/** Classi griglia in base al numero di elementi (evita colonne vuote o card troppo strette). */

export function summaryStatsGridClass(count: number): string {
  const gap = "gap-3 sm:gap-4";
  if (count <= 1) {
    return `grid ${gap} max-w-xs grid-cols-1 justify-items-stretch mx-auto`;
  }
  if (count === 2) {
    return `grid ${gap} max-w-xl grid-cols-2 mx-auto`;
  }
  if (count === 3) {
    return `grid ${gap} max-w-3xl grid-cols-3 mx-auto`;
  }
  return `grid ${gap} grid-cols-2 sm:grid-cols-4`;
}

