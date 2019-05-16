<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
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
