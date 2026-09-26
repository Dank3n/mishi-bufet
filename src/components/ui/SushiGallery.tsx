"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import { sushiShots } from "@/data/sushiShots";
import { useLocale } from "@/i18n/LocaleProvider";

function tileClass(index: number, total: number) {
  const isLastOdd = total % 2 === 1 && index === total - 1;
  return isLastOdd
    ? "col-span-1 aspect-[3/4] md:col-span-2 md:aspect-[21/10]"
    : "col-span-1 aspect-[3/4]";
}

type Props = {
  className?: string;
};

export function SushiGallery({ className = "" }: Props) {
  const { t } = useLocale();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      sushiShots.map((s) => ({
        src: s.src,
        alt: s.alt,
      })),
    [],
  );

  return (
    <section
      id="sushi-galerie"
      className={`scroll-mt-28 border-t border-line py-12 sm:py-16 md:py-20 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-3 md:mb-8 md:pb-4">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              {t.sushi.title}
            </h2>
            <p className="text-[10px] tracking-[0.28em] text-ink-muted uppercase">
              {String(sushiShots.length).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-2 md:gap-3">
          {sushiShots.map((shot, i) => (
            <Reveal
              key={shot.id}
              delay={0.02 * (i % 6)}
              className={tileClass(i, sushiShots.length)}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative h-full w-full overflow-hidden border border-line text-left"
                aria-label={shot.alt}
              >
                <PhotoImage
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04] group-active:scale-[1.02]"
                  quality={95}
                />
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
