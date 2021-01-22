import apollo from "@/apollo";
import { ALL_SCHOOLS, SCHOOLS_FILTER, SCHOOL_BY_ID } from "@/gql/queries.js";

const state = {
  markerPosition: { lat: -28.552743254412608, lng: 24.488525390625 },
  // phases: [
  //   "Combined School",
  //   "Intermediate School",
  //   "Pre-Primary School",
  //   "Primary School",
  //   "Secondary School",
  //   "Special Needs School",
  // ],
  // regions: [
  //   "ABAQULUSI",
  //   "ETHEKWINI",
  //   "TO BE UPDATED",
  //   "UKHAHLAMBA",
  //   "UMGUNGUNDLOVU",
  //   "VRYHEID",
  //   "ZULULAND",
  // ],
  kznSchools: null,
  activeSchool: null,
  showSchool: false,
};

const getters = {
  markerPosition: (state) => state.markerPosition,
  kznSchools: (state) => state.kznSchools,
  activeSchool: (state) => state.activeSchool,
  showSchool: (state) => state.showSchool,
  phases: (state) => state.phases,
  regions: (state) => state.regions,
};

const actions = {
  async kznSchools({ commit }, payload) {
    //const selectedRegions = ["TO BE UPDATED"];
    const parsedRegions = payload.regions.map((selection) => {
      return { DistrictMunicipalityName: { _ilike: selection } };
    });
    const parsedPhases = payload.phases.map((selection) => {
      return { phase: { _ilike: `%${selection.split(" ")[0]}%` } }; // Some wrangling so that for example combined and combined school would both return well-formed.
    });
    try {
      // const response = await apollo.query({
      //   query: ALL_SCHOOLS,
      // });
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
      console.log("TCL: getSchoolsKZN -> response", response.data.rsa_schools);
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
      console.log("TCL - fetchSchool - state.activeSchool", state.activeSchool);
      state.showSchool = true;
    } catch (error) {
      console.error("TCL: fetchSchool -> error", error);
    }
  },
  showSchool({ state }, payload) {
    state.showSchool = payload;
  },
  async fetchSchoolsNear({ state }, payload) {
    const { lat, lng } = payload;
    console.log("fetchSchoolsNear - payload", payload);
    // try {
    //   const response = await apollo.query({
    //     query: SCHOOLS_NEAR,
    //     variables: {
    //       lat,
    //       lng,
    //     },
    //   });
    // } catch (error) {
    //   console.log("TCL ~ fetchSchoolsNear ~ error", error);
    // }
  },
  setUserLocation({ commit }, payload) {
    const { latitude: lat, longitude: lng } = payload;
    commit("setUserLocation", { lat, lng });
  },
};

const mutations = {
  markerPosition: (state, payload) => {
    state.markerPosition = payload;
  },

  kznSchools: (state, payload) => {
    state.kznSchools = payload;
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
