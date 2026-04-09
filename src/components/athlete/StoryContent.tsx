type Props = {
  paragraphs: string[];
};

export function StoryContent({ paragraphs }: Props) {
  if (paragraphs.length === 0) return null;

  const [lead, ...body] = paragraphs;

  return (
    <div className="relative mt-14">
      <div
        className="pointer-events-none absolute -left-2 -top-6 select-none font-display text-[clamp(4rem,18vw,9rem)] leading-none text-accent/[0.08] sm:-left-4"
        aria-hidden
      >
        “
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-white/[0.06] via-[#0a0a0d]/80 to-[var(--background)] p-8 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:p-10 md:p-12">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-violet-500/[0.04] blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-prose">
          <p className="text-[1.05rem] font-medium leading-[1.85] text-white/88 sm:text-lg sm:leading-[1.9]">
            <span className="float-left mr-3 mt-1 font-display text-5xl leading-[0.85] text-accent sm:text-6xl md:text-7xl">
              {lead.trim().charAt(0)}
            </span>
            <span>{lead.trim().slice(1)}</span>
          </p>

          {body.length > 0 ? (
            <div className="mt-10 space-y-8 border-t border-white/[0.07] pt-10">
              {body.map((p, i) => (
                <p
                  key={i}
                  className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-4 text-sm leading-[1.85] text-white/68 sm:px-6 sm:py-5 sm:text-base sm:leading-[1.82]"
                >
                  {p}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
