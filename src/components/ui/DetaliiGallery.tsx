"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import { detaliiShots } from "@/data/detalii";
import { useLocale } from "@/i18n/LocaleProvider";

function tileClass(index: number, total: number) {
  const isLastOdd = total % 2 === 1 && index === total - 1;
  return isLastOdd
    ? "col-span-1 aspect-[3/4] md:col-span-2 md:aspect-[21/10]"
    : "col-span-1 aspect-[3/4]";
}

type Props = {
  /** Extra top padding / border when placed mid-page */
  className?: string;
};

export function DetaliiGallery({ className = "" }: Props) {
  const { t } = useLocale();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const titles = {
    figurine: t.detalii.figurine,
    raft: t.detalii.raft,
    bara: t.detalii.bara,
    logo: t.detalii.logo,
    planta: t.detalii.planta,
  };

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      detaliiShots.map((s) => ({
        src: s.src,
        alt: s.alt,
        title: titles[s.titleKey],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- titles from locale
    [t.detalii],
  );

  return (
    <section
      id="detalii"
      className={`scroll-mt-28 border-t border-line py-14 sm:py-16 md:py-20 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-3 md:mb-8 md:pb-4">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              {t.detalii.title}
            </h2>
            <p className="text-[10px] tracking-[0.28em] text-ink-muted uppercase">
              {String(detaliiShots.length).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {detaliiShots.map((shot, i) => (
            <Reveal
              key={shot.id}
              delay={0.04 * i}
              className={tileClass(i, detaliiShots.length)}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative h-full w-full overflow-hidden border border-line text-left"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-5">
                  <p className="mb-0.5 text-[10px] tracking-[0.28em] text-mishi-red uppercase">
                    {t.detalii.title}
                  </p>
                  <h3 className="font-display text-lg text-ink md:text-2xl">
                    {titles[shot.titleKey]}
                  </h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <ImageLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </section>
  );
}
