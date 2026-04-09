import type { ClubEntry } from "@/types/athlete";
import { ClubLogoMark } from "./ClubLogoMark";

type Props = {
  clubs: ClubEntry[];
};

export function ClubsTimeline({ clubs }: Props) {
  if (clubs.length === 0) return null;

  return (
    <div className="relative mt-16 sm:mt-20">
      {/* Linea temporale */}
      <div
        className="pointer-events-none absolute left-[1.125rem] top-4 bottom-4 w-px bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.02] sm:left-[1.375rem]"
        aria-hidden
      />

      <ul className="relative space-y-12 sm:space-y-14">
        {clubs.map((c, i) => {
          return (
            <li key={`${c.team}-${i}`} className="relative flex gap-4 sm:gap-6">
              <div className="relative z-10 flex shrink-0 items-start justify-center pt-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#0a0a0a] font-mono text-[0.65rem] font-medium tabular-nums text-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:h-10 sm:w-10 sm:text-[0.7rem]">
                  {i + 1}
                </div>
              </div>

              <article className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--surface-card)] shadow-[0_32px_80px_-52px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-white/[0.12] hover:shadow-[0_36px_90px_-52px_rgba(0,0,0,0.85)] sm:rounded-3xl">
                <div className="relative px-4 py-5 sm:px-6 sm:py-6">
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
                    aria-hidden
                  />

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                    <ClubLogoMark team={c.team} logo={c.logo} />

                    <div className="min-w-0 flex-1">
                      {c.years || c.league ? (
                        <div className="flex flex-wrap gap-2">
                          {c.years ? (
                            <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/55">
                              {c.years}
                            </span>
                          ) : null}
                          {c.league ? (
                            <span className="rounded-full border border-white/[0.08] bg-transparent px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/40">
                              {c.league}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                      <h3
                        className={`font-display text-xl font-medium uppercase leading-snug tracking-[0.04em] text-white/[0.96] sm:text-2xl ${
                          c.years || c.league ? "mt-4" : ""
                        }`}
                      >
                        {c.team}
                      </h3>
                      {c.description ? (
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/42 sm:mt-4 sm:text-base sm:leading-relaxed">
                          {c.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
