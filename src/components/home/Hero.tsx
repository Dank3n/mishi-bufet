"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SushiTrain, useBandHighlight } from "@/components/home/SushiTrain";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocale } from "@/i18n/LocaleProvider";
import { location } from "@/data/pricing";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { highlight, flash } = useBandHighlight(2000);
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const { t } = useLocale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const videoScale = useTransform(smooth, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const textOpacity = useTransform(smooth, [0, 0.55, 0.85], [1, 0.7, 0.15]);
  const textY = useTransform(smooth, [0, 1], isMobile ? [0, -24] : [0, -40]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    video.muted = true;
    const play = video.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {});
    }
  }, [reduce]);

  return (
    <>
      {/* Video hero — full bleed, no train overlay */}
      <div ref={ref} className="relative h-[100svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-bg-deep">
          <motion.div
            style={reduce ? undefined : { scale: videoScale }}
            className="absolute inset-0 origin-center"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/videos/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-deep/75 via-bg-deep/30 to-bg-deep/85"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(10,10,10,0.55)_100%)]"
          />

          <motion.div
            style={reduce ? undefined : { opacity: textOpacity, y: textY }}
            className="absolute inset-0 z-20 flex flex-col"
          >
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 sm:px-5 lg:px-8">
              {/* Brand — mobile: mid-screen, flush left; desktop: top */}
              <div className="flex flex-1 flex-col justify-center pt-[max(4.5rem,env(safe-area-inset-top))] lg:flex-none lg:justify-start lg:pt-32">
                <p className="mb-3 text-[10px] tracking-[0.35em] text-mishi-red uppercase sm:mb-4 sm:text-xs">
                  {t.hero.location}
                </p>
                <h1 className="font-display text-[clamp(2.75rem,14vw,7.5rem)] leading-[0.9] tracking-tight text-ink">
                  Mishi
                  <span className="block text-mishi-red">Bufet</span>
                </h1>
                <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-ink-muted sm:mt-5 sm:text-base lg:text-lg">
                  {t.hero.tagline}
                </p>

                {/* Desktop CTAs under copy */}
                <div className="mt-8 hidden flex-row gap-4 lg:flex">
                  <Button href={location.phoneHref}>{t.contact.call}</Button>
                  <Button href="/meniu" variant="ghost">
                    {t.hero.seeMenu}
                  </Button>
                </div>
              </div>

              {/* Mobile CTAs — pinned bottom, centered */}
              <div className="flex w-full flex-col items-center gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 lg:hidden">
                <Button
                  href={location.phoneHref}
                  className="min-h-12 w-full max-w-xs"
                >
                  {t.contact.call}
                </Button>
                <Button
                  href="/meniu"
                  variant="ghost"
                  className="min-h-12 w-full max-w-xs"
                >
                  {t.hero.seeMenu}
                </Button>
              </div>
            </div>
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-bg-deep to-transparent"
          />
        </div>
      </div>

      {/* Banda — sub video, pe fundalul site-ului */}
      <section className="relative border-t border-line bg-bg-deep pt-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pt-6">
        <div className="mx-auto mb-2 flex max-w-7xl justify-end px-4 sm:px-5 md:px-8">
          <button
            type="button"
            data-magnetic
            onClick={flash}
            className="inline-flex min-h-10 items-center justify-center border border-mishi-red/50 px-4 py-2 text-[10px] tracking-[0.16em] text-mishi-red uppercase transition-colors hover:bg-mishi-red/10 active:bg-mishi-red/15 sm:text-[11px]"
          >
            {t.hero.liveBand}
          </button>
        </div>
        <SushiTrain highlight={highlight} compact={isMobile} />
      </section>
    </>
  );
}
