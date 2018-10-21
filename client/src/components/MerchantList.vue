<template lang="pug">
  ol.merchants
    li(v-for="(merchant, i) in merchants" :key="i")
      span {{ merchant.name }}
</template>

<script>
export default {
  props: ["merchants"]
};
</script>

<style lang="stylus" scoped>
.merchants {
  position: absolute;
  top: 50%;
  height: 50%;
  width: 100%;
}

.merchants li {
  font-size: 1.3em;
  margin-left: 1.5em;
}
</style>
