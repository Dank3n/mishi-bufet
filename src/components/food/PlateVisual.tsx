"use client";

export type PlateKind = "nigiri" | "maki" | "noodles" | "mochi" | "gyoza" | "sashimi";

export function PlateVisual({
  kind,
  className = "w-full h-full",
}: {
  kind: PlateKind;
  className?: string;
}) {
  switch (kind) {
    case "nigiri":
      return (
        <svg viewBox="0 0 120 80" className={className} aria-hidden>
          <ellipse cx="60" cy="62" rx="42" ry="10" fill="#2a2a2a" opacity="0.5" />
          <ellipse cx="60" cy="52" rx="36" ry="14" fill="#f5f0e8" />
          <ellipse cx="60" cy="48" rx="34" ry="12" fill="#ebe4d8" />
          <path d="M28 40 C35 22 85 22 92 40 C88 48 32 48 28 40Z" fill="#ff6b4a" />
          <path d="M32 38 C40 28 80 28 88 38" fill="none" stroke="#ff8f75" strokeWidth="2" opacity="0.6" />
          <rect x="54" y="44" width="12" height="3" rx="1" fill="#1a3d1a" opacity="0.7" />
        </svg>
      );
    case "maki":
      return (
        <svg viewBox="0 0 120 80" className={className} aria-hidden>
          <ellipse cx="60" cy="64" rx="40" ry="9" fill="#2a2a2a" opacity="0.45" />
          {[0, 1, 2, 3].map((i) => {
            const x = 28 + i * 20;
            return (
              <g key={i}>
                <circle cx={x} cy="44" r="14" fill="#1a2e1a" />
                <circle cx={x} cy="44" r="10" fill="#f5f0e8" />
                <circle cx={x - 3} cy="42" r="3" fill="#ff6b4a" />
                <circle cx={x + 3} cy="45" r="2.5" fill="#5a8f3a" />
                <circle cx={x} cy="47" r="2" fill="#c4a574" />
              </g>
            );
          })}
        </svg>
      );
    case "noodles":
      return (
        <svg viewBox="0 0 120 80" className={className} aria-hidden>
          <ellipse cx="60" cy="64" rx="38" ry="9" fill="#2a2a2a" opacity="0.45" />
          <ellipse cx="60" cy="48" rx="34" ry="18" fill="#3d2a1a" />
          <ellipse cx="60" cy="44" rx="30" ry="14" fill="#5c3d24" />
          <path d="M35 40 Q45 32 55 42 T75 38 T90 44" fill="none" stroke="#e8c48a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 48 Q48 38 62 50 T88 46" fill="none" stroke="#d4a85c" strokeWidth="2" strokeLinecap="round" />
          <path d="M38 52 Q52 44 68 54 T85 50" fill="none" stroke="#c4944a" strokeWidth="2" strokeLinecap="round" />
          <circle cx="48" cy="42" r="4" fill="#ff1e1e" opacity="0.85" />
          <circle cx="72" cy="46" r="3.5" fill="#5a8f3a" />
        </svg>
      );
    case "mochi":
      return (
        <svg viewBox="0 0 120 80" className={className} aria-hidden>
          <ellipse cx="60" cy="64" rx="36" ry="8" fill="#2a2a2a" opacity="0.4" />
          <ellipse cx="42" cy="48" rx="16" ry="14" fill="#9fd4a0" />
          <ellipse cx="60" cy="50" rx="16" ry="14" fill="#f5b8c8" />
          <ellipse cx="78" cy="48" rx="16" ry="14" fill="#e8d5a0" />
        </svg>
      );
    case "gyoza":
      return (
        <svg viewBox="0 0 120 80" className={className} aria-hidden>
          <ellipse cx="60" cy="64" rx="38" ry="8" fill="#2a2a2a" opacity="0.4" />
          {[0, 1, 2].map((i) => {
            const x = 34 + i * 26;
            return (
              <g key={i}>
                <ellipse cx={x} cy="46" rx="14" ry="10" fill="#e8dcc8" />
                <ellipse cx={x} cy="48" rx="12" ry="6" fill="#c4a574" opacity="0.5" />
              </g>
            );
          })}
        </svg>
      );
    case "sashimi":
      return (
        <svg viewBox="0 0 120 80" className={className} aria-hidden>
          <ellipse cx="60" cy="64" rx="40" ry="9" fill="#2a2a2a" opacity="0.45" />
          <ellipse cx="60" cy="50" rx="38" ry="16" fill="#1a1a1a" />
          <rect x="28" y="40" width="22" height="12" rx="3" fill="#ff6b4a" transform="rotate(-8 39 46)" />
          <rect x="48" y="38" width="22" height="12" rx="3" fill="#e8553d" transform="rotate(4 59 44)" />
          <rect x="68" y="40" width="22" height="12" rx="3" fill="#c43c2e" transform="rotate(-5 79 46)" />
        </svg>
      );
  }
}

export function plateKindFromName(name: string): PlateKind {
  const n = name.toLowerCase();
  if (n.includes("maki") || n.includes("roll") || n.includes("california") || n.includes("dragon"))
    return "maki";
  if (n.includes("sashimi")) return "sashimi";
  if (
    n.includes("rață") ||
    n.includes("rata") ||
    n.includes("vită") ||
    n.includes("vita") ||
    n.includes("pui") ||
    n.includes("fructe") ||
    n.includes("combo")
  )
    return "noodles";
  if (
    n.includes("bere") ||
    n.includes("heineken") ||
    n.includes("asahi") ||
    n.includes("sake") ||
    n.includes("vin") ||
    n.includes("suc") ||
    n.includes("ceai") ||
    n.includes("apă") ||
    n.includes("apa") ||
    n.includes("coca") ||
    n.includes("fuze") ||
    n.includes("cappy") ||
    n.includes("strongbow") ||
    n.includes("desperados") ||
    n.includes("moretti") ||
    n.includes("ciuc") ||
    n.includes("j&b") ||
    n.includes("lapte") ||
    n.includes("cocos")
  )
    return "mochi";
  return "nigiri";
}
