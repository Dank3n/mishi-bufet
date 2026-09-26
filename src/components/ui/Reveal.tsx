"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
} & HTMLMotionProps<"div">;

const offsets = {
  up: { y: 36, x: 0 },
  down: { y: -24, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
  none: { y: 0, x: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  // Defer motion until after mount so useReducedMotion can't hydrate-mismatch
  // (that mismatch opens the Next.js overlay and locks body scroll).
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);

  if (!live || reduce) {
    return <div className={className}>{children}</div>;
  }

  const offset = offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
