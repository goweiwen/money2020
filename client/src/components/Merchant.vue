<template lang="pug">
  .merchant
    button.fab(@click="$emit('directions')")
      b-icon(icon="directions")
      p GO

    h1.name {{ merchant.name }}

    Catalog(:items="merchant.items" @select="selectItem")

    b-modal(:active.sync="isModalActive" has-modal-card)
      .modal-card
        header.modal-card-head
          p.modal-card-title Credit something
        section.modal-card-body
          p words words words
        footer.modal-card-foot
          button.button.is-primary(@click="acceptTerms") OK
          button.button(@click="isModalActive = false") No, thank you
</template>

<script>
import Catalog from "@/components/Catalog";

export default {
  name: "merchant",

  components: { Catalog },

  props: ["merchant"],

  data() {
    return {
      isModalActive: false
    };
  },

  methods: {
    selectItem(i) {
      this.isModalActive = true;
    },
    acceptTerms() {
      this.isModalActive = false;
      this.$emit("route");
    }
  }
};
</script>

<style lang="stylus" scoped>
.merchant {
    padding: 1em;

    .name {
        font-size: 1.5em;
    }
}

button.fab {
    position: absolute;
    top: -5em;
    right: 1em;
    width: 4em;
    height: 4em;
    border-radius: 100%;
    border-width: 0px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    background-color: #1E88E5;
    color: #fff;
}

button.fab:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

button.button {
    max-width: 150px;
}
</style>
