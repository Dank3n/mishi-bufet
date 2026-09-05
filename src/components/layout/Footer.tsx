"use client";

import { TransitionLink } from "@/components/fx/TransitionLink";
import { PropExplosion } from "@/components/fx/PropExplosion";
import { location } from "@/data/pricing";
import { useLocale } from "@/i18n/LocaleProvider";

const links = [
  { href: "/", key: "home" as const },
  { href: "/meniu", key: "menu" as const },
  { href: "/despre", key: "about" as const },
  { href: "/rezervari", key: "reserve" as const },
  { href: "/contact", key: "contact" as const },
];

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative border-t border-line bg-bg-elevated mt-auto overflow-hidden">
      <PropExplosion />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 md:px-8 py-10 sm:py-14">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-ink">
              Mishi <span className="text-mishi-red">Bufet</span>
            </p>
            <p className="mt-3 text-sm text-ink-muted font-light leading-relaxed max-w-xs">
              {t.footer.blurb}
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-mishi-red mb-4">
              {t.footer.nav}
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {t.nav[link.key]}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-mishi-red mb-4">
              {t.footer.location}
            </p>
            <p className="text-sm text-ink">{location.address}</p>
            <p className="text-sm text-ink-muted mt-1">{location.area}</p>
            <p className="text-sm text-ink-muted mt-3">{location.mapsHint}</p>
          </div>
        </div>

        <div className="editorial-rule my-10" />

        <div className="flex flex-col md:flex-row justify-between gap-3 text-xs text-ink-muted tracking-wider">
          <p>
            © {new Date().getFullYear()} Mishi Bufet. {t.footer.rights}
          </p>
          <p className="text-mishi-red/70">帯 · Sushi Train · 食べ放題</p>
        </div>
      </div>
    </footer>
  );
}
