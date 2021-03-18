import { ActionTree, ActionContext } from "vuex";
import { AccountState, User } from "./types";
import { RootState } from "@/store/types";
import { AccountMutationTypes } from "@/store/modules/account/mutations";

export const actions: ActionTree<AccountState, RootState> & {
  login(
    action: ActionContext<AccountState, RootState>,
    payload: { email: string; password: string }
  ): Promise<User>;
  logout(action: ActionContext<AccountState, RootState>): Promise<void>;
} = {
  login({ commit }, { email }) {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        try {
          const user = {
            email,
            name: "John Doe",
          };
          commit(AccountMutationTypes.LOGIN, user);
          resolve(user);
        } catch (e) {
          reject();
        }
      }, Math.floor(Math.random() * 1500) + 500);
    });
  },
  logout({ commit }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        commit(AccountMutationTypes.LOGOUT);
        resolve();
      } catch (e) {
        reject();
      }
    });
  },
};
