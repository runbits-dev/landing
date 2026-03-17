import { es } from './es';
import { en } from './en';
import { pt } from './pt';

export const translations = { es, en, pt };
export type Locale = keyof typeof translations;
export type Translations = typeof es;

export function t(locale: Locale): Translations {
  return translations[locale] ?? translations.es;
}
