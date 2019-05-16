<template>
  <div v-if="school">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="80vw">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            <v-flex xs10>{{ school.name }}</v-flex>
            <v-btn
              style="position: absolute; right:15px; top:15px"
              icon
              dark
              @click="dialog = false"
            >
              <v-icon medium>fa-window-close</v-icon>
            </v-btn>
            <br />
            <div class="caption">
              {{ school.phase }} | Emis Code: {{ school.nat_emis }}
            </div>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex>
                  {{ school.is_no_fees == "YES" ? "A No-Fees School" : "" }}
                  <br />
                  Number of Students: {{ school.students_count }}
                  <br />
                  {{
                    school.nat_emis !== school.old_nat_emis
                      ? `Previous Emis Code: ${school.old_nat_emis}`
                      : ""
                  }}
                  <br />
                  <v-icon v-if="school.phone.length > 1" small>fa-phone</v-icon>
                  {{ school.phone }}
                </v-flex>
                <v-flex>
                  <v-icon small>fa-map-marker</v-icon>
                  {{ school.postal_address }}
                  <br />
                  {{ school.street_address }}
                  <br />
                  {{ school.suburb }} {{ school.region }} {{ school.province }}
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
      }
    }
  }
};
</script>

<style scoped></style>
