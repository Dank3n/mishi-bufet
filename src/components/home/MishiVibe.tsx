"use client";

import { PhotoImage } from "@/components/ui/PhotoImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { vibeShots } from "@/data/vibe";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";

export function MishiVibe() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLocale();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-14 sm:py-20 md:py-28 overflow-hidden">
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute right-0 top-12 sm:top-20 text-[clamp(5rem,28vw,20rem)] leading-none kanji-watermark"
      >
        味
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t.vibe.eyebrow}
            title={t.vibe.title}
            description={t.vibe.description}
          />
        </Reveal>

        <div className="mt-8 sm:mt-14 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {vibeShots.map((shot, i) => (
            <Reveal
              key={shot.id}
              delay={0.04 * i}
              className={
                shot.wide
                  ? "sm:col-span-2 lg:col-span-3"
                  : "sm:col-span-1 lg:col-span-2"
              }
            >
              <article className="group relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden border border-line bg-bg-elevated">
                <PhotoImage
                  src={shot.src}
                  alt={`${shot.title} — Mishi Bufet`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority={i < 2}
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/55 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                <span className="absolute right-4 top-4 font-display text-6xl text-white/10 group-hover:text-mishi-red/25 transition-colors">
                  {shot.kanji}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-mishi-red mb-1">
                    #{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-2xl text-ink">{shot.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted font-light leading-relaxed">
                    {shot.caption}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/despre" variant="outline">
            {t.vibe.explore}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
