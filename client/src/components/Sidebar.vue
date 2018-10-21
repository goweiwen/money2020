<template lang="pug">
  aside.menu#sidebar
    p.menu-label General
    ul.menu-list
      li
        router-link(to="/" @click.native="click") Home
      li
        a(@click="notify" @click.native="click") Notify in 10 seconds
</template>

<script>
export default {
  name: "sidebar",

  methods: {
    click() {
      this.$emit("route");
    },
    notify() {
      if ("Notification" in window) {
        Notification.requestPermission(permission => {
          if (permission === "granted") {
            setTimeout(function() {
              new Notification("Hey Thomas, choo choo");
            }, 10000);
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#sidebar {
  background-color: #ffffff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
</style>
