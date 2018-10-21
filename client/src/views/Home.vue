<template lang="pug">
  .home
    Maps.maps(
      :destination="destination" 
      :directions="directions"
      :merchants="merchants"
      @select="selectMerchant")

    transition(name="slide-down")
      MerchantList.merchants(
        v-if="merchant == null"
        :item="item"
        :merchants="merchants"
        @select="selectMerchant")

      Merchant.merchant(
        v-for="(_, i) in merchants"
        v-if="merchant == i"
        :key="i"
        :merchant="merchants[i]"
        @directions="getDirections"
        @route="getDirections")
</template>

<script>
import Vue from "vue";
import Maps from "@/components/Maps";
import Merchant from "@/components/Merchant";
import MerchantList from "@/components/MerchantList";

function fuzzPosition(pos, distance) {
  return {
    lat: pos.lat + Math.random() * distance - distance / 2,
    lng: pos.lng + Math.random() * distance - distance / 2
  };
}
export default {
  name: "home",

  components: { Maps, Merchant, MerchantList },

  data() {
    const position = { lat: 36.17005, lng: -115.27944 };
    return {
      position,
      destination: null,
      directions: { routes: [] },
      merchants: [],
      merchant: null,
      item: "TV Tables & Stands"
    };
  },

  async mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      });

      const res = await fetch(
        `https://bmkc.herokuapp.com/merchant?lat=${this.position.lat}&lon=${
          this.position.lng
        }`,
        { mode: "cors" }
      );
      const data = await res.json();
      Vue.set(this, "merchants", data.merchants);
    }
  },

  methods: {
    selectMerchant(i) {
      this.merchant = i;
      this.directions = { routes: [] };
    },
    getDirections() {
      const merchant = this.merchants[this.merchant];
      const directionService = new google.maps.DirectionsService();
      directionService.route(
        {
          origin: this.position,
          destination: merchant.position,
          travelMode: "WALKING"
        },
        (directions, status) => {
          if (status == "OK") {
            this.directions = directions;
          }
        }
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
.home {
  position: relative;
}

.maps {
  top: -70%;
  width: 100%;
  height: 210%;
}

.merchant, .merchants {
  position: absolute;
  top: 70%;
  width: 100%;
  height: 30%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 15px 15px 0 0;
}
</style>
