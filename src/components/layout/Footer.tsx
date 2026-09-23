"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/fx/TransitionLink";
import { location } from "@/data/pricing";
import { useLocale } from "@/i18n/LocaleProvider";

const links = [
  { href: "/", key: "home" as const },
  { href: "/meniu", key: "menu" as const },
  { href: "/despre", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

const ANPC_SAL_URL = "https://reclamatiisal.anpc.ro";
const ANPC_HOME_URL = "https://anpc.ro";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative mt-auto border-t border-line bg-bg-elevated">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 md:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-ink">
              Mishi <span className="text-mishi-red">Bufet</span>
            </p>
            <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-ink-muted">
              {t.footer.blurb}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-mishi-red uppercase">
              {t.footer.nav}
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {t.nav[link.key]}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-mishi-red uppercase">
              {t.footer.location}
            </p>
            <p className="text-sm text-ink">{location.address}</p>
            <p className="mt-1 text-sm text-ink-muted">{location.area}</p>
            <p className="mt-3 text-sm text-ink-muted">{location.mapsHint}</p>
          </div>
        </div>

        <div className="editorial-rule my-10" />

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href={ANPC_SAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block opacity-90 transition-opacity hover:opacity-100"
              aria-label={t.footer.anpcSal}
            >
              <Image
                src="/images/anpc/pictograma-sal.png"
                alt={t.footer.anpcSal}
                width={250}
                height={50}
                className="h-10 w-auto sm:h-[50px]"
              />
            </a>
            <a
              href={ANPC_HOME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block opacity-90 transition-opacity hover:opacity-100"
              aria-label={t.footer.anpcPlacheta}
            >
              <Image
                src="/images/anpc/placheta-sal.png"
                alt={t.footer.anpcPlacheta}
                width={120}
                height={147}
                className="h-20 w-auto sm:h-24"
              />
            </a>
          </div>

          <div className="flex flex-col gap-2 text-xs tracking-wider text-ink-muted md:items-end md:text-right">
            <p>
              © {new Date().getFullYear()} Mishi Bufet. {t.footer.rights}
            </p>
            <p className="text-mishi-red/70">帯 · Sushi Train · 食べ放題</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
