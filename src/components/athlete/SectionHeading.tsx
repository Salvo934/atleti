type Props = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  /** Intestazione più sobria su fondo scuro (es. statistiche) */
  variant?: "default" | "elegantDark";
};

export function SectionHeading({
  sectionLabel,
  title,
  subtitle,
  variant = "default",
}: Props) {
  const isElegant = variant === "elegantDark";

  return (
    <div
      className={
        isElegant
          ? "flex flex-col gap-8 border-l border-white/10 pl-6 sm:flex-row sm:items-start sm:gap-14 sm:border-l-0 sm:pl-0"
          : "flex flex-col gap-8 border-l-2 border-[rgb(var(--accent-lime-rgb)/0.45)] pl-6 sm:flex-row sm:items-start sm:gap-14 sm:border-l-0 sm:pl-0"
      }
    >
      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
        <span
          className={
            isElegant
              ? "inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-medium text-white/75"
              : "inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-2xl border border-[rgb(var(--accent-rgb)/0.4)] bg-[rgb(var(--accent-rgb)/0.12)] font-mono text-sm font-semibold text-accent shadow-[0_0_32px_-8px_rgb(var(--accent-rgb)/0.45)]"
          }
        >
          {sectionLabel}
        </span>
        <span
          className={
            isElegant
              ? "hidden h-px w-10 bg-gradient-to-r from-white/25 to-transparent sm:block"
              : "hidden h-px w-12 bg-gradient-to-r from-[rgb(var(--accent-lime-rgb)/0.6)] to-transparent sm:block"
          }
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1">
        <h2
          className={
            isElegant
              ? "font-display text-[clamp(1.85rem,4vw,3rem)] font-normal uppercase leading-[1.05] tracking-[0.03em] text-white/95"
              : "font-display text-[clamp(2rem,4.5vw,3.35rem)] font-normal uppercase leading-[0.98] tracking-[0.03em] text-white"
          }
        >
          {title}
        </h2>
        <p
          className={
            isElegant
              ? "mt-5 max-w-2xl text-sm leading-relaxed text-white/42 sm:text-base sm:leading-relaxed"
              : "mt-4 max-w-2xl text-sm leading-relaxed text-white/52 sm:text-base"
          }
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
