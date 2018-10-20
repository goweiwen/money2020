<template lang="pug">
  aside.menu#sidebar
    p.menu-label General
    ul.menu-list
      li
        router-link(to="/" @click.native="click") Home
      li
        router-link(to="/about" @click.native="click") About
      li
        a(@click="confirmLogout" @click.native="click") Log Out
</template>

<script>
export default {
  name: "sidebar",

  methods: {
    click() {
      this.$emit('route')
    },
    confirmLogout() {
      this.$dialog.confirm({
        title: 'Logging out',
        message: 'Are you sure you want to log out?',
        cancelText: 'Cancel',
        confirmText: 'Log Out',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: this.logout,
      })
    },
    logout() {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#sidebar {
  background-color: #ffffff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
</style>
