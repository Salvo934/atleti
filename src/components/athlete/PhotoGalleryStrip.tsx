"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export type GalleryImage = { src: string; alt: string };

type Props = {
  images: GalleryImage[];
};

/** Card immagine stile Apple: nero elegante, bordo sottile, angoli generosi */
function PhotoFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.375rem] border border-white/[0.07] bg-[var(--surface-card)] shadow-[0_32px_80px_-52px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:rounded-[1.75rem] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        aria-hidden
      />
      {children}
    </div>
  );
}

export function PhotoGalleryStrip({ images }: Props) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    const img = images[0];
    return (
      <div className="mt-16 sm:mt-20">
        <PhotoFrame>
          <div className="relative aspect-4/3 w-full sm:aspect-16/10">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition duration-[640ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </PhotoFrame>
      </div>
    );
  }

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-mx-1 sm:mx-0">
        <div
          className="gallery-scroll-strip flex gap-4 overflow-x-auto pb-3 pt-0.5 sm:gap-5 md:gap-6 lg:gap-7"
          role="region"
          aria-label="Galleria foto"
        >
          {images.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="w-[min(86vw,19.5rem)] shrink-0 snap-start sm:w-[min(78vw,22rem)] lg:w-[min(72vw,24rem)]"
            >
              <PhotoFrame className="h-full transition-shadow duration-500 hover:shadow-[0_40px_100px_-48px_rgba(0,0,0,0.85)]">
                <div className="group relative aspect-3/2 w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-[700ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 640px) 86vw, 24rem"
                  />
                </div>
              </PhotoFrame>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
