"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";

const slots = ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"];

const fieldClass =
  "w-full bg-bg-deep border border-line text-ink px-4 py-3.5 text-base font-light outline-none transition-all duration-300 placeholder:text-ink-muted/70 focus:border-mishi-red/55 focus:shadow-[0_0_0_1px_rgba(255,30,30,0.25),0_0_24px_rgba(255,30,30,0.15)]";

export function ReservationForm() {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="relative border border-line bg-bg-panel p-4 sm:p-6 md:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <p className="text-xs tracking-[0.35em] uppercase text-mishi-red mb-3">
              {t.form.okEyebrow}
            </p>
            <h3 className="font-display text-3xl md:text-4xl text-ink">
              {t.form.okTitle}
            </h3>
            <p className="mt-4 text-ink-muted font-light">{t.form.okBody}</p>
            <button
              type="button"
              className="mt-8 text-xs tracking-[0.25em] uppercase text-mishi-red"
              onClick={() => setSent(false)}
            >
              {t.form.again}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Field label={t.form.name}>
                <input
                  required
                  name="name"
                  className={fieldClass}
                  placeholder={t.form.namePh}
                />
              </Field>
              <Field label={t.form.phone}>
                <input
                  required
                  name="phone"
                  type="tel"
                  className={fieldClass}
                  placeholder="+40 ..."
                />
              </Field>
              <Field label={t.form.date}>
                <input required name="date" type="date" className={fieldClass} />
              </Field>
              <Field label={t.form.guests}>
                <input
                  required
                  name="guests"
                  type="number"
                  min={1}
                  max={20}
                  defaultValue={2}
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field label={t.form.time}>
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <label key={slot} className="cursor-pointer">
                    <input
                      type="radio"
                      name="time"
                      value={slot}
                      required
                      className="peer sr-only"
                    />
                    <span className="inline-flex min-h-11 items-center px-4 py-2.5 text-xs tracking-[0.15em] border border-line text-ink-muted peer-checked:border-mishi-red peer-checked:text-mishi-red peer-checked:bg-mishi-red/10 transition-colors">
                      {slot}
                    </span>
                  </label>
                ))}
              </div>
            </Field>

            <Field label={t.form.note}>
              <textarea
                name="note"
                rows={3}
                className={`${fieldClass} resize-none`}
                placeholder={t.form.notePh}
              />
            </Field>

            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? t.form.sending : t.form.submit}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] tracking-[0.3em] uppercase text-ink-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
