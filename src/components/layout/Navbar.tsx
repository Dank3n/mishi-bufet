"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TransitionLink } from "@/components/fx/TransitionLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLocale } from "@/i18n/LocaleProvider";
import {
  resetBodyScrollLock,
  useBodyScrollLock,
} from "@/hooks/useBodyScrollLock";
import { location } from "@/data/pricing";

const links = [
  { href: "/", key: "home" as const },
  { href: "/meniu", key: "menu" as const },
  { href: "/despre", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    resetBodyScrollLock();
  }, [pathname]);

  useBodyScrollLock(open);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top)] ${
        open
          ? "bg-bg-deep border-b border-line"
          : scrolled
            ? "bg-bg-deep border-b border-line transition-[background-color,border-color] duration-300"
            : "bg-transparent transition-[background-color,border-color] duration-300"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:px-8 py-3 sm:py-4">
        <TransitionLink href="/" className="group relative z-[60] shrink-0" data-magnetic>
          <span className="font-display text-2xl sm:text-3xl tracking-wide text-ink group-hover:text-mishi-red transition-colors">
            Mishi
          </span>
          <span className="ml-2 text-[10px] tracking-[0.4em] uppercase text-mishi-red align-super">
            Bufet
          </span>
        </TransitionLink>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={`relative text-xs tracking-[0.22em] uppercase transition-colors ${
                  active ? "text-mishi-red" : "text-ink-muted hover:text-ink"
                }`}
              >
                {t.nav[link.key]}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-mishi-red"
                  />
                )}
              </TransitionLink>
            );
          })}
          <LanguageSwitcher />
          <a
            href={location.phoneHref}
            className="px-4 py-2 text-xs tracking-[0.2em] uppercase bg-mishi-red text-white red-glow hover:brightness-110 transition"
            data-magnetic
          >
            {t.contact.call}
          </a>
        </nav>

        <div className="flex lg:hidden items-center gap-2 relative z-[60]">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center text-ink active:text-mishi-red"
            data-magnetic
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-[55] bg-bg-deep pt-[calc(env(safe-area-inset-top)+4.5rem)] pb-[env(safe-area-inset-bottom)]">
          <nav className="relative z-[1] flex h-full flex-col bg-bg-deep px-6">
            <div className="flex flex-1 flex-col justify-center gap-1">
              {links.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className={`block py-4 text-2xl font-display tracking-wide border-b border-line ${
                    pathname === link.href ? "text-mishi-red" : "text-ink"
                  }`}
                >
                  {t.nav[link.key]}
                </TransitionLink>
              ))}
            </div>

            <div className="pb-8 pt-4">
              <a
                href={location.phoneHref}
                className="flex min-h-14 w-full items-center justify-center bg-mishi-red text-white text-sm tracking-[0.2em] uppercase red-glow"
              >
                {t.contact.call}
              </a>
              <p className="mt-4 text-center text-[10px] tracking-[0.3em] uppercase text-ink-muted">
                {location.phone}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
