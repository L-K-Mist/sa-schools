<template>
  <div>
    <v-flex xs12>
      <p>
        This map uses publicly available data from
        <a
          href="https://www.education.gov.za/Programmes/EMIS/EMISDownloads.aspx"
          target="blank"
          >the Department of Basic Education</a
        >. The data has been uploaded to a postgreSQL database, wrapped in
        <a href="https://hasura.io/" target="blank">Hasura</a>
        , as a GraphQL api. This statically-hosted, VueJs frontend; consumes
        that public api. JAMStack-Style!! :)
      </p>
      <p>
        To play with this School Data in the lovely GraphiQL sandbox, copy this
        data's endpoint [https://schools.dev.welink.net.za/v1alpha1/graphql] and
        paste that into
        <a
          href="https://graphiql-online.com/"
          target="_blank"
          rel="noopener noreferrer"
          >GraphiQL-Online</a
        >.
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
    <p>
      Please refine your search criterion (keeping in mind there's more than
      5000 schools in KZN alone - that's a lot to fetch from the web at once!)
    </p>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
          <h3 class="heading">Regions</h3>
          <v-checkbox
            v-model="selectedRegions"
            label="Abaqulusi"
            value="ABAQULUSI"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedRegions"
            label="Ethekwini"
            value="ETHEKWINI"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedRegions"
            label="To Be Updated"
            value="TO BE UPDATED"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedRegions"
            label="Ukhahlamba"
            value="UKHAHLAMBA"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedRegions"
            label="Umgungundlovu"
            value="UMGUNGUNDLOVU"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedRegions"
            label="Vryheid"
            value="VRYHEID"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedRegions"
            label="Zululand"
            value="ZULULAND"
            hide-details
          ></v-checkbox>
          <p>{{ selectedRegions }}</p>
        </v-flex>

        <v-flex xs6>
          <h3 class="heading">Learning Phases</h3>
          <v-checkbox
            v-model="selectedPhases"
            label="Special Needs School"
            value="SPECIAL NEEDS EDUCATION SCHOOL"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedPhases"
            label="Secondary School"
            value="SECONDARY SCHOOL"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedPhases"
            label="Primary School"
            value="PRIMARY SCHOOL"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedPhases"
            label="Pre-Primary School"
            value="PRE-PRIMARY SCHOOL"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedPhases"
            label="Intermediate School"
            value="INTERMEDIATE SCHOOL"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedPhases"
            label="Combined School"
            value="COMBINED SCHOOL"
            hide-details
          ></v-checkbox>
          <p>{{ selectedPhases }}</p>
        </v-flex>
        <v-layout row justify-center>
          <v-btn @click="fetchSchools" dark large color="cyan">
            <v-icon dark>fa-map-marked-alt</v-icon>&nbsp; Place Markers
          </v-btn>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>
map-marked-alt style="position: relative; right: 0px; bottom: 0px"
<script>
export default {
  mounted() {
    this.$store.dispatch("kznSchools", {
      regions: this.selectedRegions,
      phases: this.selectedPhases
    });
  },
  data() {
    return {
      selectedRegions: ["ETHEKWINI", "ZULULAND"],
      selectedPhases: ["SECONDARY SCHOOL"]
    };
  },
  computed: {},
  methods: {
    fetchSchools() {
      this.$store.dispatch("kznSchools", {
        regions: this.selectedRegions,
        phases: this.selectedPhases
      });
    }
  }
};
</script>

<style scoped></style>
