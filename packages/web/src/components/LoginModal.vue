<template>
  <v-dialog v-model="loginModal" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline"> {{ $t("login") }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :label="`${$t('labels.email')}*`"
                  required
                  :rules="emailRules"
                  v-model="credentialModel.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="`${$t('labels.password')}*`"
                  type="password"
                  required
                  :rules="passwordRules"
                  v-model="credentialModel.password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>{{ $t("requiredHint") }}</small>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="loginModal = false">
          {{ $t("close") }}
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleLogin">
          {{ $t("login") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { eventBus } from "@/utils/eventBus";

const accountModule = namespace("account");

@Component({
  name: "LoginModal",
})
export default class LoginModal extends Vue {
  @accountModule.Action("login") login;
  @Ref("form") readonly form;
  loginModal = false;
  overlay = false;
  credentialModel = {
    email: "",
    password: "",
  };
  valid = true;
  passwordRules = [
    (v: string) => !!v || "Password is required",
    (v: string) =>
      (v && v.length > 5) || "Name must be bigger than 6 characters",
  ];
  emailRules = [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ];

  mounted(): void {
    eventBus.$on("openLoginModal", () => (this.loginModal = true));
  }

  handleLogin(): void {
    if (this.form.validate()) {
      this.overlay = true;
      this.login(this.credentialModel).then(() => {
        this.loginModal = false;
        this.overlay = false;
      });
    }
  }
}
</script>

<style scoped></style>
