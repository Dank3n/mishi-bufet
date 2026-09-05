"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { menuCategories } from "@/data/menu";
import { Button } from "@/components/ui/Button";
import { emitAtmosphere } from "@/components/fx/ScrollAtmosphere";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocale } from "@/i18n/LocaleProvider";

const stackCats = menuCategories; // sushi · combo · băuturi
const accents = ["#ff1e1e", "#c4a574", "#e8d5b5"];

function CardContent({
  index,
  title,
  subtitle,
  accent,
  hint,
  categoryLabel,
}: {
  index: number;
  title: string;
  subtitle: string;
  accent: string;
  hint: string;
  categoryLabel: string;
}) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 20% 0%, ${accent}55, transparent 55%)`,
        }}
      />
      <p className="relative text-[10px] sm:text-xs tracking-[0.3em] uppercase text-mishi-red mb-3">
        {String(index + 1).padStart(2, "0")} · {categoryLabel}
      </p>
      <h3 className="relative font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
        {title}
      </h3>
      <p className="relative mt-3 sm:mt-4 text-sm sm:text-base text-ink-muted font-light leading-relaxed">
        {subtitle}
      </p>
      <div className="relative mt-6 sm:mt-8 flex items-center justify-between gap-3">
        <span className="text-[10px] tracking-[0.2em] uppercase text-ink-muted">
          {hint}
        </span>
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}
        />
      </div>
    </>
  );
}

function ScrollCardFace({
  index,
  progress,
  title,
  subtitle,
  accent,
  categoryLabel,
  hint,
}: {
  index: number;
  progress: MotionValue<number>;
  title: string;
  subtitle: string;
  accent: string;
  categoryLabel: string;
  hint: string;
}) {
  const n = stackCats.length;
  const start = index / n;
  const mid = (index + 0.45) / n;
  const end = (index + 1) / n;

  const x = useTransform(progress, [start, mid, end], [index === 0 ? 0 : 120, 0, -140]);
  const scale = useTransform(progress, [start, mid, end], [index === 0 ? 1 : 0.88, 1.05, 0.9]);
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.05), start, mid, end, Math.min(1, end + 0.05)],
    [index === 0 ? 1 : 0, 1, 1, 0.15, 0],
  );
  const rotate = useTransform(progress, [start, mid, end], [index * 2, 0, -8]);

  return (
    <motion.article
      style={{ x, scale, opacity, rotate, zIndex: 10 + (n - index) }}
      className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-xl -translate-y-1/2 border border-line bg-bg-panel/95 backdrop-blur-md p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
    >
      <CardContent
        index={index}
        title={title}
        subtitle={subtitle}
        accent={accent}
        hint={hint}
        categoryLabel={categoryLabel}
      />
    </motion.article>
  );
}

function MobileSwipeStack({
  labels,
  categoryLabel,
  swipeHint,
}: {
  labels: { id: string; title: string; subtitle: string; accent: string }[];
  categoryLabel: string;
  swipeHint: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = labels[active]?.id;
    if (id === "combo") emitAtmosphere("hot");
    else if (id === "bauturi") emitAtmosphere("dessert");
    else emitAtmosphere("default");
  }, [active, labels]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60;
    if (info.offset.x < -threshold && active < labels.length - 1) {
      setActive((v) => v + 1);
    } else if (info.offset.x > threshold && active > 0) {
      setActive((v) => v - 1);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[280px] sm:h-[320px] w-full max-w-lg touch-pan-y">
        <AnimatePresence mode="popLayout" initial={false}>
          {labels.map((cat, i) => {
            if (i < active || i > active + 2) return null;
            const offset = i - active;
            return (
              <motion.article
                key={cat.id}
                drag={offset === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={offset === 0 ? onDragEnd : undefined}
                initial={{ x: 80, scale: 0.9, opacity: 0 }}
                animate={{
                  x: offset * 10,
                  y: offset * 8,
                  scale: 1 - offset * 0.05,
                  opacity: 1 - offset * 0.15,
                  zIndex: 20 - offset,
                }}
                exit={{ x: -160, opacity: 0, rotate: -8, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="absolute inset-0 border border-line bg-bg-panel p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <CardContent
                  index={i}
                  title={cat.title}
                  subtitle={cat.subtitle}
                  accent={cat.accent}
                  hint={swipeHint}
                  categoryLabel={categoryLabel}
                />
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {labels.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            aria-label={`${categoryLabel} ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-mishi-red" : "w-2 bg-ink-muted/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopScrollStack({
  labels,
  categoryLabel,
  scrollHint,
  cta,
}: {
  labels: { id: string; title: string; subtitle: string; accent: string }[];
  categoryLabel: string;
  scrollHint: string;
  cta: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(stackCats.length - 1, Math.floor(v * stackCats.length));
    const id = stackCats[idx]?.id;
    if (id === "combo") emitAtmosphere("hot");
    else if (id === "bauturi") emitAtmosphere("dessert");
    else emitAtmosphere("default");
  });

  useEffect(() => {
    return () => emitAtmosphere("default");
  }, []);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${stackCats.length * 100}vh` }}
      id="menu-stack"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center">
        <StackHeader />
        <div className="relative mx-auto h-[380px] w-full max-w-7xl px-8">
          {labels.map((cat, i) => (
            <ScrollCardFace
              key={cat.id}
              index={i}
              progress={scrollYProgress}
              title={cat.title}
              subtitle={cat.subtitle}
              accent={cat.accent}
              categoryLabel={categoryLabel}
              hint={scrollHint}
            />
          ))}
        </div>
        <div className="mx-auto mt-10 relative z-10">
          <Button href="/meniu" variant="outline">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

function StackHeader() {
  const { t } = useLocale();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-8 mb-6 sm:mb-8 relative z-10">
      <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-mishi-red mb-2 sm:mb-3">
        {t.menu.stackEyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-ink">
        {t.menu.stackTitle}
      </h2>
      <p className="mt-2 sm:mt-3 max-w-lg text-sm sm:text-base text-ink-muted font-light">
        <span className="lg:hidden">{t.menu.stackHintTouch}</span>
        <span className="hidden lg:inline">{t.menu.stackHintDesktop}</span>
      </p>
    </div>
  );
}

export function MenuCardStack() {
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const labels = useMemo(
    () =>
      stackCats.map((c, i) => {
        const catT = t.menu.cats[c.id];
        return {
          id: c.id,
          title: catT?.title ?? c.title,
          subtitle: catT?.subtitle ?? c.subtitle,
          accent: accents[i % accents.length],
        };
      }),
    [t],
  );

  const categoryLabel = t.menu.category;

  if (isMobile) {
    return (
      <section
        id="menu-stack"
        className="relative py-14 sm:py-16 lg:py-0 px-4 sm:px-6 overflow-hidden"
      >
        <StackHeader />
        <MobileSwipeStack
          labels={labels}
          categoryLabel={categoryLabel}
          swipeHint="← →"
        />
        <div className="mt-8 flex justify-center">
          <Button
            href="/meniu"
            variant="outline"
            className="w-full max-w-md min-h-12"
          >
            {t.menu.stackCta}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <DesktopScrollStack
      labels={labels}
      categoryLabel={categoryLabel}
      scrollHint="Scroll"
      cta={t.menu.stackCta}
    />
  );
}
