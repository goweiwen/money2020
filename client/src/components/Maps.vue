<template lang="pug">
    GmapMap.map(
      ref="mapRef"
      @click="deselectMerchant"
      :center="position"
      :zoom="6"
      map-type-id="terrain")

      DirectionsRenderer(
        :routeIndex="0"
        :options="{}"
        :directions="directions")

      GmapMarker.map-marker(
        :position="position"
        :icon="icon"
        @click="centerOn(position)")

      GmapMarker.map-marker(
        v-for="(merchant, i) in merchants"
        :key="i"
        :position="merchant.position"
        @click="selectMerchant(i)")
</template>

<script>
import DirectionsRenderer from "@/components/DirectionsRenderer";
import { gmapApi } from "vue2-google-maps";

export default {
  name: "maps",

  components: { DirectionsRenderer },

  data() {
    return {
      position: { lat: 0, lng: 0 }
    };
  },

  computed: {
    google: gmapApi,
    icon() {
      return {
        path: this.google && this.google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: "#3a84df",
        fillOpacity: 0.9,
        strokeColor: "#ffffff",
        strokeWeight: 2
      };
    }
  },

  props: ["merchants", "destination", "directions"],

  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      });
    }
  },

  methods: {
    centerOn(pos) {
      this.$refs.mapRef.panTo(pos);
    },
    selectMerchant(i) {
      const merchant = this.merchants[i];

      this.$emit("select", i);

      if (google === null) {
        return;
      }
    },
    deselectMerchant() {
      this.$emit("select", null);
    }
  }
};
</script>