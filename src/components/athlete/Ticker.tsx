type Props = {
  messages: string[];
};

export function Ticker({ messages }: Props) {
  const line = messages.join("   ·   ");
  return (
    <div
      className="ticker-surface relative border-y border-white/[0.07]"
      role="region"
      aria-label="Banner motivazionale scorrevole"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent" />
      <div className="relative overflow-hidden py-3.5">
        <div className="animate-marquee flex whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
          <span className="pr-20">{line}</span>
          <span className="pr-20" aria-hidden>
            {line}
          </span>
        </div>
      </div>
    </div>
  );
}
