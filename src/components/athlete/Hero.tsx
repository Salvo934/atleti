import Image from "next/image";
import type { Cta, HeroConfig } from "@/types/athlete";

type Props = {
  hero: HeroConfig;
  primaryCta: Cta | null;
  secondaryCta: Cta | null;
  spaciousBottom?: boolean;
};

/** Altezza minima garantita + adattamento viewport (stesso layout per ogni atleta) */
const heroMinH =
  "min-h-[max(28rem,calc(100svh-4rem))] supports-[min-height:100dvh]:min-h-[max(28rem,calc(100dvh-4rem))]";

export function Hero({ hero, primaryCta, secondaryCta, spaciousBottom }: Props) {
  const { media } = hero;
  const bottomPad = spaciousBottom
    ? "pb-12 sm:pb-16 lg:pb-20"
    : "pb-6 sm:pb-10";

  return (
    <section
      className={`relative flex ${heroMinH} flex-col overflow-x-hidden ${bottomPad}`}
    >
      <div className={`absolute inset-0 -z-0 ${heroMinH}`}>
        {media.type === "image" ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            className="object-cover object-center sm:object-[center_30%]"
            sizes="100vw"
            priority
            quality={75}
            fetchPriority="high"
          />
        ) : (
          <video
            className="h-full w-full object-cover object-center"
            src={media.src}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        {/* Leggibilità testo su qualsiasi foto */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_30%,transparent_18%,rgba(5,5,8,0.92)_72%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/88 via-[40%] to-[var(--background)]/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--background)]/92 from-0% via-transparent via-55% to-[var(--background)]/45"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_20%,rgb(var(--accent-blue-rgb)/0.07),transparent_55%)]"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-[10%] right-0 max-w-[min(100%,100vw)] select-none overflow-hidden pr-1 sm:bottom-[8%] sm:pr-3 md:bottom-[6%]"
        aria-hidden
      >
        <span className="block translate-x-1 font-display text-[clamp(3rem,18vw,11rem)] font-bold leading-none text-white/[0.08] tabular-nums">
          {hero.number}
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-2 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="relative mx-auto w-full max-w-2xl text-center lg:mx-0 lg:max-w-[min(100%,36rem)] lg:pl-8 lg:text-left">
          <div
            className="pointer-events-none absolute -left-1 top-2 bottom-2 hidden w-px rounded-full bg-gradient-to-b from-[rgb(var(--accent-rgb))] to-[rgb(var(--accent-blue-rgb))] opacity-95 sm:-left-0 lg:block"
            aria-hidden
          />
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-accent sm:text-xs">
            {hero.tagline}
          </p>

          <h1 className="mt-4 text-balance break-words font-display text-[clamp(1.9rem,6.8vw,3.85rem)] font-semibold uppercase leading-[0.98] tracking-[0.04em] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)] sm:mt-5">
            {hero.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 lg:justify-start">
            <span className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-white/16 bg-black/40 px-3.5 py-1.5 font-mono text-sm tabular-nums text-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-black/25">
              <span className="text-accent">#</span>
              {hero.number}
            </span>
            <span className="hidden h-4 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
            <p className="min-w-0 max-w-xl text-balance text-base leading-snug text-white/88 sm:text-lg sm:leading-relaxed">
              {hero.subtitle}
            </p>
          </div>

          <p className="mt-3 text-sm text-white/52">{hero.roleLine}</p>

          {primaryCta || secondaryCta ? (
            <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
              {primaryCta ? (
                <a
                  href={primaryCta.href}
                  className="inline-flex min-h-12 w-full min-w-0 shrink-0 items-center justify-center rounded-full bg-accent px-6 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a] shadow-[0_8px_36px_-10px_rgb(var(--accent-rgb)/0.55)] transition active:scale-[0.99] hover:bg-[var(--accent-hover)] sm:w-auto sm:min-w-44 sm:px-7 sm:text-[0.68rem]"
                >
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a
                  href={secondaryCta.href}
                  className="inline-flex min-h-12 w-full min-w-0 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-6 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition hover:border-[rgb(var(--accent-blue-rgb)/0.45)] hover:bg-[rgb(var(--accent-blue-rgb)/0.08)] hover:text-[var(--foreground)] sm:w-auto sm:min-w-44 sm:px-7 sm:text-[0.68rem]"
                >
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
