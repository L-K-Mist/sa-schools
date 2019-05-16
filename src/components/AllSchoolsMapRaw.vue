<template>
  <div>
    <div>
      <select v-model="selectedTileSet" @change="setTileSet(selectedTileSet)">
        <option
          v-for="tileset in tileSets"
          :value="tileset.tileLayer"
          :key="tileset.name"
          >{{ tileset.name }}</option
        >
      </select>
    </div>
    <div class="listings" id="listings">
      <div class="item" v-for="marker in markers" :key="marker.options.title">
        <a class="title" @click="markerFunction(marker.options.title)">{{
          marker.options.title
        }}</a>
      </div>
    </div>

    <div id="map" class="map" style="height: 80vh"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet.markercluster";
import axios from "axios";
import _ from "lodash";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
export default {
  el: "#app",
  data() {
    return {
      map: null,
      markers: [],
      markerClusters: null,
      selectedTileSet: "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      tileSets: [
        {
          name: "Streets ",
          tileLayer: "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        },
        {
          name: "Hybrid",
          tileLayer: "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        },
        {
          name: "Satellite",
          tileLayer: "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
        },
        {
          name: "Terrain",
          tileLayer: "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
        },
        {
          name: "Terrain Stamen",
          tileLayer: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
        }
      ],
      userLocation: null
    };
  },
  mounted() {
    var vm = this;
    vm.markerClusters = L.markerClusterGroup();
    vm.map = L.map("map", {
      center: { lat: -28.63324560499325, lng: 30.827636718750004 },
      minZoom: 2,
      zoom: 2
    });
    vm.setTileSet(vm.selectedTileSet);
    vm.getGoogleData();
    navigator.geolocation.getCurrentPosition(vm.displayLocation);
  },
  methods: {
    displayLocation(position) {
      var vm = this;
      console.log("position", position);
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      L.marker([lat, lng]).addTo(vm.map);
      vm.map.setView([lat, lng], 16);
      vm.userLocation = new L.LatLng(lat, lng);
      return { longitude: lng, latitude: lat };
    },
    setTileSet(selectedTileLayer) {
      var vm = this;
      var basemap = L.tileLayer(selectedTileLayer, {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      });
      if (vm.map.hasLayer(basemap)) {
        vm.map.removeLayer(basemap);
      } else {
        vm.map.addLayer(basemap);
      }
    },
    markerFunction(id) {
      var vm = this;
      for (var i in vm.markers) {
        var markerID = vm.markers[i].options.title;
        var position = vm.markers[i].getLatLng();
        if (markerID == id) {
          vm.map.setView(position, 15);
          vm.markers[i].openPopup();
        }
      }
    },
    createPolyLine(floraLocation, userLocation) {
      /* var latlongs = [loc1, loc2];
    var polyline = new L.Polyline(latlongs, {
    color: 'green',
    opacity: 1,
    weight: 1,
    clickable: false
    }).addTo(map); */

      //distance
      return (
        "About " +
        (floraLocation.distanceTo(userLocation) / 1000).toFixed(0) +
        "km away from you.</p>"
      );
    },
    getGoogleData: function() {
      var vm = this;
      var spreadsheetID = "1ctHA5UmH9ZmrXugYFe_DHBOr9wJHRYkHCHim8nh1Tg8";
      var worksheetID = "od6";
      var url =
        "https://spreadsheets.google.com/feeds/list/" +
        spreadsheetID +
        "/" +
        worksheetID +
        "/public/values?alt=json";
      axios
        .get(url)
        .then(function(response) {
          _.forEach(response.data.feed.entry, function(val, i) {
            var floralocation = new L.LatLng(val.gsx$lat.$t, val.gsx$lng.$t);
            var userDistance = vm.createPolyLine(
              floralocation,
              vm.userLocation
            );
            var markerX = L.marker([val.gsx$lat.$t, val.gsx$lng.$t], {
              title: "marker_" + i
            }).bindPopup(
              userDistance +
                "<h2>" +
                val.gsx$markertitle.$t +
                "</h2>" +
                val.gsx$markercontent.$t +
                '<img src="' +
                val.gsx$markerimage.$t +
                '" />'
            );
            vm.markerClusters.addLayer(markerX);
            vm.markers.push(markerX);
            vm.map.addLayer(vm.markerClusters);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
