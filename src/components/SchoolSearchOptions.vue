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
        <strong>https://schools.dev.welink.net.za/v1alpha1/graphql</strong> and
        paste that into
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
            Regions
          </h3>
          <!-- <v-autocomplete
            v-model="selectedRegions"
            :items="regionOptions"
            outlined
            dense
            chips
            small-chips
            label="Region"
            multiple
          ></v-autocomplete> -->
        </v-flex>

        <v-flex xs6>
          <h3 class="heading">
            Learning Phases
          </h3>
          <v-checkbox
            v-model="selectedPhases"
            label="Special Needs School"
            value="SPECIAL NEEDS EDUCATION SCHOOL"
            hide-details
          />
          <v-checkbox
            v-model="selectedPhases"
            label="Secondary School"
            value="SECONDARY SCHOOL"
            hide-details
          />
          <v-checkbox
            v-model="selectedPhases"
            label="Primary School"
            value="PRIMARY SCHOOL"
            hide-details
          />
          <v-checkbox
            v-model="selectedPhases"
            label="Pre-Primary School"
            value="PRE-PRIMARY SCHOOL"
            hide-details
          />
          <v-checkbox
            v-model="selectedPhases"
            label="Intermediate School"
            value="INTERMEDIATE SCHOOL"
            hide-details
          />
          <v-checkbox
            v-model="selectedPhases"
            label="Combined School"
            value="COMBINED SCHOOL"
            hide-details
          />
        </v-flex>
        <v-layout row justify-center>
          <br />
          <v-btn dark large color="cyan" @click="fetchSchools">
            <v-icon dark> fa-map-marked-alt </v-icon>&nbsp; Place Markers
          </v-btn>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedRegions: [],
      regionOptions: [
        "Alfred Nzo",
        "ALFRED NZO",
        "Amajuba",
        "Amathole",
        "Bojanala",
        "Buffalo City",
        "Cacadu",
        "Cape Winelands",
        "CAPE WINELANDS",
        "Capricorn",
        "Central Karoo",
        "CENTRAL KAROO",
        "CENTRAL KAROO DISTRICT MUNICIPALITY",
        "Chris Hani",
        "City of Cape Town",
        "CITY OF CAPE TOWN",
        "City of Johannesburg",
        "City of Tshwane",
        "Dr Kenneth Kaunda",
        "Dr Ruth Segomotsi Mompati",
        "Eden",
        "Ehlanzeni",
        "Ekurhuleni",
        "eThekwini",
        "Fezile Dabi",
        "Frances Baard",
        "GARDEN ROUTE",
        "Gert Sibande",
        "GERT SIBANDE DISTRICT MUNICIPALITY",
        "iLembe",
        "Joe Gqabi",
        "John Taolo Gaetsewe",
        "Lejweleputswa",
        "Mangaung",
        "Mopani",
        "Namakwa",
        "Nelson Mandela Bay",
        "Ngaka Modiri Molema",
        "Nkangala",
        "O.R.Tambo",
        "Overberg",
        "OVERBERG",
        "Pixley ka Seme",
        "SARAH BAARTMAN",
        "Sedibeng",
        "Sekhukhune",
        "Sisonke",
        "Thabo Mofutsanyane",
        "Ugu",
        "Umgungundlovu",
        "Umkhanyakude",
        "Umzinyathi",
        "Uthukela",
        "Uthungulu",
        "Vhembe",
        "Waterberg",
        "West Coast",
        "WEST COAST",
        "West Rand",
        "Xhariep",
        "Z F Mgcawu",
        "Zululand",
        null,
      ],
      selectedPhases: ["SECONDARY SCHOOL"],
    };
  },
  computed: {},
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
