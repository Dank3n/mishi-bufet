"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TransitionLink } from "@/components/fx/TransitionLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLocale } from "@/i18n/LocaleProvider";

const links = [
  { href: "/", key: "home" as const },
  { href: "/meniu", key: "menu" as const },
  { href: "/despre", key: "about" as const },
  { href: "/rezervari", key: "reserve" as const },
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
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 pt-[env(safe-area-inset-top)] ${
        scrolled || open
          ? "bg-bg-deep/90 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:px-8 py-3 sm:py-4">
        <TransitionLink href="/" className="group relative z-50 shrink-0" data-magnetic>
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
          <TransitionLink
            href="/rezervari"
            className="px-4 py-2 text-xs tracking-[0.2em] uppercase bg-mishi-red text-white red-glow hover:brightness-110 transition"
          >
            {t.nav.reserveCta}
          </TransitionLink>
        </nav>

        <div className="flex lg:hidden items-center gap-2 relative z-50">
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-bg-deep/98 backdrop-blur-xl pt-[calc(env(safe-area-inset-top)+4.5rem)] pb-[env(safe-area-inset-bottom)]"
          >
            <nav className="flex h-full flex-col px-6">
              <div className="flex flex-1 flex-col justify-center gap-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                  >
                    <TransitionLink
                      href={link.href}
                      className={`block py-4 text-2xl font-display tracking-wide border-b border-line ${
                        pathname === link.href ? "text-mishi-red" : "text-ink"
                      }`}
                    >
                      {t.nav[link.key]}
                    </TransitionLink>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pb-8 pt-4"
              >
                <TransitionLink
                  href="/rezervari"
                  className="flex min-h-14 w-full items-center justify-center bg-mishi-red text-white text-sm tracking-[0.2em] uppercase red-glow"
                >
                  {t.nav.reserveCta}
                </TransitionLink>
                <p className="mt-4 text-center text-[10px] tracking-[0.3em] uppercase text-ink-muted">
                  Mega Mall · București
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
