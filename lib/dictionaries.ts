import { en } from "./dictionaries/en";
import { ar } from "./dictionaries/ar";

export type Locale = "en" | "ar";
export type Dictionary = typeof en;

export const dictionaries = {
  en,
  ar,
};

export function getDictionary(locale: string): Dictionary {
  if (locale === "ar") {
    return ar as unknown as Dictionary;
  }
  return en;
}

export function isValidLocale(locale: string): locale is Locale {
  return locale === "en" || locale === "ar";
}
