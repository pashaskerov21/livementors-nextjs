import 'server-only'
import { LocaleType } from './src/types/general/type'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types

interface Dictionaries {
  [key: string]: () => Promise<{ [key: string]: string }>
}

const dictionaries: Dictionaries = {
  az: () => import('./lang/az.json').then((module) => module.default),
  en: () => import('./lang/en.json').then((module) => module.default),
  ru: () => import('./lang/ru.json').then((module) => module.default),
}

export const getTranslate = async (locale: LocaleType) => dictionaries[locale]?.() ?? dictionaries.en()
