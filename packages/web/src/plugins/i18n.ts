import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "../locales";
import { getUserLanguage } from "@/utils/languageStorage";

Vue.use(VueI18n);
const userLanguage = getUserLanguage();

export default new VueI18n({
  locale: userLanguage || process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages,
});
