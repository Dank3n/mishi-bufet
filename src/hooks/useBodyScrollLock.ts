"use client";

import { useEffect } from "react";

let lockCount = 0;

function applyLock() {
  lockCount += 1;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
  }
}

function releaseLock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}

/** Clears a stuck lock after route changes / HMR. */
export function resetBodyScrollLock() {
  lockCount = 0;
  document.body.style.overflow = "";
}

/** Ref-counted body scroll lock — safe with nested nav + lightbox. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    applyLock();
    return () => releaseLock();
  }, [locked]);
}
