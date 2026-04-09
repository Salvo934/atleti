import type { Metadata } from "next";
import Link from "next/link";
import { getAthleteBySlug, getAthleteSlugs } from "@/lib/loadAthlete";
import type { AthleteData } from "@/types/athlete";
import { resolveThemePreset } from "@/lib/theme";

export const dynamic = "force-static";

const baseTitle = "Atleti — siti ufficiali";

export function generateMetadata(): Metadata {
  return {
    title: baseTitle,
    description:
      "Indice atleti — JSON per scheda. Look Apple × street × basket 3×3, mobile first.",
  };
}

function themeLabel(preset: ReturnType<typeof resolveThemePreset>): string {
  switch (preset) {
    case "atleti":
      return "Atleti";
    case "apple":
      return "Apple";
    case "nike":
      return "Nike";
    case "performance":
      return "Performance";
    default:
      return "Atleti";
  }
}

export default function HomePage() {
  const slugs = getAthleteSlugs();
  const athletes: { slug: string; data: AthleteData }[] = [];
  for (const slug of slugs) {
    const data = getAthleteBySlug(slug);
    if (data) athletes.push({ slug, data });
  }

  return (
    <div className="texture-grain min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_100%_85%_at_50%_-20%,rgb(var(--accent-rgb)/0.16),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_55%_at_100%_100%,rgb(var(--accent-blue-rgb)/0.08),transparent_45%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_90%,rgb(var(--accent-lime-rgb)/0.04),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <header className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[rgb(var(--accent-lime-rgb)/0.35)] bg-black/45 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-lime)]">
              3×3
            </span>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent-blue)]">
              Next.js · JSON
            </p>
          </div>
          <h1 className="mt-5 font-display text-5xl font-normal uppercase leading-[0.95] tracking-[0.02em] text-[var(--foreground)] sm:text-6xl sm:tracking-[0.03em]">
            Atleti
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--foreground)]/58 sm:text-lg">
            Un&apos;unica codebase: aggiungi un file in{" "}
            <code className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-[var(--foreground)]/85">
              src/data/athletes/
            </code>{" "}
            e la pagina è su{" "}
            <code className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-[var(--foreground)]/85">
              /[slug]
            </code>
            . Il preset (Atleti, Performance, Apple, Nike) si imposta nel JSON. Con{" "}
            <code className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-[var(--foreground)]/85">
              site
            </code>{" "}
            colleghi il sottodominio su Katahero (es.{" "}
            <span className="font-mono text-[var(--foreground)]/70">matteorizzi.katahero.com</span>) e
            l&apos;URL canonico.
          </p>
        </header>

        {athletes.length === 0 ? (
          <p className="mt-16 text-sm text-[var(--foreground)]/45">
            Nessun atleta in{" "}
            <span className="font-mono text-[var(--foreground)]/65">src/data/athletes/*.json</span>.
          </p>
        ) : (
          <ul className="mt-16 grid gap-4 sm:grid-cols-2">
            {athletes.map(({ slug, data }) => {
              const preset = resolveThemePreset(data);
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgb(var(--accent-lime-rgb)/0.08),0_28px_90px_-50px_rgba(0,0,0,0.9)] transition hover:border-[rgb(var(--accent-lime-rgb)/0.25)] hover:bg-white/[0.055] hover:shadow-[0_0_0_1px_rgb(var(--accent-lime-rgb)/0.2),0_32px_100px_-48px_rgb(var(--accent-rgb)/0.25)]"
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent-rgb)/0.4)] to-transparent opacity-80"
                      aria-hidden
                    />
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                      {themeLabel(preset)}
                    </span>
                    <span className="mt-3 font-display text-2xl font-normal uppercase tracking-wide text-[var(--foreground)] group-hover:text-accent">
                      {data.header.name}
                    </span>
                    <span className="mt-1 font-mono text-sm tabular-nums text-[var(--foreground)]/50">
                      #{data.header.number} · /{slug}
                    </span>
                    {data.site?.canonicalUrl ? (
                      <span className="mt-3 line-clamp-2 break-all text-xs text-[var(--foreground)]/40">
                        {data.site.canonicalUrl}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
