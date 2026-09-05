"use client";

import { FxProvider } from "@/components/fx/FxProvider";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { ScrollAtmosphere } from "@/components/fx/ScrollAtmosphere";
import { LocaleProvider } from "@/i18n/LocaleProvider";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <FxProvider>
        <ScrollAtmosphere />
        <CustomCursor />
        {children}
      </FxProvider>
    </LocaleProvider>
  );
}
