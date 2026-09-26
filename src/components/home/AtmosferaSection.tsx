"use client";

import { PhotoImage } from "@/components/ui/PhotoImage";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import { atmosferaShots } from "@/data/atmosfera";
import { useLocale } from "@/i18n/LocaleProvider";

export function AtmosferaSection() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const labels = {
    interior: t.atmosfera.labelInterior,
    belt: t.atmosfera.labelBelt,
    bufet: t.atmosfera.labelBufet,
    terasa: t.atmosfera.labelTerasa,
  };

  const lightboxItems: LightboxItem[] = atmosferaShots.map((s) => ({
    src: s.src,
    alt: s.alt,
    title: labels[s.labelKey],
  }));

  const openAt = (i: number) => {
    setActive(i);
    setLightboxIndex(i);
  };

  return (
    <section
      id="atmosfera"
      className="relative overflow-hidden border-y border-line py-16 sm:py-20 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(255,30,30,0.18), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 lg:h-[560px] lg:flex-row lg:gap-8">
            <aside className="flex flex-col justify-center rounded-2xl border border-line bg-bg-panel/80 p-7 shadow-2xl backdrop-blur-md sm:p-10 lg:w-[34%] lg:p-12">
              <h2 className="font-display text-4xl leading-tight tracking-[0.08em] text-ink uppercase sm:text-5xl">
                {t.atmosfera.title}
                <br />
                <span className="text-mishi-red">{t.atmosfera.titleAccent}</span>
              </h2>
              <div className="my-7 h-1 w-14 bg-mishi-red" />
              <h3 className="mb-4 text-sm font-semibold tracking-[0.18em] text-ink uppercase sm:text-base">
                {t.atmosfera.subtitle}
              </h3>
              <p className="text-base leading-relaxed font-light text-ink-muted">
                {t.atmosfera.body}
              </p>
            </aside>

            <div className="hidden h-full min-h-[420px] flex-1 gap-2 lg:flex">
              {atmosferaShots.map((shot, i) => {
                const isActive = active === i;
                return (
                  <motion.button
                    key={shot.id}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={labels[shot.labelKey]}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => openAt(i)}
                    className="group relative overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-mishi-red"
                    animate={{ flexGrow: isActive ? 3.2 : 1 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    style={{ flexBasis: 0 }}
                  >
                    <PhotoImage
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 40vw"
                      className={`object-cover transition-transform duration-1000 ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                      priority={i === 0}
                      quality={90}
                    />
                    <div
                      className={`absolute inset-0 transition-colors duration-500 ${
                        isActive ? "bg-transparent" : "bg-black/55"
                      }`}
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-xl border-2 transition-opacity duration-500 ${
                        isActive
                          ? "border-mishi-red opacity-100"
                          : "border-transparent opacity-0"
                      }`}
                    />
                    <div
                      className={`absolute bottom-5 left-5 transition-all duration-500 ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-3 opacity-0"
                      }`}
                    >
                      <span className="rounded-sm bg-mishi-red px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-white uppercase">
                        {labels[shot.labelKey]}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="lg:hidden -mx-4 sm:-mx-5">
              <div className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:px-5">
                {atmosferaShots.map((shot, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={shot.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => openAt(i)}
                      className={`relative aspect-[4/5] w-[72%] shrink-0 snap-center overflow-hidden rounded-xl border-2 transition-colors duration-300 sm:w-[48%] ${
                        isActive ? "border-mishi-red" : "border-transparent"
                      }`}
                    >
                      <PhotoImage
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="90vw"
                        className="object-cover"
                        priority={i === 0}
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 rounded-sm bg-mishi-red px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-white uppercase">
                        {labels[shot.labelKey]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
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
