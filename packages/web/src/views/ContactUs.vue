<template>
  <div class="about container">
    <h1>{{ $t("pages.contactUs.title") }}</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="formModel.title"
        :counter="25"
        :rules="requiredRules"
        :label="`${$t('labels.title')}*`"
        required
      ></v-text-field>
      <v-text-field
        v-model="formModel.name"
        :rules="requiredRules"
        :label="`${$t('labels.name')}*`"
        required
      ></v-text-field>

      <v-text-field
        v-model="formModel.email"
        :rules="emailRules"
        :label="`${$t('labels.email')}*`"
        required
      ></v-text-field>

      <v-text-field
        v-model="formModel.phoneNumber"
        :rules="phoneRules"
        :label="`${$t('labels.phoneNumber')}*`"
        required
      ></v-text-field>

      <v-autocomplete
        v-model="formModel.countryCode"
        :items="countries"
        :rules="requiredRules"
        :label="`${$t('labels.country')}*`"
        required
      >
        <template slot="selection" slot-scope="{ item }">
          {{ $t(`countries.${item}`) }}
        </template>
        <template slot="item" slot-scope="{ item }">
          {{ $t(`countries.${item}`) }}
        </template>
      </v-autocomplete>

      <v-textarea
        name="input-7-1"
        :label="`${$t('labels.description')}*`"
        :rules="requiredRules"
        v-model="formModel.text"
      ></v-textarea>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="handleSubmit"
      >
        {{ $t("send") }}
      </v-btn>
    </v-form>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { COUNTRIES } from "@/constants/Countries";
import { User } from "@/store/modules/account/types";

const accountModule = namespace("account");

@Component<ContactUs>({
  name: "ContactUs",
  metaInfo() {
    return {
      title: this.$t("pages.contactUs.title") as string,
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    };
  },
})
export default class ContactUs extends Vue {
  @accountModule.Getter("getUser") user;
  @Ref("form") readonly form;
  overlay = false;
  formModel = {
    title: "",
    name: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
    text: "",
  };
  valid = true;
  requiredRules = [(v: string) => !!v || this.$t("validations.required")];
  phoneRules = [
    (v: string) => !!v || this.$t("validations.required"),
    (v: string) => /^[0-9]+$/.test(v) || this.$t("validations.phone"),
  ];
  emailRules = [
    (v: string) => !!v || this.$t("validations.required"),
    (v: string) => /.+@.+\..+/.test(v) || this.$t("validations.email"),
  ];

  mergeUser(user: User): void {
    if (!this.formModel.email) {
      this.formModel = {
        ...this.formModel,
        ...user,
      };
    }
  }

  handleSubmit(): void {
    if (this.form.validate()) {
      this.overlay = true;
      console.log(this.formModel);
      setTimeout(() => {
        this.overlay = false;
      }, 500);
    }
  }

  get countries(): string[] {
    return COUNTRIES;
  }

  @Watch("user", { immediate: true })
  watchUser(user: User): void {
    if (user) {
      this.mergeUser(user);
    }
  }
}
</script>
<style lang="scss">
.about {
}
</style>
