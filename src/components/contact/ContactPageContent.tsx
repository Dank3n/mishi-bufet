"use client";

import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PropExplosion } from "@/components/fx/PropExplosion";
import { location } from "@/data/pricing";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

export function ContactPageContent() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        description={t.contact.description}
        kanji="所"
      />

      <section className="relative mx-auto max-w-7xl px-5 md:px-8 pb-24 overflow-hidden">
        <PropExplosion />
        <div className="relative z-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Reveal>
              <InfoRow
                icon={<MapPin className="text-mishi-red" size={20} />}
                label={t.contact.address}
                value={location.address}
                sub={location.area}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <InfoRow
                icon={<Phone className="text-mishi-red" size={20} />}
                label={t.contact.phone}
                value={location.phone}
              />
            </Reveal>
            <Reveal delay={0.12}>
              <InfoRow
                icon={<Mail className="text-mishi-red" size={20} />}
                label={t.contact.email}
                value={location.email}
              />
            </Reveal>
            <Reveal delay={0.16}>
              <div className="border border-line p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-mishi-red" size={20} />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-ink-muted">
                    {t.contact.hours}
                  </span>
                </div>
                <ul>
                  <li className="menu-row flex justify-between py-3 border-b border-line last:border-0 text-sm transition-colors">
                    <span>{t.pricing.everyDay}</span>
                    <span className="menu-price text-mishi-red font-display text-base">
                      {t.pricing.hours}
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <Button href="/rezervari">{t.contact.reserve}</Button>
                <Button href={location.phoneHref} variant="ghost">
                  {t.contact.call}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] md:min-h-full border border-line overflow-hidden bg-bg-elevated">
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(circle at 50% 40%, rgba(255,30,30,0.2), transparent 50%),
                    linear-gradient(160deg, #141414, #0a0a0a)
                  `,
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(245,240,232,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10 flex h-full min-h-[360px] flex-col items-center justify-center p-8 text-center">
                <p className="font-display text-5xl text-mishi-red mb-2">美</p>
                <p className="font-display text-2xl text-ink">Mega Mall</p>
                <p className="mt-2 text-sm text-ink-muted font-light max-w-xs">
                  {location.mapsHint}
                </p>
                <a
                  href="https://maps.google.com/?q=Mishi+Bufet+Mega+Mall+Bucuresti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 text-xs tracking-[0.3em] uppercase text-mishi-red hover:underline underline-offset-4"
                >
                  {t.contact.maps}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  sub,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex gap-4 border border-line p-6">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-ink-muted mb-1">
          {label}
        </p>
        <p className="font-display text-xl text-ink">{value}</p>
        {sub && <p className="mt-1 text-sm text-ink-muted font-light">{sub}</p>}
      </div>
    </div>
  );
}
