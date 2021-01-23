<template>
  <div>
    <h1 class="headline">
      The Map
    </h1>
    <br />
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
          <h3 class="heading">
            Provinces
          </h3>
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
        </v-flex>
        <v-flex xs6>
          <h3 class="heading">
            Regions
          </h3>
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
        </v-flex>
        <v-flex xs6>
          <h3 class="heading">
            Learning Phases
          </h3>
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
        </v-flex>
        <v-layout row justify-center>
          <br />
          <v-btn dark large color="cyan" @click="fetchSchools">
            <v-icon class="mr-3" dark> mdi-map</v-icon>Place Markers
          </v-btn>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { regions, provinces } from "@/helpers/Constants";
export default {
  data() {
    return {
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
  mounted() {
    // this.$store.dispatch("kznSchools", {
    //   regions: this.selectedRegions,
    //   phases: this.selectedPhases,
    // });
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

<style scoped></style>
