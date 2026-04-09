/** Stile visivo del sito: un solo codice, preset scelto nel JSON atleta. */
export type ThemePreset = "atleti" | "performance" | "apple" | "nike";

export type AthleteMeta = {
  title: string;
  description?: string;
};

export type IntroConfig = {
  skipLabel: string;
};

export type MediaBlock =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt?: string };

export type Cta = {
  label: string;
  href: string;
};

export type HeroConfig = {
  tagline: string;
  name: string;
  number: number;
  subtitle: string;
  roleLine: string;
  media: MediaBlock;
  primaryCta: Cta;
  secondaryCta: Cta;
};

export type TickerConfig = {
  messages: string[];
};

export type SummaryStat = {
  label: string;
  value: string;
};

export type HighlightVideo = {
  title: string;
  description?: string;
  youtubeUrl: string;
};

export type HighlightsSection = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  featuredTitle: string;
  featuredDescription: string;
  videos: HighlightVideo[];
};

export type TableSection = {
  title: string;
  columns: string[];
  rows: (string | number)[][];
};

export type StatsSection = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  lastGames: TableSection;
  regularSeason: TableSection;
};

export type GallerySection = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  images: { src: string; alt: string }[];
};

export type StorySection = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
};

export type ClubEntry = {
  team: string;
  years?: string;
  league?: string;
  /** Percorso in `public/` (es. `/clubs/nome.png`) o URL `https://…`. Se assente o file non trovato: monogramma. */
  logo?: string;
  description?: string;
};

export type ClubsSection = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  clubs: ClubEntry[];
};

export type InterviewEntry = {
  title: string;
  subtitle: string;
  youtubeUrl: string;
};

export type InterviewsSection = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  interviews: InterviewEntry[];
};

export type SocialLink = {
  platform: string;
  handle: string;
  description: string;
  url: string;
  ctaLabel: string;
};

export type SocialSection = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  links: SocialLink[];
};

export type ShopSection = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  productName: string;
  numberOnJersey: string;
  price: string;
  features: string[];
  disclaimer: string;
  ctaLabel: string;
};

export type NavItem = {
  id: string;
  label: string;
};

export type AthleteData = {
  slug: string;
  meta: AthleteMeta;
  /** Omesso = `atleti` (ibrido Apple + Nike: tipografia pulita, accent energico). */
  theme?: {
    preset: ThemePreset;
  };
  /** Omesso = nessuna schermata intro */
  intro?: IntroConfig;
  header: {
    avatarUrl: string;
    name: string;
    number: number;
  };
  hero: HeroConfig;
  /** Omesso = niente ticker */
  ticker?: TickerConfig;
  /** Omesso = niente riquadri statistiche sotto l'hero */
  summaryStats?: SummaryStat[];
  /**
   * Opzionale: ordine ed etichette menu. Solo voci verso sezioni presenti vengono mostrate.
   * Se omesso, il menu si costruisce da solo dalle sezioni definite sotto.
   */
  nav?: NavItem[];
  /** Ogni blocco sotto è opzionale: ometti la chiave per nascondere l'intera sezione */
  highlights?: HighlightsSection;
  stats?: StatsSection;
  gallery?: GallerySection;
  story?: StorySection;
  clubs?: ClubsSection;
  interviews?: InterviewsSection;
  social?: SocialSection;
  shop?: ShopSection;
  footer?: {
    instagramUrl?: string;
    facebookUrl?: string;
    legalNote?: string;
  };
};
