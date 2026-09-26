"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import { sushiShots } from "@/data/sushiShots";
import { useLocale } from "@/i18n/LocaleProvider";
import { useIsMobile } from "@/hooks/useIsMobile";

const AUTO_MS = 4200;
const SWIPE_PX = 56;

export function SushiInteractive() {
  const { t } = useLocale();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pauseRef = useRef(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const imgX = useTransform(sx, [-0.5, 0.5], ["3%", "-3%"]);
  const imgY = useTransform(sy, [-0.5, 0.5], ["2%", "-2%"]);

  const shot = sushiShots[active];
  const autoplay = inView && lightbox === null;

  const lightboxItems: LightboxItem[] = sushiShots.map((s) => ({
    src: s.src,
    alt: s.alt,
  }));

  const go = useCallback((dir: -1 | 1) => {
    setActive((i) => (i + dir + sushiShots.length) % sushiShots.length);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35, 0.5, 0.75] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onAutoTick = useEffectEvent(() => {
    if (!inView || pauseRef.current || lightbox !== null) return;
    setActive((i) => (i + 1) % sushiShots.length);
  });

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => onAutoTick(), AUTO_MS);
    return () => window.clearInterval(id);
  }, [autoplay, onAutoTick]);

  // Scroll only the filmstrip track — never the page
  useEffect(() => {
    if (!inView) return;
    const track = stripRef.current;
    const thumb = track?.querySelector<HTMLElement>(`[data-thumb="${active}"]`);
    if (!track || !thumb) return;
    const left =
      thumb.offsetLeft - (track.clientWidth - thumb.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active, inView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null || !inView) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, lightbox, inView]);

  return (
    <section
      ref={sectionRef}
      id="sushi"
      className="relative overflow-hidden border-y border-line py-10 sm:py-16 md:py-24"
      onMouseEnter={() => {
        if (!isMobile) pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
        mx.set(0);
        my.set(0);
      }}
      onTouchStart={() => {
        pauseRef.current = true;
      }}
      onTouchEnd={() => {
        window.setTimeout(() => {
          pauseRef.current = false;
        }, 2200);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, rgba(255,30,30,0.12), transparent 45%), radial-gradient(ellipse at 20% 80%, rgba(78,205,196,0.06), transparent 40%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4 sm:mb-10">
            <div className="max-w-xl">
              <p className="mb-2 text-[10px] tracking-[0.35em] text-mishi-red uppercase sm:mb-3">
                {t.sushi.eyebrow}
              </p>
              <h2 className="font-display text-3xl leading-none tracking-wide text-ink uppercase sm:text-5xl md:text-6xl">
                {t.sushi.homeTitle}
                <span className="mt-1 block text-mishi-red">
                  {t.sushi.homeAccent}
                </span>
              </h2>
              <div className="my-4 h-1 w-14 bg-mishi-red sm:my-5" />
              <p className="hidden text-sm font-light leading-relaxed text-ink-muted sm:block sm:text-base">
                {t.sushi.homeBody}
              </p>
            </div>
            <p className="shrink-0 font-display text-sm tabular-nums text-ink-muted">
              {String(active + 1).padStart(2, "0")}
              <span className="mx-1 text-mishi-red">/</span>
              {String(sushiShots.length).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 sm:gap-6 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12">
          {/* Featured */}
          <Reveal>
            <div
              className="relative"
              onPointerMove={(e) => {
                if (isMobile || e.pointerType === "touch") return;
                const r = e.currentTarget.getBoundingClientRect();
                mx.set((e.clientX - r.left) / r.width - 0.5);
                my.set((e.clientY - r.top) / r.height - 0.5);
              }}
              onPointerLeave={() => {
                mx.set(0);
                my.set(0);
              }}
            >
              <div
                className="relative aspect-[4/5] w-full overflow-hidden border border-line sm:aspect-[3/4] md:aspect-[4/5]"
                onTouchStart={(e) => {
                  touchX.current = e.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={(e) => {
                  const start = touchX.current;
                  touchX.current = null;
                  if (start == null) return;
                  const end = e.changedTouches[0]?.clientX;
                  if (end == null) return;
                  const dx = end - start;
                  if (Math.abs(dx) < SWIPE_PX) return;
                  go(dx < 0 ? 1 : -1);
                }}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(active)}
                  className="absolute inset-0 block text-left"
                  aria-label={t.sushi.open}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={shot.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        className="absolute inset-[-6%]"
                        style={isMobile ? undefined : { x: imgX, y: imgY }}
                      >
                        <PhotoImage
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover"
                          priority={active === 0}
                          quality={95}
                        />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </button>

                {/* Mobile edge controls */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-deep/50 to-transparent sm:hidden" />
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-bg-deep/55 text-ink backdrop-blur-sm active:bg-mishi-red/30 sm:hidden"
                  aria-label={t.sushi.prev}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-bg-deep/55 text-ink backdrop-blur-sm active:bg-mishi-red/30 sm:hidden"
                  aria-label={t.sushi.next}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="mt-3 hidden items-center gap-3 sm:mt-4 sm:flex">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-mishi-red hover:text-mishi-red"
                  aria-label={t.sushi.prev}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-mishi-red hover:text-mishi-red"
                  aria-label={t.sushi.next}
                >
                  <ChevronRight size={18} />
                </button>
                <div className="ml-2 h-px flex-1 bg-line" />
                <div className="h-1 w-24 overflow-hidden bg-line">
                  <motion.div
                    key={`${active}-${autoplay}`}
                    className="h-full bg-mishi-red"
                    initial={{ width: "0%" }}
                    animate={{ width: autoplay ? "100%" : "0%" }}
                    transition={
                      autoplay
                        ? { duration: AUTO_MS / 1000, ease: "linear" }
                        : { duration: 0 }
                    }
                  />
                </div>
              </div>

              {/* Mobile progress under image */}
              <div className="mt-3 h-0.5 overflow-hidden bg-line sm:hidden">
                <motion.div
                  key={`m-${active}-${autoplay}`}
                  className="h-full bg-mishi-red"
                  initial={{ width: "0%" }}
                  animate={{ width: autoplay ? "100%" : "0%" }}
                  transition={
                    autoplay
                      ? { duration: AUTO_MS / 1000, ease: "linear" }
                      : { duration: 0 }
                  }
                />
              </div>
            </div>
          </Reveal>

          {/* Filmstrip */}
          <Reveal delay={0.08}>
            <div
              ref={stripRef}
              className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-3 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-3 lg:overflow-visible lg:pb-0"
              role="listbox"
              aria-label={t.sushi.pick}
            >
              {sushiShots.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    data-thumb={i}
                    onClick={() => setActive(i)}
                    className={`relative aspect-[3/4] w-[22vw] min-w-[4.5rem] shrink-0 snap-center overflow-hidden border transition-all duration-300 sm:w-24 lg:w-auto ${
                      isActive
                        ? "border-mishi-red"
                        : "border-line opacity-75 active:opacity-100"
                    }`}
                  >
                    <PhotoImage
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 1024px) 22vw, 160px"
                      className={`object-cover transition-transform duration-500 ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <ImageLightbox
        items={lightboxItems}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onChange={setLightbox}
      />
    </section>
  );
}
