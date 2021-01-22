<template>
  <v-app>
    <v-app-bar scroll-off-screen app>
      <v-toolbar-title class="headline text-uppercase"
        >South African Schools Data</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  async mounted() {
    const returnedVal = {
      city: "Jeffreys Bay",
      latitude: -33.89609,
      longitude: 24.86859,
    };
    await this.$store.dispatch("setUserLocation", returnedVal);
    await this.$store.dispatch("fetchSchoolsNear");
    setTimeout(() => {
      this.$store.dispatch("setView", {
        lat: returnedVal.latitude,
        lng: returnedVal.longitude,
      });
    }, 2000);
  },
};
</script>
