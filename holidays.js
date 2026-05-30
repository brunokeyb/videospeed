// Brazilian federal holidays calculator.
// Includes fixed-date national holidays and Easter-derived ones (Carnaval, Sexta-feira Santa, Corpus Christi).

(function (global) {
  function easter(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(Date.UTC(year, month - 1, day));
  }

  function addDays(date, days) {
    const d = new Date(date);
    d.setUTCDate(d.getUTCDate() + days);
    return d;
  }

  function ymd(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function holidaysFor(year) {
    const e = easter(year);
    const carnavalTer = addDays(e, -47);
    const carnavalSeg = addDays(e, -48);
    const sextaSanta = addDays(e, -2);
    const corpusChristi = addDays(e, 60);

    return new Set([
      `${year}-01-01`, // Confraternização Universal
      ymd(carnavalSeg),
      ymd(carnavalTer),
      ymd(sextaSanta),
      `${year}-04-21`, // Tiradentes
      `${year}-05-01`, // Dia do Trabalho
      ymd(corpusChristi),
      `${year}-09-07`, // Independência
      `${year}-10-12`, // Nossa Senhora Aparecida
      `${year}-11-02`, // Finados
      `${year}-11-15`, // Proclamação da República
      `${year}-11-20`, // Dia da Consciência Negra
      `${year}-12-25`, // Natal
    ]);
  }

  const cache = new Map();
  function isHoliday(date) {
    const y = date.getUTCFullYear();
    if (!cache.has(y)) cache.set(y, holidaysFor(y));
    return cache.get(y).has(ymd(date));
  }

  function isBusinessDay(date) {
    const dow = date.getUTCDay();
    if (dow === 0 || dow === 6) return false;
    return !isHoliday(date);
  }

  function businessDaysBetween(startIso, endIso) {
    const out = [];
    let d = new Date(startIso + "T00:00:00Z");
    const end = new Date(endIso + "T00:00:00Z");
    while (d <= end) {
      if (isBusinessDay(d)) out.push(ymd(d));
      d = addDays(d, 1);
    }
    return out;
  }

  function nextBusinessDay(isoDate) {
    let d = addDays(new Date(isoDate + "T00:00:00Z"), 1);
    while (!isBusinessDay(d)) d = addDays(d, 1);
    return ymd(d);
  }

  global.Holidays = { isHoliday, isBusinessDay, businessDaysBetween, nextBusinessDay, ymd };
})(window);
