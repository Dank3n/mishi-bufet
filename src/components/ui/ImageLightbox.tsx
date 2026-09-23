"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxItem = {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
};

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function ImageLightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null && items[index];
  const current = open ? items[index] : null;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (index === null || items.length === 0) return;
      const next = (index + dir + items.length) % items.length;
      onChange(next);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={current.title ?? current.alt}
        >
          <button
            type="button"
            aria-label="Închide"
            className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-mishi-red sm:top-6 sm:right-6"
            onClick={onClose}
          >
            <X size={22} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Anterior"
                className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-mishi-red sm:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                aria-label="Următor"
                className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-mishi-red sm:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.div
            key={current.src}
            className="relative flex max-h-[min(92vh,920px)] w-full max-w-6xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[min(78vh,820px)] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            {(current.title || current.caption) && (
              <div className="mt-4 max-w-xl px-4 text-center">
                {current.title && (
                  <p className="font-display text-xl text-ink sm:text-2xl">
                    {current.title}
                  </p>
                )}
                {current.caption && (
                  <p className="mt-1 text-sm font-light text-ink-muted">
                    {current.caption}
                  </p>
                )}
                <p className="mt-2 text-[10px] tracking-[0.25em] text-mishi-red uppercase">
                  {index + 1} / {items.length}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
