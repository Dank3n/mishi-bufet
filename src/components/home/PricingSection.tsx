"use client";

import { useSyncExternalStore } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiveBufet } from "@/components/home/LiveBufet";
import { isWeekendPricingDay, pricingTiers } from "@/data/pricing";
import { useLocale } from "@/i18n/LocaleProvider";

function subscribe() {
  return () => {};
}

function getWeekendSnapshot() {
  return isWeekendPricingDay();
}

export function PricingSection() {
  const { t } = useLocale();
  const weekendToday = useSyncExternalStore(
    subscribe,
    getWeekendSnapshot,
    getWeekendSnapshot,
  );
  const activeTierId = weekendToday ? "weekend" : "weekday";

  const tierCopy: Record<
    string,
    { label: string; days: string; note: string; price?: string }
  > = {
    weekday: {
      label: t.pricing.weekdayLabel,
      days: t.pricing.weekdayDays,
      note: t.pricing.weekdayNote,
    },
    weekend: {
      label: t.pricing.weekendLabel,
      days: t.pricing.weekendDays,
      note: t.pricing.weekendNote,
    },
    "kids-free": {
      label: t.pricing.kidsFreeLabel,
      days: t.pricing.kidsFreeDays,
      note: t.pricing.kidsFreeNote,
      price: t.pricing.kidsFreePrice,
    },
    "kids-discount": {
      label: t.pricing.kidsDiscLabel,
      days: t.pricing.kidsDiscDays,
      note: t.pricing.kidsDiscNote,
      price: t.pricing.kidsDiscPrice,
    },
  };

  const includes = [
    t.pricing.include1,
    t.pricing.include2,
    t.pricing.include3,
    t.pricing.include4,
  ];

  return (
    <section className="relative py-14 sm:py-20 md:py-28" id="preturi">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end mb-10 sm:mb-14">
          <Reveal>
            <SectionHeading
              eyebrow={t.pricing.eyebrow}
              title={t.pricing.title}
              description={t.pricing.description}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <LiveBufet />
          </Reveal>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier, i) => {
            const copy = tierCopy[tier.id] ?? {
              label: tier.label,
              days: tier.days,
              note: tier.note,
            };
            const price = copy.price ?? tier.price;
            const highlight = tier.id === activeTierId;
            return (
              <Reveal key={tier.id} delay={0.08 * i}>
                <div
                  className={`relative h-full border p-5 sm:p-6 md:p-8 transition-all duration-400 active:border-mishi-red/50 hover:-translate-y-1 ${
                    highlight
                      ? "border-mishi-red/60 bg-mishi-red/5 red-glow"
                      : "border-line bg-bg-elevated hover:border-mishi-red/35"
                  }`}
                >
                  {highlight && (
                    <span className="absolute top-4 right-4 text-[9px] tracking-[0.25em] uppercase text-mishi-red">
                      {t.pricing.todayBadge}
                    </span>
                  )}
                  <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-ink-muted">
                    {copy.label}
                  </p>
                  <p className="mt-2 font-display text-lg sm:text-xl text-ink">
                    {copy.days}
                  </p>
                  <p className="mt-4 sm:mt-6 font-display text-4xl sm:text-5xl md:text-5xl lg:text-4xl xl:text-5xl text-mishi-red">
                    {price}
                    {!tier.hideCurrency && (
                      <span className="ml-1 text-base sm:text-lg text-ink-muted font-body">
                        {t.common.lei}
                      </span>
                    )}
                  </p>
                  <p className="mt-3 sm:mt-4 text-sm text-ink-muted font-light leading-relaxed">
                    {copy.note}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-2xl md:text-3xl text-ink mb-6">
              {t.pricing.includes}
            </h3>
            <ul className="space-y-0">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-line py-3.5 text-sm md:text-base text-ink-muted font-light"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-mishi-red" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="font-display text-2xl md:text-3xl text-ink mb-6">
              {t.pricing.schedule}
            </h3>
            <div className="border border-line">
              <div className="menu-row flex items-baseline justify-between gap-4 px-5 py-4 border-b border-line last:border-0 transition-colors duration-300">
                <span className="text-sm text-ink">{t.pricing.everyDay}</span>
                <span className="menu-price font-display text-lg text-mishi-red tabular-nums">
                  {t.pricing.hours}
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-muted tracking-wide leading-relaxed">
              {t.pricing.footnote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
