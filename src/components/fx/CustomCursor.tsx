"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const magnet = useRef<{ x: number; y: number } | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      if (magnet.current) {
        const dx = magnet.current.x - e.clientX;
        const dy = magnet.current.y - e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist < 90) {
          const pull = 1 - dist / 90;
          x.set(e.clientX + dx * pull * 0.55);
          y.set(e.clientY + dy * pull * 0.55);
          setHovering(true);
          return;
        }
      }
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(false);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-magnetic], a, button, .menu-row, .plate-card",
      ) as HTMLElement | null;
      if (!target) {
        magnet.current = null;
        return;
      }
      const r = target.getBoundingClientRect();
      magnet.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const onLeave = () => {
      setVisible(false);
      magnet.current = null;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[95] mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovering ? 2.2 : 1,
      }}
      transition={{ scale: { type: "spring", stiffness: 400, damping: 22 } }}
    >
      <div className="relative h-3 w-3">
        <span className="absolute inset-0 rounded-full border border-mishi-red bg-white/90" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mishi-red" />
      </div>
    </motion.div>
  );
}
