"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { menuCategories } from "@/data/menu";
import { Button } from "@/components/ui/Button";

export function MenuPreview() {
  const preview = menuCategories.slice(0, 2);

  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Meniu editorial"
            title="Ce rulează pe bandă"
            description="Mostră din sortimente — meniul complet, fără PDF, pe pagina dedicată."
          />
        </Reveal>

        <div className="mt-12 space-y-16">
          {preview.map((cat, ci) => (
            <Reveal key={cat.id} delay={0.05 * ci}>
              <div>
                <h3 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  {cat.title}
                </h3>
                <ul className="border-t border-line">
                  {cat.items.slice(0, 4).map((item) => (
                    <li
                      key={item.name}
                      className="menu-row flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6 px-3 md:px-5 py-4 border-b border-line transition-colors duration-300"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-xl text-ink">
                            {item.name}
                          </span>
                          {item.tag && (
                            <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-mishi-red/50 text-mishi-red">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-ink-muted font-light">
                          {item.description}
                        </p>
                      </div>
                      <span className="menu-price font-display text-lg text-ink-muted shrink-0 transition-all">
                        în bufet
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/meniu" variant="outline">
            Meniu complet
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
