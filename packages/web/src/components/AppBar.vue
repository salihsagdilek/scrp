<template>
  <v-app-bar app color="primary" dark class="app-bar">
    <div>
      <router-link to="/" class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <div class="pageName">
          {{ $t(`pages.${$route.name}.pageName`) }}
        </div>
      </router-link>
    </div>

    <v-spacer></v-spacer>
    <div class="app-bar-right">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-lg-and-up"
      />
      <div class="menu-wrapper hidden-md-and-down">
        <app-menu />
        <language-selector />
      </div>
    </div>
    <v-navigation-drawer v-model="drawer" hide-overlay right temporary app>
      <div class="drawer-content">
        <language-selector />
        <app-menu />
      </div>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LanguageSelector from "@/components/LanguageSelector.vue";
import AppMenu from "@/components/AppMenu.vue";

@Component<AppBar>({
  name: "AppBar",
  components: { AppMenu, LanguageSelector },
})
export default class AppBar extends Vue {
  drawer = false;
}
</script>

<style lang="scss">
.app-bar {
  .app-bar-right {
    .language-selector {
      width: 10rem;
    }
  }

  .menu-wrapper {
    display: flex;
    align-items: center;

    > :not([hidden]) ~ :not([hidden]) {
      margin-left: 2rem;
    }
  }

  .pageName {
    color: #fff;
  }

  .drawer-content {
    padding: 1rem;

    .app-menu {
      flex-direction: column;

      > :not([hidden]) ~ :not([hidden]) {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }
}
</style>
