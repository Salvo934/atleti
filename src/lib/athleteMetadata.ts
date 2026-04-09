import type { Metadata } from "next";
import type { AthleteData } from "@/types/athlete";

/** metadataBase, canonical e Open Graph URL da \`site.canonicalUrl\` nel JSON. */
export function resolveAthleteSiteMetadata(data: AthleteData): Partial<Metadata> {
  const raw = data.site?.canonicalUrl?.trim();
  if (!raw) return {};
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return {};
    return {
      metadataBase: url,
      alternates: { canonical: raw },
      openGraph: { url: raw },
    };
  } catch {
    return {};
  }
}
