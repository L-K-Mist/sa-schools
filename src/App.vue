<template>
  <v-app>
    <v-toolbar scroll-off-screen app>
      <v-toolbar-title class="headline text-uppercase"
        >South African Schools Data</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  },
};
</script>
