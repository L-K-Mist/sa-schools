import apollo from "@/apollo";
import { ALL_SCHOOLS, SCHOOL_BY_ID, PROJECT_SCHOOLS } from "@/gql/queries.js";

const state = {
  markerPosition: { lat: -28.63324560499325, lng: 30.827636718750004 },
  phases: [
    "Combined School",
    "Intermediate School",
    "Pre-Primary School",
    "Primary School",
    "Secondary School",
    "Special Needs School",
  ],
  regions: [
    "ABAQULUSI",
    "ETHEKWINI",
    "TO BE UPDATED",
    "UKHAHLAMBA",
    "UMGUNGUNDLOVU",
    "VRYHEID",
    "ZULULAND",
  ],
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

const mutations = {
  markerPosition: (state, payload) => {
    state.markerPosition = payload;
  },

  kznSchools: (state, payload) => {
    state.kznSchools = payload;
  },
};

const actions = {
  async kznSchools({ commit }, payload) {
    //const selectedRegions = ["TO BE UPDATED"];
    const parsedRegions = payload.regions.map((selection) => {
      return { DistrictMunicipalityName: { _ilike: selection } };
    });
    const parsedPhases = payload.phases.map((selection) => {
      return { phase: { _ilike: selection } };
    });
    try {
      const response = await apollo.query({
        query: KZN_SCHOOLS_GPS,
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
      console.log("TCL: getSchoolsKZN -> error", error);
    }
  },
  async projectSchools({ commit }) {
    try {
      const response = await apollo.query({
        query: PROJECT_SCHOOLS,
        // fetchPolicy: "no-cache" // Already got data persistence with Vuex Persist plus this is a huge array
      });
      console.log("TCL: getSchoolsKZN -> response", response.data.sa_schools);
      commit("kznSchools", response.data.sa_schools);
    } catch (error) {
      console.log("TCL: getSchoolsKZN -> error", error);
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
      console.log("TCL: fetchSchool -> response", response.data.sa_schools[0]);
      state.activeSchool = response.data.sa_schools[0];
      state.showSchool = true;
    } catch (error) {
      console.log("TCL: fetchSchool -> error", error);
    }
  },
  showSchool({ state }, payload) {
    state.showSchool = payload;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
