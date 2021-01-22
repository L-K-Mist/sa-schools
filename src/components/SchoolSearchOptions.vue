<template>
  <div>
    <h1 class="headline">
      What you're seeing
    </h1>
    <br />
    <v-flex xs12>
      <p>
        This map uses publicly available data from
        <a
          href="https://www.education.gov.za/Programmes/EMIS/EMISDownloads.aspx"
          target="_blank"
          >the Department of Basic Education</a
        >. The data has been uploaded to a postgreSQL database, with
        <a href="https://hasura.io/" target="_blank">Hasura</a>
        autogenerating a GraphQL api. This statically-hosted, VueJs frontend
        that you see before you; consumes that public api. JAMStack-Style!! :)
      </p>
      <p>
        To play with this School Data in a GraphiQL sandbox, copy this api's
        endpoint
        <strong>https://sa-schools-data.dev.welink.net.za/v1/graphql</strong>
        and paste that into
        <a
          href="https://graphiql-online.com/"
          target="_blank"
          rel="noopener noreferrer"
          >GraphiQL-Online</a
        >. While getting your bearings with the data, CTRL + SPACE for
        auto-suggest is your friend.
      </p>
      <p>
        My hope is that by making this data more publicly available we can make
        the existing data both:
      </p>
      <ol>
        <li>More usefull</li>
        <li>More accurate</li>
      </ol>
    </v-flex>
    <br />
    <h1 class="headline">
      The Map
    </h1>
    <br />
    <p>
      Please refine your search criterion (keeping in mind there's more than
      5000 schools in KZN alone - that's a lot to fetch from the web at once!)
    </p>
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
            label="Region"
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
    this.$store.dispatch("kznSchools", {
      regions: this.selectedRegions,
      phases: this.selectedPhases,
    });
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
