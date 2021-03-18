import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { account } from "./modules/account";

Vue.use(Vuex);
const store: StoreOptions<RootState> = {
  state: {
    version: "0.1.0",
  },
  mutations: {},
  actions: {},
  modules: {
    account,
  },
};
export default new Vuex.Store<RootState>(store);
