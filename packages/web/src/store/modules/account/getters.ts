import { GetterTree } from "vuex";
import { RootState } from "@/store/types";
import { AccountState, User } from "./types";

export const getters: GetterTree<AccountState, RootState> & {
  isLogin(state: AccountState): boolean;
  getUser(state: AccountState): User | undefined;
} = {
  isLogin(state) {
    return !!state.user;
  },
  getUser(state) {
    return state.user;
  },
};
