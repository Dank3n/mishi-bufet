"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type FxContextValue = {
  loading: boolean;
  transitioning: boolean;
  startTransition: (href: string, navigate: () => void) => void;
};

const FxContext = createContext<FxContextValue | null>(null);

export function useFx() {
  return useContext(FxContext);
}

export function FxProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [mask, setMask] = useState<"idle" | "cover" | "hold" | "reveal">("idle");
  const [pendingNav, setPendingNav] = useState<(() => void) | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("mishi-loaded");
    if (seen) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("mishi-loaded", "1");
    }, window.matchMedia("(max-width: 1023px)").matches ? 1400 : 2200);
    return () => clearTimeout(t);
  }, []);

  const startTransition = useCallback(
    (href: string, navigate: () => void) => {
      if (href === pathname || mask !== "idle") {
        navigate();
        return;
      }
      setPendingNav(() => navigate);
      setMask("cover");
    },
    [pathname, mask],
  );

  useEffect(() => {
    if (mask !== "cover") return;
    const t = setTimeout(() => {
      pendingNav?.();
      setPendingNav(null);
      setMask("hold");
    }, 380);
    return () => clearTimeout(t);
  }, [mask, pendingNav]);

  useEffect(() => {
    if (mask !== "hold") return;
    const t = setTimeout(() => setMask("reveal"), 180);
    return () => clearTimeout(t);
  }, [mask, pathname]);

  useEffect(() => {
    if (mask !== "reveal") return;
    const t = setTimeout(() => setMask("idle"), 420);
    return () => clearTimeout(t);
  }, [mask]);

  const value = useMemo(
    () => ({
      loading,
      transitioning: mask !== "idle",
      startTransition,
    }),
    [loading, mask, startTransition],
  );

  return (
    <FxContext.Provider value={value}>
      {children}
      <AnimatePresence>{loading && <LoadingOverlay key="load" />}</AnimatePresence>
      <AnimatePresence>
        {(mask === "cover" || mask === "hold" || mask === "reveal") && (
          <motion.div
            key="mask"
            className="fixed inset-0 z-[90] pointer-events-none bg-mishi-red"
            initial={{ x: "-100%" }}
            animate={{ x: mask === "reveal" ? "100%" : "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </FxContext.Provider>
  );
}

function LoadingOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-deep"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="relative w-40 h-28">
        <motion.div
          className="absolute left-1/2 top-[62%] h-8 w-16 -translate-x-1/2 rounded-b-full border-2 border-ink/40 border-t-0"
          animate={{ scaleY: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-[28%] top-[38%] h-7 w-7 rounded-full bg-[#1a2e1a] border-2 border-[#f5f0e8] shadow-[0_0_16px_rgba(255,30,30,0.35)]"
          animate={{ x: [0, 42, 42], y: [0, -6, 18], opacity: [1, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[18%] top-[20%] h-1.5 w-24 origin-left rounded-full bg-gradient-to-r from-[#c4a574] to-[#e8d5b5]"
          animate={{ rotate: [-18, 8, 28], x: [0, 28, 36] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[20%] top-[26%] h-1.5 w-24 origin-left rounded-full bg-gradient-to-r from-[#a88858] to-[#d4c4a0]"
          animate={{ rotate: [-8, 14, 34], x: [0, 28, 36] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="absolute bottom-16 text-[10px] tracking-[0.4em] uppercase text-ink-muted">
        Mishi · loading
      </p>
    </motion.div>
  );
}
