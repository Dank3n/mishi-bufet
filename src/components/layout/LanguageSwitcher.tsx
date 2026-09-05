"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { locales, localeLabels, type Locale } from "@/i18n/locales";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        data-magnetic
        aria-label={t.common.language}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-2 border border-line px-3 text-[10px] tracking-[0.2em] uppercase text-ink-muted hover:border-mishi-red hover:text-mishi-red transition-colors"
      >
        <Languages size={16} className="text-mishi-red" />
        <span className="font-medium text-ink">{localeLabels[locale].short}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 min-w-[11rem] border border-line bg-bg-deep/95 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.55)] z-50 overflow-hidden"
          >
            <p className="px-3 pt-3 pb-1 text-[9px] tracking-[0.3em] uppercase text-ink-muted">
              {t.common.language}
            </p>
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => pick(l)}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors ${
                  l === locale
                    ? "bg-mishi-red/15 text-mishi-red"
                    : "text-ink hover:bg-mishi-red/10 hover:text-mishi-red"
                }`}
              >
                <span>{localeLabels[l].native}</span>
                <span className="text-[10px] tracking-wider text-ink-muted">
                  {localeLabels[l].short}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
