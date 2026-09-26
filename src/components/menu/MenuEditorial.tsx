"use client";

import { Reveal } from "@/components/ui/Reveal";
import { menuCategories } from "@/data/menu";
import {
  PlateVisual,
  plateKindFromName,
} from "@/components/food/PlateVisual";
import { useLocale } from "@/i18n/LocaleProvider";

function formatPrice(price: string | undefined, onBelt: string, lei: string) {
  if (!price) return onBelt;
  const p = price.normalize("NFC").toLowerCase();
  if (
    p === "belt" ||
    p === "pe bandă" ||
    p === "în bufet" ||
    p.includes("band") ||
    p.includes("belt") ||
    p.includes("bufet") ||
    p.includes("buffet")
  ) {
    return onBelt;
  }
  if (
    price.includes("%") ||
    price === "Gratis" ||
    price === "Free" ||
    price === "無料" ||
    price === "免费"
  ) {
    return price;
  }
  return `${price} ${lei}`;
}

export function MenuEditorial({ showNote = true }: { showNote?: boolean }) {
  const { t } = useLocale();

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-24">
      {menuCategories.map((cat, ci) => {
        const sectionId =
          cat.id === "combo"
            ? "hot-dishes-zone"
            : cat.id === "bauturi"
              ? "dessert-zone"
              : cat.id;
        const catT = t.menu.cats[cat.id];

        return (
          <Reveal key={cat.id} delay={0.04 * ci}>
            <section id={sectionId}>
              <div className="mb-5 sm:mb-8">
                <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-mishi-red mb-2">
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-ink">
                  {catT?.title ?? cat.title}
                </h2>
                <p className="mt-2 text-sm text-ink-muted font-light">
                  {catT?.subtitle ?? cat.subtitle}
                </p>
              </div>

              <ul className="border-t border-line">
                {cat.items.map((item) => {
                  const itemT = t.menu.items[item.id];
                  const name = itemT?.name ?? item.name;
                  const description = itemT?.description ?? item.description;
                  const tag = itemT?.tag ?? item.tag;
                  const kind = plateKindFromName(item.name);

                  return (
                    <li
                      key={item.id}
                      data-magnetic
                      tabIndex={0}
                      className="menu-row group relative grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 px-2 sm:px-3 md:px-5 py-4 sm:py-5 border-b border-line transition-colors duration-300 overflow-hidden active:bg-mishi-red/18 focus-visible:bg-mishi-red/18 focus-visible:outline-none"
                    >
                      <div className="flex flex-wrap items-center gap-2 pr-12 sm:pr-16 md:pr-28">
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl text-ink group-hover:text-white group-active:text-white group-focus-visible:text-white transition-colors">
                          {name}
                        </h3>
                        {tag && (
                          <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-mishi-red/50 text-mishi-red group-hover:border-white/50 group-hover:text-white transition-colors">
                            {tag}
                          </span>
                        )}
                      </div>
                      <span className="menu-price font-display text-base sm:text-lg md:text-xl text-ink-muted tabular-nums self-start pt-0.5 transition-all duration-300 group-hover:text-white group-active:text-white">
                        {cat.id === "sushi"
                          ? t.menu.inBuffet
                          : formatPrice(item.price, t.menu.inBuffet, t.common.lei)}
                      </span>
                      <p className="col-span-2 max-w-xl text-xs sm:text-sm text-ink-muted font-light leading-relaxed group-hover:text-white/75 transition-colors pr-12 sm:pr-16 md:pr-28">
                        {description}
                      </p>

                      <div className="pointer-events-none absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-9 sm:w-16 sm:h-12 md:w-24 md:h-16 opacity-40 sm:opacity-0 translate-x-0 sm:translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 group-active:opacity-100 group-focus-visible:opacity-100 transition-all duration-500 ease-out">
                        <div className="menu-plate-spin w-full h-full drop-shadow-[0_0_12px_rgba(255,30,30,0.45)]">
                          <PlateVisual kind={kind} />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>
        );
      })}

      {showNote && (
        <Reveal>
          <p className="text-center text-xs sm:text-sm text-ink-muted font-light italic px-2">
            {t.menu.note}
          </p>
        </Reveal>
      )}
    </div>
  );
}
