<template>
  <v-app>
    <v-app-bar
      color="#aad3df"
      style="z-index:999;"
      class="main-toolbar"
      scroll-off-screen
      app
    >
      <v-toolbar-title class="headline text-uppercase"
        >South African Schools Data</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn color="#f2efe9" @click.stop="drawer = !drawer"
        ><v-icon class="mr-3">mdi-map-search-outline</v-icon> Find
        Schools</v-btn
      >
    </v-app-bar>
    <v-navigation-drawer
      class="map-filter"
      v-model="drawer"
      right
      app
      clipped
      style="z-index: 500;"
    >
      <h3 color="grey">Search for Schools</h3>
      <v-autocomplete
        v-model="selectedProvinces"
        :items="provinceOptions"
        item-value="abbreviation"
        item-text="name"
        outlined
        dense
        chips
        small-chips
        label="Provinces"
        multiple
      ></v-autocomplete>
      <v-autocomplete
        v-model="selectedRegions"
        :items="regionOptions"
        item-value="name"
        item-text="name"
        outlined
        dense
        chips
        small-chips
        label="Regions"
        multiple
      ></v-autocomplete>
      <v-autocomplete
        v-model="selectedPhases"
        :items="phaseOptions"
        outlined
        dense
        chips
        small-chips
        label="Phases"
        multiple
      ></v-autocomplete>
      <v-btn
        dark
        large
        color="cyan"
        @click="fetchSchools"
        :loading="$store.state.Map.loading"
      >
        <v-icon class="mr-3" dark> mdi-map</v-icon>Place Markers
      </v-btn>
    </v-navigation-drawer>
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { regions, provinces } from "@/helpers/Constants";
export default {
  name: "App",
  components: {},
  data() {
    return {
      drawer: false,
      selectedRegions: ["zululand"],
      // regionOptions: regions,
      selectedPhases: ["Secondary School"],
      phaseOptions: [
        "Combined School",
        "Intermediate School",
        "Pre-Primary School",
        "Primary School",
        "Secondary School",
        "Special Needs School",
      ],
      selectedProvinces: null,
      provinceOptions: provinces,
    };
  },
  computed: {
    regionOptions() {
      if (!this.selectedProvinces) return regions;

      let filtered = regions.filter((region) =>
        this.selectedProvinces.includes(region.province)
      );
      return filtered;
    },
  },
  async mounted() {
    let response = { data: {} };
    try {
      response = await axios.get(
        `https://api.ipregistry.co/?key=8rostuxfd16ju3&pretty=true&fields=ip,location.city,location.latitude,location.longitude`
      );
      // throw "error on purpose";
    } catch (error) {
      // If the api lookup doesn't work at least send something on to the map to go on with.
      response.data.location = {
        city: "Jeffreys Bay",
        latitude: -33.89609,
        longitude: 24.86859,
      };
      console.error(error);
    }
    const returnedVal = response.data.location;
    await this.$store.dispatch("setUserLocation", returnedVal);
    await this.$store.dispatch("fetchSchoolsNear");
    setTimeout(() => {
      this.$store.dispatch("setView", {
        lat: returnedVal.latitude,
        lng: returnedVal.longitude,
      });
    }, 1000);
  },
  methods: {
    fetchSchools() {
      this.$store.dispatch("kznSchools", {
        regions: this.selectedRegions,
        phases: this.selectedPhases,
      });
    },
  },
};
</script>

<style>
.map-filter.v-navigation-drawer--clipped {
  padding: 20px 30px;
  width: 400px;
}

.main-toolbar .v-toolbar__content {
  z-index: 40;
}

@media screen and (max-width: 1300px) {
  .map-filter.v-navigation-drawer {
    padding: 80px 30px;
    width: 350px;
    background-color: antiquewhite;
  }
}
</style>
