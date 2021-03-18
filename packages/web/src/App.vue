<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
    <v-footer> footer</v-footer>
    <login-modal />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { setUserLanguage } from "@/utils/languageStorage";
import AppBar from "@/components/AppBar.vue";
import LoginModal from "@/components/LoginModal.vue";

@Component<App>({
  name: "App",
  components: {
    LoginModal,
    AppBar,
  },
})
export default class App extends Vue {
  @Watch("$i18n.locale")
  onLanguageChange(language: string): void {
    setUserLanguage(language);
  }
}
</script>
