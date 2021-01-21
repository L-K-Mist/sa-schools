<template>
  <div v-if="school">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            <v-flex xs10>{{ school.name }}</v-flex>
            <v-btn
              style="position: absolute; right:15px; top:15px"
              icon
              dark
              @click="dialog = false"
            >
              <v-icon medium>mdi-close-thick</v-icon>
            </v-btn>
            <br />
            <div class="caption">
              {{ school.phase }} | Emis Code: {{ school.nat_emis }}
            </div>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex class="body-1">
                  {{ noFees(school.NoFeeSchool) }}
                  <br />
                  Has approximately {{ school.Learners_2019 }} students, with
                  {{ school.Educator_2019 }} teachers.
                  <br />
                </v-flex>
                <v-flex>
                  <v-icon
                    v-if="school.Telephone && school.Telephone.length > 1"
                    small
                    >mdi-phone</v-icon
                  >
                  {{
                    school.Telephone[0] === "0"
                      ? school.Telephone
                      : "0" + school.Telephone
                  }}
                  <br />
                  <v-icon small>mdi-map-marker</v-icon>
                  {{ school.PostalAddress }}
                  <br />
                  {{ school.StreetAddress }},

                  {{ school.province }}
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    school() {
      return this.$store.getters.activeSchool;
    },
    dialog: {
      get() {
        return this.$store.getters.showSchool;
      },
      set(bool) {
        this.$store.dispatch("showSchool", bool);
      },
    },
  },
  methods: {
    noFees(oneOfSeveralPossibilities) {
      if (
        !oneOfSeveralPossibilities ||
        oneOfSeveralPossibilities === "NOT APPLICABLE"
      ) {
        // Return early so that the fact that "not applicable" does include "no" can't dirty the results.
        return "Not Known";
      }
      const _oneOfSeveralPossibilities = oneOfSeveralPossibilities.toLowerCase();
      if (
        _oneOfSeveralPossibilities.includes("no") ||
        _oneOfSeveralPossibilities === "n"
      ) {
        return "Requires School Fees";
      }
      if (
        _oneOfSeveralPossibilities.includes("yes") ||
        _oneOfSeveralPossibilities === "n"
      ) {
        return "Is a No Fees School";
      }
      return "No Fees School: Not Known";
    },
  },
};
</script>

<style scoped></style>
