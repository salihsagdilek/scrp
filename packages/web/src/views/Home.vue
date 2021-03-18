<template>
  <div class="home">
    <h1>{{ $t("pages.homepage.title") }}</h1>
    <i18n path="pages.homepage.description" tag="p">
      <template #action>
        <a href="#" @click.prevent="handleAction"
          >{{ isLogin ? $t("logout") : $t("login") }}
        </a>
      </template>
      <template #contactUs>
        <router-link :to="{ name: 'contactUs' }"
          >{{ $t("contactUs") }}
        </router-link>
      </template>
    </i18n>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventBus } from "@/utils/eventBus";
import { namespace } from "vuex-class";

const accountModule = namespace("account");
@Component<Home>({
  name: "Home",
  metaInfo() {
    return {
      title: this.$t("pages.homepage.title") as string,
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    };
  },
})
export default class Home extends Vue {
  @accountModule.Getter("isLogin") isLogin;
  @accountModule.Action("logout") logout;

  handleAction(): void {
    if (this.isLogin) {
      this.logout();
    } else {
      eventBus.$emit("openLoginModal");
    }
  }
}
</script>
