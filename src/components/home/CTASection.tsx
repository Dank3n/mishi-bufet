"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";
import { location } from "@/data/pricing";

export function CTASection() {
  const { t } = useLocale();

  return (
    <section className="relative py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden border border-mishi-red/40 bg-mishi-red/5 px-5 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20 text-center red-glow">
            <div className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 text-[5rem] sm:text-[8rem] kanji-watermark">
              来
            </div>
            <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-mishi-red mb-3 sm:mb-4">
              {t.cta.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-ink leading-tight">
              {t.cta.title1}
              <br />
              <span className="text-mishi-red">{t.cta.title2}</span>
            </h2>
            <p className="mt-4 sm:mt-5 mx-auto max-w-lg text-sm sm:text-base text-ink-muted font-light">
              {t.cta.body}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Button href={location.phoneHref} className="w-full sm:w-auto min-h-12">
                {t.contact.call}
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                className="w-full sm:w-auto min-h-12"
              >
                {t.cta.directions}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
