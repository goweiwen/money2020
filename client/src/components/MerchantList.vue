<template lang="pug">
  .merchant-list
    p.desc
      strong {{ item }} 
      span near you:
    ul.merchants
      li(v-for="(merchant, i) in merchants" :key="i" @click="$emit('select', i)")
        span.index {{ i+1 }}. 
        span.name {{ merchant.name }}
        span.distance {{ merchant.distance.toFixed(1) }} miles
</template>

<script>
export default {
  props: ["merchants", "item"]
};
</script>

<style lang="stylus" scoped>
.merchant-list {
  position: absolute;
  top: 70%;
  height: 30%;
  width: 100%;
  padding: 1em 0;

  .desc {
    font-size: 1em;
    padding-left: 1em;
    margin-bottom: 0.4em;
  }

  li {
    cursor: pointer;
    position: relative;
    font-size: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.6em 1em;

    .name {
      position: absolute;
      left: 2.5em;
      display: inline-block;
      text-align: left;
      font-weight: bold;
      height: 2em;
    }

    .distance {
      position: absolute;
      display: inline-block;
      right: 0;
      margin-right: 1em;
      height: 2em;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
