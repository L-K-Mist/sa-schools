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
        <a href="https://hasura.io/" target="blank">Hasura</a>, as a GraphQL
        api, that this statically hosted VueJs frontend consumes.
      </p>
    </v-flex>
    <p>
      Please refine your search criterion (keeping in mind there's more than
      5000 schools in KZN alone - that's a lot to fetch from the web at once!)
    </p>
    <v-flex v-if="regions" xs12>
      <v-layout row wrap>
        <v-checkbox
          v-model="selectedRegions"
          label="Abaqulusi"
          value="ABAQULUSI"
        ></v-checkbox>
        <v-checkbox
          v-model="selectedRegions"
          label="Ethekwini"
          value="ETHEKWINI"
        ></v-checkbox>
        <v-checkbox
          v-model="selectedRegions"
          label="KwaZulu Natal"
          value="KwaZulu Natal"
        ></v-checkbox>
        <v-checkbox
          v-model="selectedRegions"
          label="To Be Updated"
          value="TO BE UPDATED"
        ></v-checkbox>
        <v-checkbox
          v-model="selectedRegions"
          label="Ukhahlamba"
          value="UKHAHLAMBA"
        ></v-checkbox>
        <v-checkbox
          v-model="selectedRegions"
          label="Umgungundlovu"
          value="UMGUNGUNDLOVU"
        ></v-checkbox>
        <v-checkbox
          v-model="selectedRegions"
          label="Vryheid"
          value="VRYHEID"
        ></v-checkbox>
        <v-checkbox
          v-model="selectedRegions"
          label="Zululand"
          value="ZULULAND"
        ></v-checkbox>
      </v-layout>
      <p>{{ selectedRegions }}</p>
    </v-flex>
  </div>
</template>

<script>
import TitleCaseString from "@/helpers/TitleCaseString";
export default {
  data() {
    return {
      selectedRegions: []
    };
  },
  computed: {
    regions() {
      return this.$store.getters.regions.map(region => TitleCaseString(region));
    }
  },
  methods: {
    deeCap(words) {
      const wordsArr = words.split(" ");
      return wordsArr.map(word => {
        const lower = word.toLowerCase();

        return lower.charAt(0).toUpperCase() + lower.slice(1);
      });
    }
  }
};
</script>

<style scoped></style>
