"use client";

import { useRef } from "react";
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

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { highlight, flash } = useBandHighlight(2000);
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const { t } = useLocale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: isMobile ? 120 : 90,
    damping: isMobile ? 32 : 28,
  });

  // Gentler zoom on phone so the train stays readable
  const zoom = useTransform(
    smooth,
    [0, 0.65, 1],
    isMobile ? [1, 1.22, 1.45] : [1, 1.55, 2.05],
  );
  const trainY = useTransform(smooth, [0, 1], isMobile ? [0, -28] : [0, -80]);
  const textOpacity = useTransform(smooth, [0, 0.28, 0.5], [1, 0.4, 0]);
  const textY = useTransform(smooth, [0, 0.45], isMobile ? [0, -28] : [0, -60]);
  const farY = useTransform(smooth, [0, 1], isMobile ? [0, 16] : [0, 40]);
  const midY = useTransform(smooth, [0, 1], isMobile ? [0, -12] : [0, -30]);
  const neonOpacity = useTransform(smooth, [0, 0.5, 1], [0.7, 0.4, 0.15]);
  const vignette = useTransform(
    smooth,
    [0, 1],
    isMobile ? [0.15, 0.45] : [0.2, 0.75],
  );
  const blendOpacity = useTransform(smooth, [0.65, 1], [0, 1]);

  const scrollHeightClass = reduce
    ? "h-[100svh]"
    : "h-[155vh] lg:h-[220vh]";

  return (
    <div ref={ref} className={`relative ${scrollHeightClass}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-noir-gradient">
        {/* Far plane */}
        <motion.div
          style={{ y: farY, opacity: neonOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-[10%] left-[6%] h-16 w-8 lg:h-24 lg:w-10 rounded-full bg-mishi-red/25 blur-xl" />
          <div className="absolute top-[14%] right-[8%] h-20 w-10 lg:h-32 lg:w-12 rounded-full bg-mishi-red/20 blur-2xl" />
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 font-display text-[clamp(1.6rem,7vw,6rem)] tracking-[0.28em] uppercase text-mishi-red/15 lg:text-mishi-red/20 hidden sm:block">
            Mishi Bufet
          </div>
          <div className="absolute top-[14%] right-[4%] text-[clamp(4rem,18vw,16rem)] leading-none kanji-watermark">
            美
          </div>
        </motion.div>

        {/* Mid props — doar laptop/desktop */}
        {!isMobile && (
          <motion.div
            style={{ y: midY }}
            className="pointer-events-none absolute inset-0"
          >
            <ChopstickDecor className="absolute top-[30%] left-[6%] rotate-[-25deg] opacity-30" />
            <BowlDecor className="absolute top-[35%] right-[8%] opacity-25" />
            <LanternDecor className="absolute top-[8%] left-[18%] opacity-40" />
            <LanternDecor className="absolute top-[6%] right-[22%] opacity-35 scale-90" />
          </motion.div>
        )}

        {/* Train — zoom into band */}
        <motion.div
          style={reduce ? undefined : { scale: zoom, y: trainY }}
          className="absolute inset-x-0 bottom-0 flex flex-col justify-end origin-[50%_85%] lg:origin-[50%_78%] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        >
          <div className="relative z-10 w-full">
            <SushiTrain highlight={highlight} compact={isMobile} />
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          style={reduce ? undefined : { opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 top-0 z-20 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] lg:pt-32"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
            <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-mishi-red mb-3 sm:mb-4">
              {t.hero.location}
            </p>
            <h1 className="font-display text-[clamp(2.75rem,14vw,7.5rem)] leading-[0.9] tracking-tight text-ink">
              Mishi
              <span className="block text-mishi-red">Bufet</span>
            </h1>
            <p className="mt-3 sm:mt-5 max-w-md text-sm sm:text-base lg:text-lg text-ink-muted font-light leading-relaxed">
              {t.hero.tagline}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row flex-wrap gap-3 lg:gap-4">
              <Button href="/rezervari" className="w-full lg:w-auto min-h-12">
                {t.hero.reserve}
              </Button>
              <Button
                href="/meniu"
                variant="ghost"
                className="w-full lg:w-auto min-h-12"
              >
                {t.hero.seeMenu}
              </Button>
              <button
                type="button"
                data-magnetic
                onClick={flash}
                className="inline-flex items-center justify-center min-h-12 px-5 py-3 text-[11px] sm:text-xs tracking-[0.16em] uppercase border border-mishi-red/50 text-mishi-red active:bg-mishi-red/15 hover:bg-mishi-red/10 transition-colors w-full lg:w-auto"
              >
                {t.hero.liveBand}
              </button>
            </div>

            {isMobile && !reduce && (
              <p className="mt-5 text-[10px] tracking-[0.25em] uppercase text-ink-muted/60 animate-pulse">
                {t.hero.scrollHint}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            opacity: vignette,
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.8) 100%)",
          }}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 lg:h-40 z-30 bg-gradient-to-t from-bg-deep to-transparent"
          style={{ opacity: blendOpacity }}
        />
      </div>
    </div>
  );
}

function LanternDecor({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mx-auto h-3 w-1 bg-ink-muted/40" />
      <div className="h-14 w-10 rounded-sm bg-gradient-to-b from-mishi-red/80 to-mishi-red/30 shadow-[0_0_24px_rgba(255,30,30,0.35)]" />
    </div>
  );
}

function ChopstickDecor({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="h-1 w-28 rounded-full bg-[#c4a574]/70" />
      <div className="h-1 w-28 rounded-full bg-[#a88858]/70 translate-x-1" />
    </div>
  );
}

function BowlDecor({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="h-8 w-14 rounded-b-full border-2 border-ink-muted/30 bg-bg-panel/50" />
    </div>
  );
}
