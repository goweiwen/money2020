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
        :merchants="merchants")

      Merchant.merchant(
        v-for="(_, i) in merchants"
        v-if="merchant == i"
        :key="i"
        :merchant="merchants[i]")
</template>

<script>
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
      merchants: [
        {
          name: "Walmart",
          position: fuzzPosition(position, 0.01)
        },
        {
          name: "Lowes",
          position: fuzzPosition(position, 0.01)
        },
        {
          name: "JCPenny",
          position: fuzzPosition(position, 0.01)
        }
      ],
      merchant: null
    };
  },

  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        this.merchants.map(merchant => {
          merchant.position = fuzzPosition(this.position, 0.01);
        });
      });
    }
  },

  methods: {
    selectMerchant(i) {
      this.merchant = i;
    }
  }
};
</script>

<style lang="stylus" scoped>
.home {
  position: relative;
}

.maps {
  width: 100%;
  height: 100%;
}

.merchant, .merchants {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background: #fff;
  padding: 1em;
  border-radius: 15px 15px 0 0;
}
</style>
