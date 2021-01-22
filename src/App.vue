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
    const response = await axios.get(
      `https://api.ipregistry.co/?key=${process.env.VUE_APP_IP}&pretty=true&fields=location.city,location.latitude,location.longitude`
    );
    console.log("mounted - response", response);
  },
};
</script>
