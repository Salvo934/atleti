"use client";

import Image from "next/image";
import { useState } from "react";
import { youtubeEmbedUrl, youtubeThumbnailUrl } from "@/lib/youtube";

export type VideoShelfItem = {
  title: string;
  youtubeUrl: string;
  /** Testo sotto il player (es. descrizione highlight o sottotitolo intervista) */
  caption?: string;
};

type Props = {
  items: VideoShelfItem[];
};

export function VideoShelf({ items }: Props) {
  const [active, setActive] = useState(0);

  if (items.length === 0) return null;

  const current = items[active];
  const embed = youtubeEmbedUrl(current.youtubeUrl);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
      <div className="min-w-0 flex-1">
        <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-black shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.06]">
          {embed ? (
            <div className="aspect-video w-full">
              <iframe
                key={current.youtubeUrl}
                title={current.title}
                src={`${embed}?rel=0`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-[#0a0a0d] text-sm text-white/45">
              Video non disponibile
            </div>
          )}
        </div>
        <div className="mt-4 sm:mt-5">
          <h4 className="font-display text-lg uppercase tracking-wide text-white sm:text-xl">
            {current.title}
          </h4>
          {current.caption ? (
            <p className="mt-2 text-sm leading-relaxed text-white/55">{current.caption}</p>
          ) : null}
          <a
            href={current.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-accent/85"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs">
              ▶
            </span>
            Apri su YouTube
          </a>
        </div>
      </div>

      {items.length > 1 ? (
        <div
          className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1 max-lg:[-ms-overflow-style:none] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden lg:max-h-[min(70vh,28rem)] lg:w-52 lg:flex-shrink-0 lg:flex-col lg:gap-3 lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0"
          role="tablist"
          aria-label="Seleziona video"
        >
          {items.map((item, i) => {
            const thumb = youtubeThumbnailUrl(item.youtubeUrl);
            const isActive = i === active;
            return (
              <button
                key={`${item.youtubeUrl}-${i}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`group relative flex w-[42%] shrink-0 flex-col overflow-hidden rounded-xl text-left ring-2 transition sm:w-[38%] lg:w-full ${
                  isActive
                    ? "ring-accent shadow-[0_0_24px_-6px_rgb(var(--accent-rgb)/0.45)]"
                    : "ring-white/10 opacity-[0.72] hover:opacity-100"
                }`}
              >
                <div className="relative aspect-video w-full bg-[#111]">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={item.title}
                      fill
                      className={`object-cover transition ${isActive ? "" : "group-hover:brightness-110"}`}
                      sizes="(max-width: 1024px) 40vw, 208px"
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/35 transition ${
                      isActive ? "bg-accent/15" : ""
                    }`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-sm text-white shadow-lg">
                      ▶
                    </span>
                  </div>
                  <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 font-mono text-[0.6rem] text-white/90">
                    {i + 1}/{items.length}
                  </span>
                </div>
                <span
                  className={`line-clamp-2 px-2 py-2 text-[0.7rem] font-medium leading-snug sm:text-xs ${
                    isActive ? "text-white" : "text-white/65"
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
