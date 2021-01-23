<template>
  <v-layout row justify-center>
    <v-card>
      <v-container grid-list-xs>
        <v-layout justify-center row wrap>
          <l-map
            ref="map"
            class="mb-4"
            style="z-index: 2; height: 80vh; width: 90vw"
            :zoom="mapOptions.zoom"
            :options="{
              zoomControl: false,
              attributionControl: false,
            }"
            :center="mapOptions.center"
            :min-zoom="mapOptions.minZoom"
            :max-zoom="mapOptions.maxZoom"
          >
            <l-control-layers :position="mapOptions.layersPosition" />
            <l-tile-layer
              v-for="(tileProvider, index) in tileProviders"
              :key="index"
              layer-type="base"
              :name="tileProvider.name"
              :visible="tileProvider.visible"
              :url="tileProvider.url"
              :attribution="tileProvider.attribution"
            />
            <!-- <v-geosearch :options="geosearchOptions"></v-geosearch> -->
            <l-control-zoom :position="mapOptions.zoomPosition" />
            <l-control-attribution
              :position="mapOptions.attributionPosition"
              :prefix="mapOptions.attributionPrefix"
            />
            <l-control-scale :imperial="false" />
            <l-marker-cluster v-if="schools">
              <l-marker
                v-for="school in schools"
                :key="school.nat_emis"
                :lat-lng="{ lat: school.lat, lng: school.lng }"
              >
                <l-popup>
                  <div class="body-2">{{ school.name }}</div>
                  <div class="body-1">{{ school.nat_emis }}</div>
                  <br />
                  <v-btn color="success" @click="fetchSchool(school.nat_emis)">
                    <v-icon class="mr-3">mdi-information</v-icon>&nbsp; &nbsp;
                    More info
                  </v-btn>
                </l-popup>
              </l-marker>
            </l-marker-cluster>
          </l-map>
          <br />
        </v-layout>
        <h1 class="headline">Closing Thoughts</h1>
        <br />
        <p>
          Though far from finished I hope you can see the benefit of taking a
          publicly available spreadsheet, and opening it up to the public and to
          fellow developers.
        </p>
        <p>The method was fairly easy using the tools stated in the intro.</p>

        <p>
          Somewhat rough and wet (non-DRY) code is available on
          <a
            href="https://github.com/L-K-Mist/sa-schools"
            target="_blank"
            rel="noopener noreferrer"
            >github</a
          >
          for your amusement.
        </p>
      </v-container>
    </v-card>
  </v-layout>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  // LLayerGroup,
  // LTooltip,
  LPopup,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers,
} from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
// import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";
// import VGeosearch from "@/components/Vue2LeafletGeosearch";
// import Glyph from "leaflet.icon.glyph";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
// import "leaflet-geosearch/dist/style.css";
import "leaflet-geosearch/assets/css/leaflet.css";

const tileProviders = [
  {
    name: "OpenStreetMap",
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    name: "OpenTopoMap",
    visible: false,
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
];
export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
    LMarkerCluster: Vue2LeafletMarkerCluster,
  },

  data() {
    return {
      marker: null,
      // Start the map zoomed out over SA.
      mapOptions: {
        center: { lat: -28.552743254412608, lng: 24.488525390625 },
        zoom: 5,
        options: { zoomControl: false, attributionControl: true },
        minZoom: 1,
        maxZoom: 20,
        attributionPosition: "bottomright",
        layersPosition: "topright",
        attributionPrefix: "Vue2Leaflet",
        imperial: false,
      },
      opacity: 0.8,
      tileProviders: tileProviders,
    };
  },
  computed: {
    schools() {
      return this.$store.state.Map.kznSchools;
    },
    map: {
      get() {
        return this.$store.state.Map.map;
      },
      set(newVal) {
        this.$store.dispatch("setMap", newVal);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
      // map.on("dblclick", (event) => {
      //   const { lat, lng } = event.latlng;
      //   this.$store.dispatch("fetchSchoolsNear", { lat, lng });
      // });
    });
  },
  methods: {
    fetchSchool(id) {
      this.$store.dispatch("fetchSchool", id);
    },
  },
};
</script>

<style scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
