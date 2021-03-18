import { STORAGE_KEYS } from "@/constants/StorageKeys";

const BrowserLang = window.navigator.language.replace(/[-_][A-Z].+/, "");

export function getUserLanguage() {
  const localLanguage = window.localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  return localLanguage || BrowserLang;
}

export function setUserLanguage(lang: string) {
  window.localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
}
