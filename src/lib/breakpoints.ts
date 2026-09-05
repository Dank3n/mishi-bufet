/**
 * Sub acest prag: UX telefon/tabletă (swipe, meniu full-screen, zoom blând).
 * De la acest prag în sus: UX laptop/desktop (scroll-jacking, card stack pe scroll).
 * Aliniat cu Tailwind `lg` (1024px).
 */
export const DESKTOP_BREAKPOINT = 1024;

export const touchMediaQuery = `(max-width: ${DESKTOP_BREAKPOINT - 1}px)`;
export const desktopMediaQuery = `(min-width: ${DESKTOP_BREAKPOINT}px)`;
