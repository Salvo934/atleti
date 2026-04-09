"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { NavItem } from "@/types/athlete";

type Props = {
  name: string;
  number: number;
  avatarUrl: string;
  nav: NavItem[];
};

function NavLink({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  return (
    <a
      href={`#${item.id}`}
      title={item.label}
      className={`whitespace-nowrap rounded-full px-1.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] transition sm:px-2.5 sm:text-[0.68rem] ${
        active
          ? "bg-white/[0.08] text-accent shadow-[0_0_0_1px_rgb(var(--accent-lime-rgb)/0.2)]"
          : "text-white/45 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      {item.label}
    </a>
  );
}

export function SiteHeader({ name, number, avatarUrl, nav }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(nav[0]?.id ?? "");

  const mid = nav.length > 0 ? Math.ceil(nav.length / 2) : 0;
  const navLeft = nav.slice(0, mid);
  const navRight = nav.slice(mid);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    if (nav.length === 0) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const headerEl = document.querySelector("header");
      const headerH = headerEl?.getBoundingClientRect().height ?? 72;
      const y = window.scrollY + headerH + 28;
      let current = nav[0]?.id ?? "";
      for (const item of nav) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (y >= top) current = item.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [nav]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    close();
  }, [close]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-white/[0.07] bg-[var(--background)]/82 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.85)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-[var(--background)]/88 backdrop-blur-xl"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
          aria-hidden
        />

        {/* Desktop: link sinistra | avatar+nome | link destra — senza box */}
        <nav
          className="mx-auto hidden min-h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-x-10 gap-y-4 px-4 py-3 sm:px-6 md:grid md:gap-x-14 lg:gap-x-20 xl:gap-x-24 lg:px-8"
          aria-label="Menu principale"
        >
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-5 gap-y-2 sm:gap-x-6 lg:gap-x-8">
            {navLeft.map((item) => (
              <NavLink key={item.id} item={item} active={activeId === item.id} />
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group mx-auto flex shrink-0 items-center gap-2.5 text-center sm:gap-3"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15 transition group-hover:ring-accent/40 sm:h-11 sm:w-11">
              <Image
                src={avatarUrl}
                alt=""
                fill
                className="object-cover transition group-hover:scale-[1.03]"
                sizes="44px"
              />
            </div>
            <span className="max-w-[14rem] truncate font-display text-sm font-bold uppercase tracking-wide text-white sm:max-w-[18rem] sm:text-base">
              {name}{" "}
              <span className="text-accent">#{number}</span>
            </span>
          </button>

          <div className="flex min-w-0 flex-wrap items-center justify-start gap-x-5 gap-y-2 sm:gap-x-6 lg:gap-x-8">
            {navRight.map((item) => (
              <NavLink key={item.id} item={item} active={activeId === item.id} />
            ))}
          </div>
        </nav>

        {/* Mobile: centro identity, menu a destra */}
        <div className="relative flex min-h-16 items-center px-4 py-3 sm:px-6 md:hidden">
          <div className="flex flex-1 justify-center">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex max-w-[min(100%,20rem)] items-center gap-2.5 text-left"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15 transition group-hover:ring-accent/40">
                <Image
                  src={avatarUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="min-w-0 truncate font-display text-sm font-bold uppercase tracking-wide text-white">
                {name}{" "}
                <span className="text-accent">#{number}</span>
              </span>
            </button>
          </div>
          {nav.length > 0 ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-6">
              <button
                type="button"
                className={`flex h-10 w-10 items-center justify-center text-white transition ${
                  open ? "text-accent" : "text-white/90 hover:text-white"
                }`}
                onClick={toggle}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Chiudi menu" : "Apri menu"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {open ? (
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {open && nav.length > 0 ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-[100] flex flex-col bg-[var(--background)] md:hidden"
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgb(var(--accent-rgb)/0.1),transparent_55%)]" />
          <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                <Image src={avatarUrl} alt="" fill className="object-cover" sizes="40px" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold uppercase tracking-wide text-white">
                  {name}
                </p>
                <p className="font-mono text-xs text-accent">#{number}</p>
              </div>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center text-white transition hover:text-accent"
              onClick={close}
              aria-label="Chiudi menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav
            className="relative min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-6"
            aria-label="Menu principale mobile"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item) => {
                const active = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      title={item.label}
                      onClick={close}
                      className={`block py-3 text-sm font-semibold uppercase tracking-wide transition ${
                        active ? "text-accent" : "text-white/75 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
