import type { SocialLink } from "@/types/athlete";

type PlatformKey =
  | "instagram"
  | "tiktok"
  | "facebook"
  | "youtube"
  | "twitter"
  | "linkedin"
  | "default";

function detectPlatform(platform: string): PlatformKey {
  const p = platform.toLowerCase();
  if (p.includes("instagram")) return "instagram";
  if (p.includes("tiktok")) return "tiktok";
  if (p.includes("facebook")) return "facebook";
  if (p.includes("youtube")) return "youtube";
  if (p.includes("twitter") || p === "x") return "twitter";
  if (p.includes("linkedin")) return "linkedin";
  return "default";
}

const themes: Record<
  PlatformKey,
  {
    label: string;
    iconBg: string;
    iconFg: string;
    cardHover: string;
    topBar: string;
  }
> = {
  instagram: {
    label: "Instagram",
    iconBg:
      "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-[0_8px_32px_-6px_rgba(225,48,108,0.55)]",
    iconFg: "text-white",
    cardHover:
      "hover:border-[#e1306c]/40 hover:shadow-[0_24px_60px_-20px_rgba(225,48,108,0.35)]",
    topBar: "from-[#f09433]/90 via-[#dc2743]/80 to-[#bc1888]/90",
  },
  tiktok: {
    label: "TikTok",
    iconBg:
      "bg-[#0f0f0f] shadow-[0_8px_32px_-6px_rgba(105,201,208,0.45)] ring-1 ring-white/10",
    iconFg: "text-[#69c9d0]",
    cardHover:
      "hover:border-[#69c9d0]/35 hover:shadow-[0_24px_60px_-20px_rgba(105,201,208,0.25)]",
    topBar: "from-[#69c9d0]/80 via-[#ee1d52]/70 to-[#0f0f0f]",
  },
  facebook: {
    label: "Facebook",
    iconBg: "bg-[#1877f2] shadow-[0_8px_32px_-6px_rgba(24,119,242,0.55)]",
    iconFg: "text-white",
    cardHover:
      "hover:border-[#1877f2]/45 hover:shadow-[0_24px_60px_-20px_rgba(24,119,242,0.3)]",
    topBar: "from-[#1877f2] to-[#0a5dc2]",
  },
  youtube: {
    label: "YouTube",
    iconBg: "bg-[#ff0000] shadow-[0_8px_32px_-6px_rgba(255,0,0,0.45)]",
    iconFg: "text-white",
    cardHover:
      "hover:border-red-500/40 hover:shadow-[0_24px_60px_-20px_rgba(255,0,0,0.25)]",
    topBar: "from-[#ff0000] to-[#cc0000]",
  },
  twitter: {
    label: "X / Twitter",
    iconBg: "bg-zinc-900 shadow-[0_8px_32px_-6px_rgba(255,255,255,0.15)] ring-1 ring-white/15",
    iconFg: "text-white",
    cardHover:
      "hover:border-white/25 hover:shadow-[0_24px_60px_-20px_rgba(255,255,255,0.12)]",
    topBar: "from-zinc-700 to-zinc-900",
  },
  linkedin: {
    label: "LinkedIn",
    iconBg: "bg-[#0a66c2] shadow-[0_8px_32px_-6px_rgba(10,102,194,0.5)]",
    iconFg: "text-white",
    cardHover:
      "hover:border-[#0a66c2]/45 hover:shadow-[0_24px_60px_-20px_rgba(10,102,194,0.28)]",
    topBar: "from-[#0a66c2] to-[#084d94]",
  },
  default: {
    label: "Social",
    iconBg:
      "bg-gradient-to-br from-accent/90 to-[var(--accent-deep)] shadow-[0_8px_32px_-6px_rgb(var(--accent-rgb)/0.45)]",
    iconFg: "text-white",
    cardHover:
      "hover:border-accent/40 hover:shadow-[0_24px_60px_-20px_rgb(var(--accent-rgb)/0.28)]",
    topBar: "from-accent/90 to-[var(--accent-deep)]",
  },
};

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconTikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function PlatformIcon({ platform }: { platform: PlatformKey }) {
  const cn = "h-6 w-6";
  switch (platform) {
    case "instagram":
      return <IconInstagram className={cn} />;
    case "tiktok":
      return <IconTikTok className={cn} />;
    case "facebook":
      return <IconFacebook className={cn} />;
    case "youtube":
      return <IconYouTube className={cn} />;
    case "twitter":
      return <IconTwitter className={cn} />;
    case "linkedin":
      return <IconLinkedIn className={cn} />;
    default:
      return <IconLink className={cn} />;
  }
}

type Props = {
  links: SocialLink[];
};

export function SocialLinks({ links }: Props) {
  return (
    <div className="relative mt-14">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-600/20 to-transparent blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tl from-cyan-500/15 to-transparent blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[min(100%,48rem)] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden
      />

      <ul className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {links.map((link) => {
          const key = detectPlatform(link.platform);
          const t = themes[key];
          const ctaText = link.ctaLabel.replace(/\s*→\s*$/, "").trim();

          return (
            <li key={`${link.platform}-${link.handle}`}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-0 shadow-[0_4px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 ${t.cardHover}`}
              >
                <div
                  className={`h-1 w-full bg-gradient-to-r opacity-90 ${t.topBar}`}
                  aria-hidden
                />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${t.iconBg} ${t.iconFg}`}
                    >
                      <PlatformIcon platform={key} />
                    </div>
                    <span
                      className={`rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50 transition group-hover:border-white/20 group-hover:text-white/70`}
                    >
                      {link.platform}
                    </span>
                  </div>

                  <p className="mt-5 font-display text-2xl uppercase leading-none tracking-wide text-white">
                    {link.handle}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                    {link.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/35">
                      {t.label}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition group-hover:gap-3">
                      <span className="max-w-[10rem] truncate sm:max-w-none">{ctaText}</span>
                      <span
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-[#0a0a0a]"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
