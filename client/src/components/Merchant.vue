<template lang="pug">
  .merchant
    button.fab
      b-icon(icon="directions")
      p GO

    h1.name {{ merchant.name }}
    Catalog
</template>

<script>
import Catalog from "@/components/Catalog";

export default {
  name: "merchant",

  components: { Catalog },

  props: ["merchant"]
};
</script>

<style lang="stylus" scoped>
.merchant .name {
    font-size: 1.5em;
}

button.fab {
    position: absolute;
    top: -5em;
    right: 2em;
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
</style>
