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
          : "flex flex-col gap-8 border-l-2 border-accent/40 pl-6 sm:flex-row sm:items-start sm:gap-14 sm:border-l-0 sm:pl-0"
      }
    >
      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
        <span
          className={
            isElegant
              ? "inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] font-mono text-sm font-medium text-white/75"
              : "inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 font-mono text-sm font-semibold text-accent shadow-[0_0_24px_-6px_rgb(var(--accent-rgb)/0.4)]"
          }
        >
          {sectionLabel}
        </span>
        <span
          className={
            isElegant
              ? "hidden h-px w-10 bg-gradient-to-r from-white/25 to-transparent sm:block"
              : "hidden h-px w-8 bg-gradient-to-r from-accent/50 to-transparent sm:block"
          }
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1">
        <h2
          className={
            isElegant
              ? "font-display text-[clamp(1.85rem,4vw,3rem)] font-medium uppercase leading-[1.05] tracking-[0.04em] text-white/95"
              : "font-display text-[clamp(2rem,4.5vw,3.25rem)] uppercase leading-none tracking-[0.02em] text-white"
          }
        >
          {title}
        </h2>
        <p
          className={
            isElegant
              ? "mt-5 max-w-2xl text-sm leading-relaxed text-white/42 sm:text-base sm:leading-relaxed"
              : "mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base"
          }
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
