/**
 * Zile libere legale RO (Codul muncii art. 139) — nu sărbători „de calendar”
 * fără zi liberă de la stat (ex. 8 martie).
 *
 * Fixe: 1–2 ian, 6–7 ian, 24 ian, 1 mai, 1 iun, 15 aug, 30 nov, 1 dec, 25–26 dec.
 * Mobile (rit ortodox / bizantin): Vinerea Mare, Paște (2 zile), Rusalii (2 zile).
 */

const TZ = "Europe/Bucharest";

/** Paștele ortodox (duminică) pe calendarul gregorian */
export function orthodoxEasterSunday(year: number): Date {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  // Julian → Gregorian (valid ~1900–2099; formula generală pe secole)
  const offset = Math.floor(year / 100) - Math.floor(year / 400) - 2;
  const dt = new Date(Date.UTC(year, month - 1, day));
  dt.setUTCDate(dt.getUTCDate() + offset);
  return dt;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

/** YYYY-MM-DD for a civil date in Bucharest */
export function bucharestYmd(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Set of legal holiday YYYY-MM-DD for a given year (Bucharest civil dates) */
export function romanianLegalHolidaySet(year: number): Set<string> {
  const fixed: [number, number][] = [
    [1, 1],
    [1, 2],
    [1, 6],
    [1, 7],
    [1, 24],
    [5, 1],
    [6, 1],
    [8, 15],
    [11, 30],
    [12, 1],
    [12, 25],
    [12, 26],
  ];

  const set = new Set<string>();
  for (const [m, d] of fixed) {
    set.add(
      `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
    );
  }

  const easter = orthodoxEasterSunday(year);
  // Vinerea Mare = Easter − 2; Paște duminică; a doua zi = +1
  set.add(ymd(addDays(easter, -2)));
  set.add(ymd(easter));
  set.add(ymd(addDays(easter, 1)));
  // Rusalii: +49 (duminică), +50 (luni)
  set.add(ymd(addDays(easter, 49)));
  set.add(ymd(addDays(easter, 50)));

  return set;
}

export function isRomanianLegalHoliday(now = new Date()): boolean {
  const today = bucharestYmd(now);
  const year = Number(today.slice(0, 4));
  return romanianLegalHolidaySet(year).has(today);
}
