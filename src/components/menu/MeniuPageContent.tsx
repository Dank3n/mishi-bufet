"use client";

import { PageHero } from "@/components/layout/PageHero";
import { MenuEditorial } from "@/components/menu/MenuEditorial";
import { MenuOnPlate } from "@/components/menu/MenuOnPlate";
import { menuCategories } from "@/data/menu";
import { useLocale } from "@/i18n/LocaleProvider";

export function MeniuPageContent() {
  const { t } = useLocale();

  const tabLabel = (id: string) => {
    if (id === "sushi") return t.menu.tabSushi;
    if (id === "combo") return t.menu.tabCombo;
    return t.menu.tabDrinks;
  };

  return (
    <>
      <PageHero
        eyebrow={t.menu.pageEyebrow}
        title={t.menu.pageTitle}
        description={t.menu.pageDesc}
        kanji="献"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8 pb-6 sm:pb-8">
        <nav className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 border-b border-line scrollbar-none -mx-1 px-1">
          {menuCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id === "combo" ? "hot-dishes-zone" : cat.id === "bauturi" ? "dessert-zone" : cat.id}`}
              className="shrink-0 text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 min-h-10 border border-line text-ink-muted active:border-mishi-red active:text-mishi-red hover:border-mishi-red hover:text-mishi-red transition-colors"
            >
              {tabLabel(cat.id)}
            </a>
          ))}
        </nav>
      </div>

      <MenuOnPlate />

      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8 py-16 sm:py-24">
        <MenuEditorial />
      </div>
    </>
  );
}
