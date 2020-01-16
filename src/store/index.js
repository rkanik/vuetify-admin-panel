import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules/_index";
import createLogger from "vuex/dist/logger";
//import createPersistedstate from "vuex-persistedstate";

Vue.use(Vuex);
//const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
   modules,
   plugins: [createLogger(),/* createPersistedstate({paths: [""]})*/]
});
