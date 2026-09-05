"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { beltPlates, type BeltPlate } from "@/data/belt";

function PlateCard({
  plate,
  highlight,
  compact,
}: {
  plate: BeltPlate;
  highlight: boolean;
  compact: boolean;
}) {
  return (
    <motion.div
      className={`plate-card group relative flex shrink-0 flex-col items-center ${
        compact ? "w-[136px]" : "w-[172px] md:w-[210px]"
      }`}
      data-magnetic
      animate={
        highlight
          ? {
              scale: compact ? 1.1 : 1.18,
              filter:
                "brightness(1.25) drop-shadow(0 0 18px rgba(255,30,30,0.65))",
            }
          : {
              scale: 1,
              filter:
                "brightness(1) drop-shadow(0 12px 10px rgba(0,0,0,0.65))",
            }
      }
      transition={{ duration: 0.45 }}
    >
      {/* Aspect ~945×541 — același canvas pentru toate farfuriile */}
      <div
        className={`relative w-full aspect-[945/541] transition-transform duration-500 group-hover:-translate-y-2 md:group-hover:-translate-y-3 group-hover:scale-[1.05]`}
      >
        {/* Contact shadow on the rail */}
        <div
          className="pointer-events-none absolute left-1/2 bottom-[4%] z-0 h-[10%] w-[55%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-[5px]"
          aria-hidden
        />
        <Image
          src={plate.src}
          alt={plate.label}
          fill
          sizes={compact ? "136px" : "(max-width: 768px) 172px, 210px"}
          className="relative z-[1] object-contain object-bottom select-none pointer-events-none"
          unoptimized
          priority={
            plate.id === "california-roll" || plate.id === "salmon-nigiri"
          }
          draggable={false}
        />
      </div>
      <div className="relative z-[1] -mt-0.5 px-2 py-0.5 border border-line/40 bg-bg-deep/90 backdrop-blur-sm">
        <p className="text-[8px] md:text-[10px] tracking-[0.14em] uppercase text-ink-muted group-hover:text-mishi-red transition-colors whitespace-nowrap">
          {plate.label}
        </p>
      </div>
    </motion.div>
  );
}

export function SushiTrain({
  highlight = false,
  compact = false,
}: {
  highlight?: boolean;
  compact?: boolean;
}) {
  const loop = [...beltPlates, ...beltPlates];

  return (
    <div
      className="relative w-full select-none"
      aria-label="Banda rulantă sushi — all you can eat"
    >
      <div
        className={`relative overflow-hidden ${
          compact ? "py-2" : "py-5 md:py-9"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 md:h-20 bg-gradient-to-b from-mishi-red/12 to-transparent" />

        <div className="relative mx-auto max-w-[100vw]">
          <div className="absolute inset-x-0 top-[64%] h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-ink-muted/50 to-transparent" />
          <div className="absolute inset-x-0 top-[68%] h-px bg-mishi-red/40" />
          <div className="absolute inset-x-0 bottom-4 md:bottom-6 h-6 md:h-8 bg-gradient-to-b from-[#1e1e1e] via-[#141414] to-[#0a0a0a] border-y border-line/50" />
          <div className="pointer-events-none absolute inset-x-0 bottom-4 md:bottom-6 h-6 md:h-8 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

          <div
            className={`sushi-train-track flex w-max items-end gap-10 md:gap-20 px-5 md:px-10 pb-6 md:pb-8 pt-1 ${
              highlight ? "sushi-train-highlight" : ""
            } ${compact ? "sushi-train-mobile" : ""}`}
          >
            {loop.map((plate, i) => (
              <PlateCard
                key={`${plate.id}-${i}`}
                plate={plate}
                highlight={highlight}
                compact={compact}
              />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 md:w-28 bg-gradient-to-r from-bg-deep to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 md:w-28 bg-gradient-to-l from-bg-deep to-transparent" />
      </div>
    </div>
  );
}

export function useBandHighlight(durationMs = 2000) {
  const [on, setOn] = useState(false);
  const flash = () => {
    setOn(true);
    window.setTimeout(() => setOn(false), durationMs);
  };
  return { highlight: on, flash };
}
