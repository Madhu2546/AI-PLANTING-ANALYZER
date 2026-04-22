import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en.json';
import hi from './translations/hi.json';
import ta from './translations/ta.json';
import te from './translations/te.json';
import bn from './translations/bn.json';
import mr from './translations/mr.json';
import gu from './translations/gu.json';
import kn from './translations/kn.json';
import ml from './translations/ml.json';
import pa from './translations/pa.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ta: { translation: ta },
  te: { translation: te },
  bn: { translation: bn },
  mr: { translation: mr },
  gu: { translation: gu },
  kn: { translation: kn },
  ml: { translation: ml },
  pa: { translation: pa },
};

// Debug mode: enable via ?debugI18n=1 or localStorage.debugI18n="1"
const debugI18n =
  typeof window !== 'undefined' &&
  (new URLSearchParams(window.location.search).get('debugI18n') === '1' ||
    window.localStorage.getItem('debugI18n') === '1');

if (typeof window !== 'undefined') {
  // expose a reset helper for debugging
  (window as unknown as { i18nDebug?: { enable: () => void; disable: () => void } }).i18nDebug = {
    enable: () => {
      window.localStorage.setItem('debugI18n', '1');
      window.location.reload();
    },
    disable: () => {
      window.localStorage.removeItem('debugI18n');
      window.location.reload();
    },
  };
}

// Track missing keys for the Translation Gaps page
const missingKeys = new Set<string>();
if (typeof window !== 'undefined') {
  (window as unknown as { __i18nMissing?: Set<string> }).__i18nMissing = missingKeys;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    saveMissing: true,
    missingKeyHandler: (lngs, ns, key) => {
      const entry = `${lngs?.[0] ?? '?'}::${key}`;
      missingKeys.add(entry);
      if (debugI18n) {
        // eslint-disable-next-line no-console
        console.warn(`[i18n] Missing key: ${entry}`);
      }
    },
    parseMissingKeyHandler: (key) => {
      if (debugI18n) return `⚠️${key}⚠️`;
      return key;
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
