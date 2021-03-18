import { Module } from "vuex";
import { AccountState } from "./types";
import { RootState } from "@/store/types";

import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";

export const state: AccountState = {
  user: undefined,
};

const namespaced = true;

export const account: Module<AccountState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
