"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { openHours } from "@/data/pricing";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/locales";

type Level = "full" | "good" | "quiet" | "closed";

function getLevel(now: Date): Level {
  const h = now.getHours() + now.getMinutes() / 60;
  const { open, close } = openHours;

  if (h < open || h >= close) return "closed";
  if (h >= open && h < 14.5) return "full";
  if (h >= 18 && h < 21) return "full";
  if (h >= 14.5 && h < 17) return "quiet";
  return "good";
}

const levelStyles = {
  full: {
    bar: "w-[92%]",
    color: "bg-mishi-red",
    glow: "red-glow-strong",
    text: "text-mishi-red",
  },
  good: {
    bar: "w-[70%]",
    color: "bg-mishi-red/80",
    glow: "red-glow",
    text: "text-mishi-red",
  },
  quiet: {
    bar: "w-[45%]",
    color: "bg-gold",
    glow: "",
    text: "text-gold",
  },
  closed: {
    bar: "w-[8%]",
    color: "bg-ink-muted",
    glow: "",
    text: "text-ink-muted",
  },
};

const timeLocales: Record<Locale, string> = {
  ro: "ro-RO",
  en: "en-GB",
  ru: "ru-RU",
  zh: "zh-CN",
};

export function LiveBufet() {
  const { t, locale } = useLocale();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const level = useMemo(() => getLevel(now), [now]);
  const styles = levelStyles[level];
  const timeLabel = now.toLocaleTimeString(timeLocales[locale], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const status =
    level === "closed"
      ? {
          label: t.live.closed,
          detail: t.live.closedDetail.replace("{open}", openHours.labelOpen),
        }
      : level === "full"
        ? {
            label:
              now.getHours() >= 18 ? t.live.rush : t.live.full,
            detail:
              now.getHours() >= 18 ? t.live.rushDetail : t.live.fullDetail,
          }
        : level === "quiet"
          ? { label: t.live.quiet, detail: t.live.quietDetail }
          : { label: t.live.good, detail: t.live.goodDetail };

  const density =
    level === "full"
      ? t.live.max
      : level === "good"
        ? t.live.high
        : level === "quiet"
          ? t.live.mid
          : "—";

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden border border-line bg-bg-panel/90 backdrop-blur-sm p-5 md:p-6 ${styles.glow}`}
      aria-live="polite"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 text-7xl kanji-watermark">
        帯
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`live-dot inline-block h-2.5 w-2.5 rounded-full ${
              level === "closed" ? "bg-ink-muted" : "bg-mishi-red"
            }`}
          />
          <span className="text-[10px] tracking-[0.35em] uppercase text-ink-muted">
            {t.live.live} · {timeLabel}
          </span>
        </div>
        <span className={`text-[10px] tracking-[0.2em] uppercase ${styles.text}`}>
          {level === "closed" ? t.live.offline : t.live.online}
        </span>
      </div>

      <h3 className={`font-display text-2xl md:text-3xl ${styles.text}`}>
        {status.label}
      </h3>
      <p className="mt-2 text-sm text-ink-muted font-light leading-relaxed">
        {status.detail}
      </p>

      <div className="mt-5">
        <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-2">
          <span>{t.live.density}</span>
          <span>{density}</span>
        </div>
        <div className="h-1.5 w-full bg-bg-deep overflow-hidden">
          <motion.div
            key={level}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full ${styles.bar} ${styles.color}`}
          />
        </div>
      </div>
    </motion.aside>
  );
}
