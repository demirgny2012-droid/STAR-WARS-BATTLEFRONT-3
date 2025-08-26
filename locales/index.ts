import { en } from './en';
import { tr } from './tr';
import type { Language } from '../types';

export const locales = { en, tr };

type Replacements = { [key: string]: string | number | undefined | null };

export const t = (lang: Language, key: keyof typeof en, replacements?: Replacements): string => {
  let translation = locales[lang]?.[key] || locales['en'][key];
  if (replacements) {
    Object.keys(replacements).forEach(rKey => {
      const value = replacements[rKey];
      if (value !== undefined && value !== null) {
        translation = translation.replace(new RegExp(`{${rKey}}`, 'g'), String(value));
      }
    });
  }
  return translation;
};
