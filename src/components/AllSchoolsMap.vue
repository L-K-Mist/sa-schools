<template>
  <v-layout row justify-center>
    <v-card>
      <v-container grid-list-xs>
        <v-layout justify-center row wrap>
          <v-flex xs12>
            <p>
              This map uses publicly available data from
              <a
                href="https://www.education.gov.za/Programmes/EMIS/EMISDownloads.aspx"
                target="blank"
                >the Department of Basic Education</a
              >. The data has been uploaded to a postgreSQL database, wrapped in
              <a href="https://hasura.io/" target="blank">Hasura</a>, as a
              GraphQL api, that this statically hosted VueJs frontend consumes.
            </p>
          </v-flex>
          <l-map
            class="mb-4"
            ref="map"
            style="z-index: 2; height: 80vh; width: 90vw"
            :zoom="mapOptions.zoom"
            :options="{ zoomControl: false, attributionControl: false }"
            :center="mapOptions.center"
            :min-zoom="mapOptions.minZoom"
            :max-zoom="mapOptions.maxZoom"
          >
            <l-control-layers :position="mapOptions.layersPosition" />
            <l-tile-layer
              v-for="(tileProvider, index) in tileProviders"
              :key="index"
              layerType="base"
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
            <l-marker-cluster v-if="cases">
              <l-marker
                v-for="c in cases"
                :key="c.nat_emis"
                :lat-lng="{ lat: c.lat, lng: c.lng }"
              >
                <l-popup>
                  <div class="body-2">{{ c.name }}</div>
                  <div class="body-1">{{ c.nat_emis }}</div>
                  <br />
                  <v-btn @click="fetchSchool(c.nat_emis)" color="success">
                    <v-icon small>fa-info</v-icon>&nbsp; &nbsp; More info
                  </v-btn>
                </l-popup>
              </l-marker>
            </l-marker-cluster>
          </l-map>
          <br />
        </v-layout>
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
  LControlLayers
} from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
// import { GeoSearchControl, EsriProvider } from "leaflet-geosearch";
// import VGeosearch from "@/components/Vue2LeafletGeosearch";
// import Glyph from "leaflet.icon.glyph";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-geosearch/dist/style.css";
import "leaflet-geosearch/assets/css/leaflet.css";
// //

const tileProviders = [
  {
    name: "OpenStreetMap",
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  },
  {
    name: "OpenTopoMap",
    visible: false,
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }
];
export default {
  name: "example",
  components: {
    // VGeosearch,
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
    LMarkerCluster: Vue2LeafletMarkerCluster
  },
  mounted() {
    this.$store.dispatch("kznSchools");
    // if (!this.cases) {
    //   console.log("Fetching online array of schools");
    //   this.$store.dispatch("kznSchools");
    // }
    // this.$nextTick(() => {});
  },
  data() {
    return {
      map: null,
      marker: null,
      mapOptions: {
        center: this.$store.getters.markerPosition,
        options: { zoomControl: false, attributionControl: true },
        zoom: 9,
        minZoom: 1,
        maxZoom: 20,
        // zoomPosition: "topleft",
        attributionPosition: "bottomright",
        layersPosition: "topright",
        attributionPrefix: "Vue2Leaflet",
        imperial: false
      },
      opacity: 0.8,
      Positions: ["topleft", "topright", "bottomleft", "bottomright"],
      tileProviders: tileProviders,
      stuff: [{ id: "s1", visible: true, markersVisible: true }]
    };
  },
  computed: {
    cases() {
      return this.$store.getters.kznSchools;
    }
  },
  methods: {
    fetchSchool(id) {
      console.log("TCL: fetchSchool -> id", id);
      this.$store.dispatch("fetchSchool", id);
    }
  }
};
</script>

<style scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
