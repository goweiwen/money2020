<template lang="pug">
  .items-wrapper
    ul.items
      li.item(v-for="(item, i) in items" :key="i" @click="$emit('select', i)")
        img.image(:src="item.image")
        p.name {{ item.name }}
        p.originalPrice(v-if="item.originalPrice != null") {{ item.originalPrice | asCurrency }}
        p.price  {{ item.price | asCurrency }}
</template>

<script>
export default {
  name: "catalog",

  props: ["items"],

  filters: {
    asCurrency: price => `$${price.toFixed(2)}`
  }
};
</script>

<style lang="stylus" scoped>
.items-wrapper {
    width: 100%;

    .items {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;

        &::-webkit-scrollbar {
            display: none;
        }

        .item {
            padding: 8px;
            cursor: pointer;

            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }

            .image {
                border: 1px solid rgba(0, 0, 0, 0.1);
                width: 140px;
                height: 140px;
            }

            .name, .originalPrice, .price {
                font-size: 0.8em;
                letter-spacing: 0.1em;
                margin-top: 0.5em;
                text-align: left;
                width: 140px;
            }

            .originalPrice {
                display: inline;
                text-decoration: line-through;
            }

            .originalPrice + .price {
                color: red;
            }

            .price {
                display: inline;
                font-weight: bold;
            }
        }
    }
}
</style>
