import Vue from "vue";
import Vuex from "vuex";
// import VuexPersistence from "vuex-persist";
import Map from "./modules/Map";

// TODO: Check about renaming this vuex-persist to avoid multi-site clashes on the browser.
// const vuexLocal = new VuexPersistence({
//   supportCircular: true, // to solve errors I was getting
//   storage: window.localStorage,
//   // modules: ["Map"]
//   modules: []
// });

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Map
  }
  // plugins: [vuexLocal.plugin]
});

export default store;
