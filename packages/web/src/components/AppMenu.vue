<template>
  <ul class="app-menu">
    <li>
      <router-link :to="{ name: 'homepage' }" exact
        >{{ $t("pages.homepage.pageName") }}
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'contactUs' }"
        >{{ $t("pages.contactUs.pageName") }}
      </router-link>
    </li>
    <li v-if="!isLogin">
      <a href="#" @click.prevent="handleLogin">{{ $t("login") }} </a>
    </li>
    <li v-if="isLogin">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <a href="#" v-bind="attrs" v-on="on">
            {{ user.name }}
          </a>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>{{ $t("logout") }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { eventBus } from "@/utils/eventBus";

const accountModule = namespace("account");

@Component({
  name: "AppMenu",
})
export default class AppMenu extends Vue {
  @accountModule.Getter("isLogin") isLogin;
  @accountModule.Getter("getUser") user;
  @accountModule.Action("logout") logout;

  handleLogin(): void {
    eventBus.$emit("openLoginModal");
  }
}
</script>

<style lang="scss">
.app-menu {
  padding: 0 !important;
  margin: 0;
  display: flex;
  list-style: none;

  li {
    a {
      color: var(--v-accent-lighten5);
      text-decoration: none;

      &.router-link-active {
        color: var(--v-accent-lighten2);
      }
    }
  }

  > :not([hidden]) ~ :not([hidden]) {
    margin-left: 1rem;
  }
}
</style>
