"use client";

import { PageHero } from "@/components/layout/PageHero";
import { ReservationForm } from "@/components/reservations/ReservationForm";
import { Reveal } from "@/components/ui/Reveal";
import { pricingTiers } from "@/data/pricing";
import { useLocale } from "@/i18n/LocaleProvider";

export function RezervariPageContent() {
  const { t } = useLocale();

  const priceRows = [
    {
      id: "weekday",
      label: `${t.pricing.weekdayLabel} · ${t.pricing.weekdayDays}`,
      price: pricingTiers.find((x) => x.id === "weekday")?.price ?? "89,90",
      hideCurrency: false,
    },
    {
      id: "weekend",
      label: `${t.pricing.weekendLabel} · ${t.pricing.weekendDays}`,
      price: pricingTiers.find((x) => x.id === "weekend")?.price ?? "94,90",
      hideCurrency: false,
    },
    {
      id: "kids-free",
      label: `${t.pricing.kidsFreeLabel} · ${t.pricing.kidsFreeDays}`,
      price: t.pricing.kidsFreePrice,
      hideCurrency: true,
    },
    {
      id: "kids-discount",
      label: `${t.pricing.kidsDiscLabel} · ${t.pricing.kidsDiscDays}`,
      price: t.pricing.kidsDiscPrice,
      hideCurrency: true,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.reserve.eyebrow}
        title={t.reserve.title}
        description={t.reserve.description}
        kanji="席"
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <ReservationForm />
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="border border-line p-6">
                <h2 className="font-display text-2xl text-ink mb-4">
                  {t.reserve.schedule}
                </h2>
                <ul>
                  <li className="flex justify-between gap-4 border-b border-line py-3 text-sm last:border-0">
                    <span className="text-ink-muted">{t.pricing.everyDay}</span>
                    <span className="text-mishi-red font-display text-base">
                      {t.pricing.hours}
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="border border-mishi-red/40 bg-mishi-red/5 p-6 red-glow">
                <h2 className="font-display text-2xl text-ink mb-4">
                  {t.reserve.priceTitle}
                </h2>
                <ul className="space-y-3">
                  {priceRows.map((row) => (
                    <li key={row.id} className="flex justify-between gap-3 text-sm">
                      <span className="text-ink-muted">{row.label}</span>
                      <span className="text-mishi-red font-display text-lg shrink-0">
                        {row.price}
                        {!row.hideCurrency ? ` ${t.common.lei}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
