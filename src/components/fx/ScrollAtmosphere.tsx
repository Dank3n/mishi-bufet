"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Mode = "default" | "hot" | "dessert";

/** Background shifts driven by section markers + custom events from card stack */
export function ScrollAtmosphere() {
  const [mode, setMode] = useState<Mode>("default");

  useEffect(() => {
    const onMode = (e: Event) => {
      const detail = (e as CustomEvent<Mode>).detail;
      if (detail) setMode(detail);
    };
    window.addEventListener("mishi-atmosphere", onMode as EventListener);

    const nodes: { id: string; mode: Mode }[] = [
      { id: "hot-dishes-zone", mode: "hot" },
      { id: "dessert-zone", mode: "dessert" },
    ];
    const observers: IntersectionObserver[] = [];

    nodes.forEach(({ id, mode: m }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setMode(m);
          else setMode((prev) => (prev === m ? "default" : prev));
        },
        { threshold: 0.28 },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => {
      window.removeEventListener("mishi-atmosphere", onMode as EventListener);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1]"
      animate={{
        backgroundColor: mode === "hot" ? "#1c0808" : "#0a0a0a",
      }}
      transition={{ duration: 0.85 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(255,30,30,0.18), transparent 70%)",
        }}
        animate={{
          opacity: mode === "hot" ? [0.4, 0.85, 0.4] : 0,
        }}
        transition={
          mode === "hot"
            ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.5 }
        }
      />
    </motion.div>
  );
}

export function emitAtmosphere(mode: Mode) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("mishi-atmosphere", { detail: mode }),
  );
}
