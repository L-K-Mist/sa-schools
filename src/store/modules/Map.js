import apollo from "@/apollo";
import { SCHOOLS_NEARBY, SCHOOLS_FILTER, SCHOOL_BY_ID } from "@/gql/queries.js";

const state = {
  map: null,
  markerPosition: { lat: -28.552743254412608, lng: 24.488525390625 },
  kznSchools: null,
  activeSchool: null,
  showSchool: false,
  loading: false,
};

const getters = {
  nearbyRange: (state) => {
    const { lat, lng } = state.markerPosition;
    const searchWideness = 0.4;
    return {
      _and: [
        { lat: { _gte: lat - searchWideness } },
        { lat: { _lte: lat + searchWideness } },
        { lng: { _gte: lng - searchWideness } },
        { lng: { _lte: lng + searchWideness } },
      ],
    };
  },
};

const actions = {
  setMap({ commit }, payload) {
    commit("setMap", payload);
  },
  async kznSchools({ commit }, payload) {
    //const selectedRegions = ["TO BE UPDATED"];
    const parsedRegions = payload.regions.map((selection) => {
      return { DistrictMunicipalityName: { _ilike: `%${selection}%` } };
    });
    const parsedPhases = payload.phases.map((selection) => {
      return { phase: { _ilike: `%${selection.split(" ")[0]}%` } }; // Some wrangling so that for example combined and combined school would both return well-formed.
    });
    try {
      const response = await apollo.query({
        query: SCHOOLS_FILTER,
        fetchPolicy: "no-cache", // Already got data persistence with Vuex Persist plus this is a huge array
        variables: {
          searchLogic: {
            _or: parsedRegions,
            _and: {
              _or: parsedPhases,
            },
          },
        },
      });
      commit("kznSchools", response.data.rsa_schools);
    } catch (error) {
      console.error("TCL: getSchoolsKZN -> error", error);
    }
  },
  async fetchSchool({ state }, payload) {
    try {
      const response = await apollo.query({
        query: SCHOOL_BY_ID,
        variables: {
          id: payload,
        },
      });
      state.activeSchool = response.data.rsa_schools_by_pk;
      state.showSchool = true;
    } catch (error) {
      console.error("TCL: fetchSchool -> error", error);
    }
  },
  showSchool({ state }, payload) {
    state.showSchool = payload;
  },
  async fetchSchoolsNear({ state, getters, commit }) {
    state.loading = true;
    try {
      const response = await apollo.query({
        query: SCHOOLS_NEARBY,
        variables: {
          nearbyRange: getters.nearbyRange,
        },
      });
      commit("kznSchools", response.data.rsa_schools);
      state.loading = false;
    } catch (error) {
      console.log("TCL ~ fetchSchoolsNear ~ error", error);
      state.loading = false;
    }
  },
  setUserLocation({ commit }, payload) {
    const { latitude: lat, longitude: lng } = payload;
    commit("setUserLocation", { lat, lng });
  },
  setView({ state }, payload) {
    const { lat, lng } = payload;
    state.map.setView(payload, 7);
  },
};

const mutations = {
  setMap: (state, payload) => {
    state.map = payload;
  },
  markerPosition: (state, payload) => {
    state.markerPosition = payload;
  },

  kznSchools: (state, payload) => {
    state.kznSchools = payload;
    console.log("state.kznSchools", state.kznSchools);
  },
  setUserLocation: (state, payload) => {
    state.markerPosition = payload;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
