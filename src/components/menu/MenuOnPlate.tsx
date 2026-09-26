"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import { menuCloseups } from "@/data/menuCloseups";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Unique menu section: conveyor “plates” — tall circular-framed portraits
 * on a metallic rail, auto-advancing like sushi on the belt.
 */
export function MenuOnPlate() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const pauseRef = useRef(false);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const labels = {
    belt: t.menu.closeupBelt,
    hot: t.menu.closeupHot,
    salads: t.menu.closeupSalads,
    domes: t.menu.closeupDomes,
  };

  const lightboxItems: LightboxItem[] = menuCloseups.map((s) => ({
    src: s.src,
    alt: s.alt,
    title: labels[s.labelKey],
  }));

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pauseRef.current || lightbox !== null) return;
      setActive((i) => (i + 1) % menuCloseups.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [lightbox]);

  return (
    <section
      id="pe-farfurie"
      className="relative overflow-x-clip border-y border-line py-16 sm:py-20 md:py-24"
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,30,30,0.16), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(78,205,196,0.08), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <div className="mb-10 max-w-xl md:mb-14">
            <p className="mb-3 text-[10px] tracking-[0.35em] text-mishi-red uppercase">
              {t.menu.closeupEyebrow}
            </p>
            <h2 className="font-display text-4xl leading-none tracking-wide text-ink uppercase sm:text-5xl md:text-6xl">
              {t.menu.closeupTitle}
              <span className="mt-1 block text-mishi-red">
                {t.menu.closeupAccent}
              </span>
            </h2>
            <div className="my-5 h-1 w-14 bg-mishi-red" />
            <p className="text-sm font-light leading-relaxed text-ink-muted sm:text-base">
              {t.menu.closeupBody}
            </p>
          </div>
        </Reveal>

        {/* Conveyor rail */}
        <div className="relative">
          <div
            className="pointer-events-none absolute top-[42%] right-0 left-0 h-3 -translate-y-1/2 rounded-full opacity-80"
            style={{
              background:
                "linear-gradient(90deg, transparent, #3a3a3a 8%, #6a6a6a 50%, #3a3a3a 92%, transparent)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.45)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-[42%] right-[8%] left-[8%] h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-mishi-red/50 to-transparent"
            aria-hidden
          />

          <div className="scrollbar-none relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-10 pt-6 sm:gap-6 md:justify-center md:overflow-visible md:px-0">
            {menuCloseups.map((shot, i) => {
              const isActive = active === i;
              return (
                <Reveal key={shot.id} delay={0.06 * i} className="snap-center">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-label={labels[shot.labelKey]}
                    onClick={() => {
                      setActive(i);
                      setLightbox(i);
                    }}
                    onFocus={() => setActive(i)}
                    className="group relative shrink-0 outline-none"
                  >
                    <motion.div
                      animate={{
                        y: isActive ? -10 : 6,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="relative"
                    >
                      {/* Plate rim — size stays put so the full oval stays visible */}
                      <div
                        className={`relative aspect-[3/4] w-[min(72vw,240px)] overflow-hidden rounded-[42%] border-[3px] transition-[border-color,box-shadow] duration-500 sm:w-[220px] md:w-[240px] ${
                          isActive
                            ? "border-mishi-red shadow-[0_0_0_1px_rgba(255,30,30,0.35),0_20px_50px_rgba(255,30,30,0.25)]"
                            : "border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
                        }`}
                      >
                        <PhotoImage
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(max-width: 768px) 72vw, 240px"
                          className={`object-cover transition-transform duration-700 will-change-transform ${
                            isActive
                              ? "scale-[1.12]"
                              : "scale-100 group-hover:scale-[1.05]"
                          }`}
                          priority={i === 0}
                          quality={90}
                        />
                        <div
                          className={`absolute inset-0 transition-colors duration-500 ${
                            isActive ? "bg-transparent" : "bg-black/45"
                          }`}
                        />
                        {/* Dome highlight */}
                        <div
                          className="pointer-events-none absolute inset-0 rounded-[42%] opacity-40"
                          style={{
                            background:
                              "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.35), transparent 45%)",
                          }}
                          aria-hidden
                        />
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 translate-y-full whitespace-nowrap rounded-sm bg-mishi-red px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-white uppercase"
                          >
                            {labels[shot.labelKey]}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div className="mt-10 flex justify-center gap-2">
            {menuCloseups.map((shot, i) => (
              <button
                key={`dot-${shot.id}`}
                type="button"
                aria-label={labels[shot.labelKey]}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-8 bg-mishi-red"
                    : "w-1.5 bg-ink-muted/40 hover:bg-ink-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ImageLightbox
        items={lightboxItems}
        index={lightbox}
        onClose={closeLightbox}
        onChange={setLightbox}
      />
    </section>
  );
}
