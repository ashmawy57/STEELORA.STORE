/**
 * Currency and Price Formatting for STEELORA (EGP)
 * Prices are stored in integer piasters (1 EGP = 100 piasters)
 */

export function formatEGP(
  piasters: number | null | undefined,
  locale: "en" | "ar" = "en"
): string {
  if (piasters === null || piasters === undefined || isNaN(piasters)) {
    return locale === "ar" ? "٠ ج.م" : "EGP 0";
  }

  const egp = Math.round(piasters / 100);

  if (locale === "ar") {
    // Format Arabic with Egyptian Arabic locale
    const formatted = new Intl.NumberFormat("ar-EG", {
      useGrouping: true,
    }).format(egp);
    return `${formatted} ج.م`;
  } else {
    // Format English
    const formatted = new Intl.NumberFormat("en-EG", {
      useGrouping: true,
    }).format(egp);
    return `EGP ${formatted}`;
  }
}

export function piastersToEGP(piasters: number): number {
  return Math.round(piasters / 100);
}

export function egpToPiasters(egp: number): number {
  return Math.round(egp * 100);
}
