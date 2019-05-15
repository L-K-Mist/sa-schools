import apollo from "@/apollo";
import { KZN_SCHOOLS_GPS, SCHOOL_BY_ID } from "@/gql/queries.js";

const state = {
  markerPosition: { lat: -28.63324560499325, lng: 30.827636718750004 },

  kznSchools: [
    {
      id: 1,
      lat: -28.63324560499325,
      lng: 30.827636718750004,
      location: "I'm not null",
      name: "He's not null"
    },
    {
      id: 2,
      lat: -28.73324560499325,
      lng: 30.727636718750004,
      location: "I'm not null",
      name: "He's not null"
    }
  ],
  activeSchool: null,
  showSchool: false
};

const getters = {
  markerPosition: state => state.markerPosition,
  kznSchools: state => state.kznSchools,
  activeSchool: state => state.activeSchool,
  showSchool: state => state.showSchool
};

const mutations = {
  markerPosition: (state, payload) => {
    state.markerPosition = payload;
  },

  kznSchools: (state, payload) => {
    state.kznSchools = payload;
  }
};

const actions = {
  async kznSchools({ state, commit }) {
    try {
      const response = await apollo.query({
        query: KZN_SCHOOLS_GPS
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
          id: payload
        }
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
