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
      <div className={`absolute inset-0 z-0 ${heroMinH}`}>
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
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_28%,transparent_15%,rgba(7,7,8,0.94)_74%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 via-[38%] to-[var(--background)]/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--background)]/92 from-0% via-transparent via-52% to-[var(--background)]/50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_18%,rgb(var(--accent-blue-rgb)/0.09),transparent_55%)]"
          aria-hidden
        />
        {/* Linea “campo” street */}
        <div
          className="pointer-events-none absolute bottom-[32%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent-lime-rgb)/0.35)] to-transparent opacity-70 sm:bottom-[30%]"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-[10%] right-0 z-0 max-w-[min(100%,100vw)] select-none overflow-hidden pr-1 sm:bottom-[8%] sm:pr-3 md:bottom-[6%]"
        aria-hidden
      >
        <span className="block translate-x-1 font-display text-[clamp(3rem,18vw,11rem)] font-normal leading-none text-[rgb(var(--accent-lime-rgb)/0.09)] tabular-nums">
          {hero.number}
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-2 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="relative mx-auto w-full max-w-2xl text-center lg:mx-0 lg:max-w-[min(100%,38rem)] lg:pl-8 lg:text-left">
          <div
            className="pointer-events-none absolute -left-1 top-2 bottom-2 hidden w-0.5 rounded-full bg-gradient-to-b from-[rgb(var(--accent-rgb))] via-[rgb(var(--accent-lime-rgb)/0.85)] to-[rgb(var(--accent-blue-rgb))] opacity-90 sm:-left-0 lg:block"
            aria-hidden
          />

          <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-accent sm:text-xs">
            {hero.tagline}
          </p>

          <h1 className="mt-3 text-balance break-words font-display text-[clamp(2.25rem,8vw,4.5rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.65)] sm:mt-4">
            {hero.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:mt-6 lg:justify-start">
            <span className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-white/18 bg-black/40 px-3.5 py-1.5 font-mono text-sm tabular-nums text-white/95 shadow-[0_0_0_1px_rgb(var(--accent-lime-rgb)/0.2)] backdrop-blur-md supports-[backdrop-filter]:bg-black/25">
              <span className="text-accent">#</span>
              {hero.number}
            </span>
            <span className="hidden h-4 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
            <p className="min-w-0 max-w-xl text-balance text-base leading-snug text-white/85 sm:text-lg sm:leading-relaxed">
              {hero.subtitle}
            </p>
          </div>

          <p className="mt-3 text-sm text-white/48">{hero.roleLine}</p>

          {primaryCta || secondaryCta ? (
            <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
              {primaryCta ? (
                <a
                  href={primaryCta.href}
                  className="inline-flex min-h-12 w-full min-w-0 shrink-0 items-center justify-center rounded-full bg-accent px-7 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a] shadow-[0_0_0_1px_rgb(var(--accent-lime-rgb)/0.35),0_12px_40px_-12px_rgb(var(--accent-rgb)/0.65)] transition active:scale-[0.99] hover:bg-[var(--accent-hover)] sm:w-auto sm:min-w-44 sm:text-[0.68rem]"
                >
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a
                  href={secondaryCta.href}
                  className="inline-flex min-h-12 w-full min-w-0 shrink-0 items-center justify-center rounded-full border border-white/22 bg-white/[0.07] px-7 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-[rgb(var(--accent-lime-rgb)/0.5)] hover:bg-[rgb(var(--accent-lime-rgb)/0.08)] hover:text-white sm:w-auto sm:min-w-44 sm:text-[0.68rem]"
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
