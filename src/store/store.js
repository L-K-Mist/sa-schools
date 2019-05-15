import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Map from "./modules/Map";

const vuexLocal = new VuexPersistence({
  supportCircular: true, // to solve errors I was getting
  storage: window.localStorage,
  modules: ["Authentication", "Map"]
  // modules: ["MarketsMap", 'RegisterStall', 'Authentication', 'ModifyState']
});

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Map
  },
  plugins: [vuexLocal.plugin]
});

export default store;
