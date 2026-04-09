import type { AthleteData, Cta, NavItem } from "@/types/athlete";

/** ID usati negli anchor HTML (`id="foto"` per la gallery) */
export type SectionId =
  | "highlights"
  | "stats"
  | "foto"
  | "storia"
  | "club"
  | "interviste"
  | "social"
  | "shop";

const NAV_LABELS: Record<SectionId, string> = {
  highlights: "Highlights",
  stats: "Statistiche",
  foto: "Foto",
  storia: "Storia",
  club: "Club",
  interviste: "Interviste",
  social: "Social",
  shop: "Shop",
};

const SECTION_ORDER: SectionId[] = [
  "highlights",
  "stats",
  "foto",
  "storia",
  "club",
  "interviste",
  "social",
  "shop",
];

const HASH_TO_SECTION: Record<string, SectionId> = {
  highlights: "highlights",
  stats: "stats",
  foto: "foto",
  storia: "storia",
  club: "club",
  interviste: "interviste",
  social: "social",
  shop: "shop",
};

function isKnownSectionId(id: string): id is SectionId {
  return id in NAV_LABELS;
}

/** True se la sezione è presente nel JSON e ha contenuto sufficiente da mostrare. */
export function isSectionVisible(data: AthleteData, id: SectionId): boolean {
  switch (id) {
    case "highlights":
      return data.highlights != null;
    case "stats":
      return data.stats != null;
    case "foto":
      return (data.gallery?.images?.length ?? 0) > 0;
    case "storia":
      return (data.story?.paragraphs?.length ?? 0) > 0;
    case "club":
      return (data.clubs?.clubs?.length ?? 0) > 0;
    case "interviste":
      return (data.interviews?.interviews?.length ?? 0) > 0;
    case "social":
      return (data.social?.links?.length ?? 0) > 0;
    case "shop":
      return data.shop != null;
    default:
      return false;
  }
}

/** Ordine delle sezioni di contenuto effettivamente visibili (stesso ordine del menu). */
export function getVisibleSectionIds(data: AthleteData): SectionId[] {
  return SECTION_ORDER.filter((id) => isSectionVisible(data, id));
}

/** Menu principale: solo sezioni effettivamente presenti. Ordine fisso. */
export function buildNavItems(data: AthleteData): NavItem[] {
  return getVisibleSectionIds(data).map((id) => ({
    id,
    label: NAV_LABELS[id],
  }));
}

/**
 * Se in JSON c'è `nav`, si usano etichette/ordine personalizzati ma solo per sezioni visibili.
 * Voci che puntano a sezioni assenti vengono scartate.
 */
export function getNavForAthlete(data: AthleteData): NavItem[] {
  if (data.nav?.length) {
    const seen = new Set<string>();
    const out: NavItem[] = [];
    for (const item of data.nav) {
      if (seen.has(item.id)) continue;
      if (!isKnownSectionId(item.id)) continue;
      if (!isSectionVisible(data, item.id)) continue;
      seen.add(item.id);
      out.push(item);
    }
    return out;
  }
  return buildNavItems(data);
}

/**
 * Classi per il wrapper `<section>`: ritmo visivo che segue l’ordine reale delle sezioni,
 * senza “buchi” quando qualcosa manca nel JSON.
 */
export function getSectionShellClass(
  id: SectionId,
  index: number,
  options: { hasMetaRibbon: boolean },
): string {
  const { hasMetaRibbon } = options;
  const isFirst = index === 0;
  const base = "scroll-mt-28 py-16 sm:scroll-mt-32 sm:py-24 lg:py-28";
  const borderTop =
    isFirst && hasMetaRibbon ? "border-t-0" : "border-t border-white/[0.06]";

  /** Più aria sopra Highlights (dalla hero / dal ribbon) senza cambiare il ritmo sotto */
  if (id === "highlights") {
    const band = index % 2 === 1 ? "bg-black/[0.12]" : "";
    return [
      "scroll-mt-28 pt-24 pb-16 sm:scroll-mt-32 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28",
      borderTop,
      band,
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (id === "stats") {
    return [
      base,
      borderTop,
      "bg-gradient-to-b from-[#000000] via-[#050505] to-[#000000]",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (id === "foto") {
    return [
      base,
      borderTop,
      "bg-gradient-to-b from-[#010101] via-[#080808] to-[#010101]",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (id === "club") {
    return [
      base,
      borderTop,
      "bg-gradient-to-b from-[#000000] via-[#070707] to-[#000000]",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (id === "social") {
    return [
      base,
      borderTop,
      "relative overflow-hidden bg-gradient-to-b from-[#08080c]/80 via-transparent to-[#08080c]/40",
    ].join(" ");
  }

  if (id === "shop") {
    return [
      base,
      borderTop,
      "bg-gradient-to-b from-transparent to-black/30 sm:pb-28 sm:pt-20",
    ].join(" ");
  }

  const band = index % 2 === 1 ? "bg-black/[0.12]" : "";
  return [base, borderTop, band].filter(Boolean).join(" ");
}

/** CTA hero: nascosta se l'href è `#sezione` e quella sezione non c'è. Link esterni sempre ok. */
export function resolveHeroCta(cta: Cta, data: AthleteData): Cta | null {
  const href = cta.href.trim();
  if (!href.startsWith("#")) return cta;
  const hash = href.slice(1);
  if (hash === "" || hash === "top") return cta;
  const section = HASH_TO_SECTION[hash];
  if (section === undefined) return cta;
  return isSectionVisible(data, section) ? cta : null;
}
