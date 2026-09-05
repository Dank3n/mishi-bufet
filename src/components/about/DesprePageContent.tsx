"use client";

import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { vibeShots } from "@/data/vibe";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";

export function DesprePageContent() {
  const { t } = useLocale();

  const story = [
    { title: t.about.s1, text: t.about.s1t, shot: vibeShots[0] },
    { title: t.about.s2, text: t.about.s2t, shot: vibeShots[1] },
    { title: t.about.s3, text: t.about.s3t, shot: vibeShots[3] },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        description={t.about.description}
        kanji="氛"
      />

      {/* Featured photo strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8 pb-10 sm:pb-14">
        <div className="grid gap-2 sm:gap-3 grid-cols-2 md:grid-cols-6">
          {vibeShots.map((shot, i) => (
            <Reveal
              key={`feat-${shot.id}`}
              delay={0.04 * i}
              className={
                i === 0
                  ? "col-span-2 md:col-span-3 row-span-1"
                  : i === 1
                    ? "col-span-2 md:col-span-3"
                    : "col-span-1 md:col-span-2"
              }
            >
              <a
                href={`#galerie-${shot.id}`}
                className={`group relative block overflow-hidden border border-line ${
                  i < 2 ? "aspect-[16/10]" : "aspect-[4/5] md:aspect-[5/4]"
                }`}
              >
                <Image
                  src={shot.src}
                  alt={`${shot.title} — Mishi Bufet`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority={i < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/85 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 font-display text-lg sm:text-xl text-ink">
                  {shot.title}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-10 sm:py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {story.map((block, i) => (
            <Reveal key={block.title} delay={0.1 * i}>
              <div className="relative mb-5 aspect-[16/11] overflow-hidden border border-line">
                <Image
                  src={block.shot.src}
                  alt={block.shot.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs tracking-[0.3em] uppercase text-mishi-red mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-4">
                {block.title}
              </h2>
              <p className="text-ink-muted font-light leading-relaxed">
                {block.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">
              {t.about.gallery}
            </h2>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-2">
            {vibeShots.map((shot, i) => (
              <Reveal
                key={shot.id}
                delay={0.05 * i}
                className={shot.wide ? "md:col-span-2" : undefined}
              >
                <article
                  id={`galerie-${shot.id}`}
                  className={`group relative scroll-mt-28 overflow-hidden border border-line ${
                    shot.wide
                      ? "aspect-[21/10] md:aspect-[21/9]"
                      : "aspect-[4/5] md:aspect-[16/10]"
                  }`}
                >
                  <Image
                    src={shot.src}
                    alt={`${shot.title} — Mishi Bufet`}
                    fill
                    sizes={
                      shot.wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/50 to-transparent" />
                  <span className="absolute right-6 top-4 font-display text-7xl text-white/[0.08]">
                    {shot.kanji}
                  </span>
                  <div className="absolute inset-0 flex items-end p-6 md:p-8">
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-mishi-red mb-1">
                        Look · {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-ink">
                        {shot.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-ink-muted font-light">
                        {shot.caption}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex justify-center">
            <Button href="/rezervari">{t.about.reserve}</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
