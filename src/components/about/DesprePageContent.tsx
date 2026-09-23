"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import {
  vibeFeatured,
  vibeGrouped,
  vibeShots,
  type VibeShot,
  type VibeTheme,
} from "@/data/vibe";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";
import { location } from "@/data/pricing";
import { DetaliiGallery } from "@/components/ui/DetaliiGallery";

/** Landscape tiles: 1 col on phone, 2 on desktop; last odd item spans full width */
function tileClass(index: number, total: number) {
  const isLastOdd = total % 2 === 1 && index === total - 1;
  return isLastOdd
    ? "col-span-1 aspect-[16/10] md:col-span-2"
    : "col-span-1 aspect-[16/10]";
}

export function DesprePageContent() {
  const { t } = useLocale();
  const featured = vibeFeatured();
  const grouped = vibeGrouped();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      vibeShots.map((s) => ({
        src: s.src,
        alt: `${s.title} — Mishi Bufet`,
        title: s.title,
        caption: s.caption,
      })),
    [],
  );

  const openShot = (shot: VibeShot) => {
    const i = vibeShots.findIndex((s) => s.id === shot.id);
    if (i >= 0) setLightboxIndex(i);
  };

  const themeLabel = (theme: VibeTheme) => {
    switch (theme) {
      case "interior":
        return t.about.themeInterior;
      case "belt":
        return t.about.themeBelt;
      case "bufet":
        return t.about.themeBufet;
      case "terasa":
        return t.about.themeTerasa;
    }
  };

  const story = [
    { title: t.about.s1, text: t.about.s1t, shot: featured[0] },
    { title: t.about.s2, text: t.about.s2t, shot: featured[1] },
    { title: t.about.s3, text: t.about.s3t, shot: featured[3] },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        description={t.about.description}
        kanji="氛"
      />

      {/* Featured: landscape, 1 col phone / 2 cols desktop */}
      <section className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8 pb-8 sm:pb-14">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {featured.map((shot, i) => (
            <Reveal
              key={`feat-${shot.id}`}
              delay={0.04 * i}
              className={tileClass(i, featured.length)}
            >
              <button
                type="button"
                onClick={() => openShot(shot)}
                className="group relative block h-full w-full overflow-hidden border border-line text-left"
              >
                <Image
                  src={shot.src}
                  alt={`${shot.title} — Mishi Bufet`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority={i < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/85 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 font-display text-lg text-ink sm:text-xl">
                  {shot.title}
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-10 sm:py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {story.map((block, i) => (
            <Reveal key={block.title} delay={0.1 * i}>
              <button
                type="button"
                onClick={() => openShot(block.shot)}
                className="relative mb-5 block aspect-[16/11] w-full overflow-hidden border border-line"
              >
                <Image
                  src={block.shot.src}
                  alt={block.shot.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </button>
              <p className="mb-3 text-xs tracking-[0.3em] text-mishi-red uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mb-4 font-display text-2xl text-ink md:text-3xl">
                {block.title}
              </h2>
              <p className="font-light leading-relaxed text-ink-muted">
                {block.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <h2 className="mb-12 font-display text-4xl text-ink md:text-5xl">
              {t.about.gallery}
            </h2>
          </Reveal>

          <div className="space-y-10 md:space-y-24">
            {grouped.map(({ theme, shots }) =>
              shots.length === 0 ? null : (
                <div key={theme} id={`tema-${theme}`} className="scroll-mt-28">
                  <Reveal>
                    <div className="mb-3 flex items-end justify-between gap-4 border-b border-line pb-3 md:mb-6 md:pb-4">
                      <h3 className="font-display text-2xl text-ink md:text-3xl">
                        {themeLabel(theme)}
                      </h3>
                      <p className="text-[10px] tracking-[0.28em] text-ink-muted uppercase">
                        {String(shots.length).padStart(2, "0")}
                      </p>
                    </div>
                  </Reveal>

                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                    {shots.map((shot, i) => (
                      <Reveal
                        key={shot.id}
                        delay={0.03 * i}
                        className={tileClass(i, shots.length)}
                      >
                        <button
                          type="button"
                          id={`galerie-${shot.id}`}
                          onClick={() => openShot(shot)}
                          className="group relative h-full w-full overflow-hidden border border-line text-left"
                        >
                          <Image
                            src={shot.src}
                            alt={`${shot.title} — Mishi Bufet`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-bg-deep/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                          <span className="absolute top-3 right-3 font-display text-5xl text-white/[0.08] md:text-6xl">
                            {shot.kanji}
                          </span>
                          <div className="absolute inset-x-0 bottom-0 p-3 md:p-5">
                            <p className="mb-0.5 text-[10px] tracking-[0.28em] text-mishi-red uppercase">
                              {themeLabel(theme)}
                            </p>
                            <h4 className="font-display text-lg text-ink md:text-2xl">
                              {shot.title}
                            </h4>
                          </div>
                        </button>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>

          <Reveal className="mt-14 flex justify-center">
            <Button href={location.phoneHref}>{t.contact.call}</Button>
          </Reveal>
        </div>
      </section>

      <DetaliiGallery />

      <ImageLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}
