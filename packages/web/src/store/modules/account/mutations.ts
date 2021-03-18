import { MutationTree } from "vuex";
import { AccountState, User } from "./types";

export const AccountMutationTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const mutations: MutationTree<AccountState> = {
  [AccountMutationTypes.LOGIN](state, user: User) {
    state.user = user;
  },
  [AccountMutationTypes.LOGOUT](state) {
    state.user = undefined;
  },
};
