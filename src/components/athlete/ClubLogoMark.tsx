"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

function initialsFromTeam(team: string) {
  const words = team.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0]!.charAt(0) + words[1]!.charAt(0)).toUpperCase();
  }
  return team.slice(0, 2).toUpperCase() || "?";
}

type Props = {
  team: string;
  logo?: string;
  className?: string;
};

export function ClubLogoMark({ team, logo, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const src = logo?.trim();
  const showImg = Boolean(src) && !failed;

  const onError = useCallback(() => {
    setFailed(true);
  }, []);

  return (
    <div
      className={`relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#141414] to-[#080808] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] sm:h-[5.25rem] sm:w-[5.25rem] sm:rounded-[1.35rem] ${className}`}
    >
      {showImg ? (
        <Image
          src={src!}
          alt=""
          fill
          sizes="(max-width: 640px) 72px, 84px"
          className="object-contain p-2.5 sm:p-3"
          onError={onError}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center px-1 text-center font-display text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.06em] text-white/38 sm:text-xs"
          aria-hidden
        >
          {initialsFromTeam(team)}
        </div>
      )}
    </div>
  );
}
