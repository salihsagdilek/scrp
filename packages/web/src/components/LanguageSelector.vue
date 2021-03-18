<template>
  <div class="language-selector">
    <v-select :items="locales" v-model="$i18n.locale">
      <template slot="selection" slot-scope="{ item }">
        <div class="language-selector-icon">
          <img :src="require(`@/assets/flags/${item}.svg`)" />
        </div>
        {{ $t(`languages.${item}`) }}
      </template>
      <template slot="item" slot-scope="{ item }">
        <div class="language-selector-icon">
          <img :src="require(`@/assets/flags/${item}.svg`)" />
        </div>
        {{ $t(`languages.${item}`) }}
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "LanguageSelector",
})
export default class LanguageSelector extends Vue {
  get locales(): string[] {
    return this.$i18n.availableLocales;
  }
}
</script>

<style lang="scss">
.language-selector-icon {
  width: 24px;
  height: 24px;
  line-height: 30px;
  margin-right: 10px;
}
</style>
