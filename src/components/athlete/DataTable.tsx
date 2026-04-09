type Props = {
  title: string;
  columns: string[];
  rows: (string | number)[][];
};

/** Prime colonne = contesto; resto = numeri */
const LABEL_COLS = 3;

function formatCell(cell: string | number) {
  if (cell === "" || cell === null || cell === undefined) return "—";
  return cell;
}

export function DataTable({ title, columns, rows }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--surface-card)] shadow-[0_32px_64px_-40px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:rounded-3xl">
      {/* Rifilo luminoso superiore */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        aria-hidden
      />

      <div className="relative border-b border-white/[0.06] bg-gradient-to-b from-[#0c0c0c] to-[#060606] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-center gap-3">
          <span
            className="h-1 w-1 shrink-0 rounded-full bg-white/25 shadow-[0_0_8px_rgba(255,255,255,0.35)]"
            aria-hidden
          />
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:text-xs sm:tracking-[0.24em]">
            {title}
          </h4>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#030303] [scrollbar-color:rgba(255,255,255,0.12)_rgba(255,255,255,0.03)] [scrollbar-width:thin]">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="border-b border-white/[0.07] bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
              {columns.map((c, i) => (
                <th
                  key={`${c}-${i}`}
                  scope="col"
                  className={`whitespace-nowrap px-3 py-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white/38 sm:px-4 sm:py-[1.125rem] sm:text-[11px] sm:tracking-[0.18em] first:pl-5 last:pr-5 sm:first:pl-7 sm:last:pr-7 ${
                    i < LABEL_COLS ? "text-left" : "text-center"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[13px] sm:text-sm">
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-white/[0.035] transition-colors duration-200 odd:bg-[var(--background)] even:bg-[var(--surface-card)] last:border-b-0 hover:bg-white/[0.035]"
              >
                {row.map((cell, ci) => {
                  const label = ci < LABEL_COLS;
                  return (
                    <td
                      key={ci}
                      className={`whitespace-nowrap px-3 py-[0.9rem] first:pl-5 last:pr-5 sm:px-4 sm:py-4 sm:first:pl-7 sm:last:pr-7 ${
                        label
                          ? "max-w-[9rem] text-left font-medium text-white/[0.94] sm:max-w-[13rem]"
                          : "text-center font-medium tabular-nums tracking-tight text-white/[0.86]"
                      }`}
                    >
                      {label ? (
                        <span className="block truncate">{formatCell(cell)}</span>
                      ) : (
                        formatCell(cell)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
