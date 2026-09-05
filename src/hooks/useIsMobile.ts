"use client";

import { useEffect, useState } from "react";
import { DESKTOP_BREAKPOINT } from "@/lib/breakpoints";

/**
 * True pe telefon + tabletă (< 1024px).
 * False pe laptop / desktop — varianta imersivă anterioară.
 */
export function useIsMobile(breakpoint = DESKTOP_BREAKPOINT) {
  const [touchLayout, setTouchLayout] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const apply = () => setTouchLayout(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [breakpoint]);

  return touchLayout;
}

/** Alias clar: layout touch (phone + tablet) */
export function useIsTouchLayout() {
  return useIsMobile();
}
