<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
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
      <all-schools-map></all-schools-map>
      <school-details></school-details>
    </v-layout>
  </v-container>
</template>

<script>
import AllSchoolsMap from "../components/AllSchoolsMap";
import SchoolDetails from "@/components/SchoolDetails";

export default {
  components: {
    AllSchoolsMap,
    SchoolDetails
  }
};
</script>
