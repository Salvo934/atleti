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
      "Indice atleti: un JSON in src/data/athletes/ per ogni scheda. Stile ibrido Apple + Nike, mobile first.",
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgb(var(--accent-rgb)/0.14),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_100%,rgb(var(--accent-blue-rgb)/0.06),transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <header className="max-w-2xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent-blue)]">
            Next.js · JSON-driven
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-[1.02] tracking-[0.03em] text-[var(--foreground)] sm:text-5xl sm:tracking-[0.04em]">
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
            . Il preset (Atleti, Performance, Apple, Nike) si imposta nel JSON.
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
                    className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.85)] transition hover:border-accent/25 hover:bg-white/[0.05]"
                  >
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                      {themeLabel(preset)}
                    </span>
                    <span className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide text-[var(--foreground)] group-hover:text-accent">
                      {data.header.name}
                    </span>
                    <span className="mt-1 font-mono text-sm tabular-nums text-[var(--foreground)]/50">
                      #{data.header.number} · /{slug}
                    </span>
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
