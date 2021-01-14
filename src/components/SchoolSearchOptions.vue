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
          <v-checkbox
            v-model="selectedRegions"
            label="Abaqulusi"
            value="ABAQULUSI"
            hide-details
          />
          <v-checkbox
            v-model="selectedRegions"
            label="Ethekwini"
            value="ETHEKWINI"
            hide-details
          />
          <v-checkbox
            v-model="selectedRegions"
            label="To Be Updated"
            value="TO BE UPDATED"
            hide-details
          />
          <v-checkbox
            v-model="selectedRegions"
            label="Ukhahlamba"
            value="UKHAHLAMBA"
            hide-details
          />
          <v-checkbox
            v-model="selectedRegions"
            label="Umgungundlovu"
            value="UMGUNGUNDLOVU"
            hide-details
          />
          <v-checkbox
            v-model="selectedRegions"
            label="Vryheid"
            value="VRYHEID"
            hide-details
          />
          <v-checkbox
            v-model="selectedRegions"
            label="Zululand"
            value="ZULULAND"
            hide-details
          />
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
          <br />
          <v-btn
            block
            color="success"
            @click="$store.dispatch('projectSchools')"
          >
            Show Me the Project Schools
          </v-btn>
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
      selectedRegions: ["ETHEKWINI", "ZULULAND"],
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
