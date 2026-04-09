"use client";

import { useCallback, useState } from "react";

type Props = {
  name: string;
  number: number;
  skipLabel: string;
};

export function IntroOverlay({ name, number, skipLabel }: Props) {
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => setVisible(false), []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col bg-[var(--background)] text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgb(var(--accent-rgb)/0.18),transparent_55%)]"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col p-6 sm:p-10 lg:p-14">
        <p className="max-w-[min(90vw,44rem)] font-display text-3xl font-bold uppercase leading-tight tracking-[0.1em] drop-shadow-[0_0_40px_rgb(var(--accent-rgb)/0.25)] sm:text-5xl lg:text-6xl">
          {name}{" "}
          <span className="text-accent">#{number}</span>
        </p>
        <div className="flex flex-1 items-end justify-end pb-2">
          <button
            type="button"
            onClick={dismiss}
            className="border border-white/25 bg-white/[0.03] px-8 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-sm transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
          >
            {skipLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
