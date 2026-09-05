"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const props = [
  { id: "c1", type: "chopstick", x: -40, y: -30, rot: -35, delay: 0 },
  { id: "c2", type: "chopstick", x: 35, y: -20, rot: 28, delay: 0.05 },
  { id: "c3", type: "chopstick", x: -25, y: 40, rot: 12, delay: 0.1 },
  { id: "b1", type: "bowl", x: 45, y: 25, rot: -8, delay: 0.12 },
  { id: "b2", type: "bowl", x: -50, y: 10, rot: 15, delay: 0.15 },
  { id: "r1", type: "rest", x: 10, y: -45, rot: -20, delay: 0.08 },
  { id: "c4", type: "chopstick", x: 55, y: -5, rot: 40, delay: 0.18 },
] as const;

export function PropExplosion({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const isMobile = useIsMobile();
  const items = isMobile ? props.slice(0, 4) : props;

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2"
          initial={{
            x: `${p.x * 4}%`,
            y: `${p.y * 4}%`,
            opacity: 0,
            rotate: p.rot + 60,
            scale: 0.4,
          }}
          animate={
            inView
              ? {
                  x: `${p.x * (isMobile ? 0.65 : 1)}%`,
                  y: `${p.y * (isMobile ? 0.65 : 1)}%`,
                  opacity: isMobile ? 0.32 : 0.55,
                  rotate: p.rot,
                  scale: isMobile ? 0.72 : 1,
                }
              : undefined
          }
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 14,
            delay: p.delay,
          }}
        >
          {p.type === "chopstick" && <Chopsticks />}
          {p.type === "bowl" && <SauceBowl />}
          {p.type === "rest" && <ChopstickRest />}
        </motion.div>
      ))}
    </div>
  );
}

function Chopsticks() {
  return (
    <div className="flex flex-col gap-1.5 -translate-x-1/2 -translate-y-1/2">
      <div className="h-1.5 w-20 sm:w-28 md:w-36 rounded-full bg-gradient-to-r from-[#8a6a3a] to-[#e8d5b5]" />
      <div className="h-1.5 w-20 sm:w-28 md:w-36 translate-x-2 rounded-full bg-gradient-to-r from-[#6e5430] to-[#c4a574]" />
    </div>
  );
}

function SauceBowl() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2">
      <div className="h-8 w-11 sm:h-10 sm:w-14 rounded-b-[50%] border border-ink-muted/40 bg-bg-panel/80 relative overflow-hidden">
        <div className="absolute inset-x-2 top-2 h-4 rounded-full bg-mishi-red/50 blur-[1px]" />
      </div>
    </div>
  );
}

function ChopstickRest() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2">
      <div className="h-3 w-12 rounded-full bg-ink-muted/35 border border-line" />
      <div className="mx-auto -mt-1 h-2 w-8 rounded-b-md bg-ink-muted/25" />
    </div>
  );
}
