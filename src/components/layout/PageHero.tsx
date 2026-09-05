"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  kanji,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  kanji?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-noir-gradient pt-[max(7rem,calc(env(safe-area-inset-top)+5.5rem))] pb-10 sm:pb-16 md:pt-40 md:pb-20">
      {kanji && (
        <div className="pointer-events-none absolute right-[2%] sm:right-[5%] top-1/2 -translate-y-1/2 text-[clamp(4rem,22vw,14rem)] kanji-watermark">
          {kanji}
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-mishi-red mb-3 sm:mb-4">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] text-ink max-w-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base md:text-lg text-ink-muted font-light leading-relaxed">
              {description}
            </p>
          )}
          <div className="editorial-rule mt-6 sm:mt-8 max-w-xs" />
        </motion.div>
      </div>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="flex-1">{children}</div>;
}
