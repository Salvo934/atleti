import type { AthleteData } from "@/types/athlete";
import type { SectionId } from "@/lib/athleteSections";
import {
  getNavForAthlete,
  getSectionShellClass,
  getVisibleSectionIds,
  resolveHeroCta,
} from "@/lib/athleteSections";
import { resolveThemePreset, themeRootClass } from "@/lib/theme";
import { summaryStatsGridClass } from "@/lib/adaptiveLayout";
import { DataTable } from "./DataTable";
import { Hero } from "./Hero";
import { IntroOverlay } from "./IntroOverlay";
import { SectionHeading } from "./SectionHeading";
import { SiteHeader } from "./SiteHeader";
import { ClubsTimeline } from "./ClubsTimeline";
import { PhotoGalleryStrip } from "./PhotoGalleryStrip";
import { StoryContent } from "./StoryContent";
import { SocialLinks } from "./SocialLinks";
import { Ticker } from "./Ticker";
import { VideoShelf } from "./VideoShelf";

type Props = {
  data: AthleteData;
};

export function AthleteView({ data }: Props) {
  const themePreset = resolveThemePreset(data);
  const themeClass = themeRootClass(themePreset);
  const nav = getNavForAthlete(data);
  const primaryCta = resolveHeroCta(data.hero.primaryCta, data);
  const secondaryCta = resolveHeroCta(data.hero.secondaryCta, data);

  const visibleIds = getVisibleSectionIds(data);
  const indexById = new Map<SectionId, number>(
    visibleIds.map((id, i) => [id, i]),
  );
  const hasStats = (data.summaryStats?.length ?? 0) > 0;
  const hasTicker = (data.ticker?.messages?.length ?? 0) > 0;
  const hasMetaRibbon = hasStats || hasTicker;

  const shell = (id: SectionId) =>
    getSectionShellClass(id, indexById.get(id)!, { hasMetaRibbon });

  const statsEl =
    hasStats && data.summaryStats ? (
      <div
        className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${summaryStatsGridClass(data.summaryStats.length)}`}
      >
        {data.summaryStats.map((s) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-5 text-center shadow-inner shadow-black/30 transition hover:border-accent/25 hover:bg-white/[0.05]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgb(var(--accent-rgb) / 0.12), transparent 65%)",
              }}
            />
            <p className="relative font-mono text-2xl font-semibold tabular-nums text-white sm:text-3xl">
              {s.value}
            </p>
            <p className="relative mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    ) : null;

  const tickerEl =
    hasTicker && data.ticker ? (
      <Ticker messages={data.ticker.messages} />
    ) : null;

  const metaBlock =
    hasStats || hasTicker ? (
      <div className="border-b border-white/[0.06]">
        {statsEl}
        {tickerEl}
      </div>
    ) : (
      <>
        {statsEl}
        {tickerEl}
      </>
    );

  return (
    <div
      className={`body-gradient texture-grain flex min-h-screen flex-col font-sans text-white ${themeClass}`}
    >
      {data.intro ? (
        <IntroOverlay
          name={data.header.name}
          number={data.header.number}
          skipLabel={data.intro.skipLabel}
        />
      ) : null}

      <SiteHeader
        name={data.header.name}
        number={data.header.number}
        avatarUrl={data.header.avatarUrl}
        nav={nav}
      />

      <main className="flex flex-1 flex-col">
        <Hero
          hero={data.hero}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          spaciousBottom={visibleIds.length > 0 && !hasMetaRibbon}
        />

        {metaBlock}

        {data.highlights ? (
          <section id="highlights" className={shell("highlights")}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                sectionLabel={data.highlights.sectionLabel}
                title={data.highlights.title}
                subtitle={data.highlights.subtitle}
              />
              <div className="mt-14 space-y-10">
                <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] sm:p-9">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
                    {data.highlights.featuredTitle}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
                    {data.highlights.featuredDescription}
                  </p>
                </div>
                <VideoShelf
                  items={data.highlights.videos.map((v) => ({
                    title: v.title,
                    youtubeUrl: v.youtubeUrl,
                    caption: v.description,
                  }))}
                />
              </div>
            </div>
          </section>
        ) : null}

        {data.stats ? (
          <section id="stats" className={shell("stats")}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                variant="elegantDark"
                sectionLabel={data.stats.sectionLabel}
                title={data.stats.title}
                subtitle={data.stats.subtitle}
              />
              <div className="mt-16 space-y-12 sm:mt-20 sm:space-y-16">
                <DataTable
                  title={data.stats.lastGames.title}
                  columns={data.stats.lastGames.columns}
                  rows={data.stats.lastGames.rows}
                />
                <DataTable
                  title={data.stats.regularSeason.title}
                  columns={data.stats.regularSeason.columns}
                  rows={data.stats.regularSeason.rows}
                />
              </div>
            </div>
          </section>
        ) : null}

        {data.gallery && data.gallery.images.length > 0 ? (
          <section id="foto" className={shell("foto")}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                variant="elegantDark"
                sectionLabel={data.gallery.sectionLabel}
                title={data.gallery.title}
                subtitle={data.gallery.subtitle}
              />
              <PhotoGalleryStrip images={data.gallery.images} />
            </div>
          </section>
        ) : null}

        {data.story && data.story.paragraphs.length > 0 ? (
          <section id="storia" className={shell("storia")}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                sectionLabel={data.story.sectionLabel}
                title={data.story.title}
                subtitle={data.story.subtitle}
              />
              <StoryContent paragraphs={data.story.paragraphs} />
            </div>
          </section>
        ) : null}

        {data.clubs && data.clubs.clubs.length > 0 ? (
          <section id="club" className={shell("club")}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                variant="elegantDark"
                sectionLabel={data.clubs.sectionLabel}
                title={data.clubs.title}
                subtitle={data.clubs.subtitle}
              />
              <ClubsTimeline clubs={data.clubs.clubs} />
            </div>
          </section>
        ) : null}

        {data.interviews && data.interviews.interviews.length > 0 ? (
          <section id="interviste" className={shell("interviste")}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                sectionLabel={data.interviews.sectionLabel}
                title={data.interviews.title}
                subtitle={data.interviews.subtitle}
              />
              <div
                className={
                  data.interviews.interviews.length === 1
                    ? "mt-8 sm:mt-10"
                    : "mt-14"
                }
              >
                <VideoShelf
                  items={data.interviews.interviews.map((it) => ({
                    title: it.title,
                    youtubeUrl: it.youtubeUrl,
                    caption: it.subtitle,
                  }))}
                />
              </div>
            </div>
          </section>
        ) : null}

        {data.social && data.social.links.length > 0 ? (
          <section id="social" className={shell("social")}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgb(var(--accent-rgb)/0.07),transparent_65%)]" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                sectionLabel={data.social.sectionLabel}
                title={data.social.title}
                subtitle={data.social.subtitle}
              />
              <SocialLinks links={data.social.links} />
            </div>
          </section>
        ) : null}

        {data.shop ? (
          <section id="shop" className={shell("shop")}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                sectionLabel={data.shop.sectionLabel}
                title={data.shop.title}
                subtitle={data.shop.subtitle}
              />
              <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-center">
                <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-[2rem] border border-white/[0.1] bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent px-10 py-16 text-center shadow-[0_30px_80px_-40px_rgb(var(--accent-rgb)/0.25)] ring-1 ring-inset ring-white/[0.04]">
                  <p className="font-display text-8xl leading-none text-accent drop-shadow-[0_0_40px_rgb(var(--accent-rgb)/0.35)] sm:text-9xl">
                    {data.shop.numberOnJersey}
                  </p>
                  <p className="mt-5 font-display text-3xl uppercase tracking-[0.22em] text-white">
                    {data.shop.productName}
                  </p>
                  <p className="mt-6 font-mono text-2xl text-white/90">{data.shop.price}</p>
                  <ul className="mt-10 w-full max-w-sm space-y-3 text-left text-sm text-white/65">
                    {data.shop.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent-rgb)/0.6)]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="mt-12 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-white px-10 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a] shadow-[0_12px_40px_-12px_rgba(255,255,255,0.35)] transition hover:bg-white/90"
                  >
                    {data.shop.ctaLabel}
                  </button>
                  <p className="mt-5 text-xs text-white/40">{data.shop.disclaimer}</p>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="relative mt-auto overflow-hidden border-t border-white/[0.07] bg-[#030305]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgb(var(--accent-rgb)/0.09),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <p className="font-display text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl">
                {data.header.name}
              </p>
              <p className="mt-2 font-mono text-sm tabular-nums text-accent">
                #{data.header.number}
              </p>
              {data.footer?.legalNote ? (
                <p className="mt-6 text-sm leading-relaxed text-white/45">
                  {data.footer.legalNote}
                </p>
              ) : null}
            </div>

            {(data.footer?.instagramUrl || data.footer?.facebookUrl) ? (
              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
                {data.footer?.instagramUrl ? (
                  <a
                    href={data.footer.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-medium text-white/85 shadow-inner shadow-black/20 transition hover:border-accent/35 hover:bg-accent/10 hover:text-accent"
                  >
                    <span className="text-[0.7rem] uppercase tracking-wider">Instagram</span>
                  </a>
                ) : null}
                {data.footer?.facebookUrl ? (
                  <a
                    href={data.footer.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-medium text-white/85 shadow-inner shadow-black/20 transition hover:border-accent/35 hover:bg-accent/10 hover:text-accent"
                  >
                    <span className="text-[0.7rem] uppercase tracking-wider">Facebook</span>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-12 border-t border-white/10 pt-10">
            <p className="text-center text-sm leading-relaxed text-white/45 sm:text-left">
              <span className="text-white/55">Realizzato da </span>
              <a
                href="https://katahero.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-accent transition hover:text-accent/85 hover:underline"
              >
                Katahero.com
              </a>
              <span className="text-white/35"> — piattaforma per siti atleti e team.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
