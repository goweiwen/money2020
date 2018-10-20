<template lang="pug">
  main
    nav#toolbar.navbar.is-hidden-desktop
      .navbar-brand
        button.button.is-white.navbar-burger(@click="isSidebarHidden = !isSidebarHidden")
          span
          span
          span
    sidebar#sidebar(:class="{ hidden: isSidebarHidden }" @route="isSidebarHidden = true")
    transition-group(name='fade' mode='out-in')
      router-view#main(key='router-view')
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "app",
  components: { Sidebar },
  data() {
    return { isSidebarHidden: true };
  }
};
</script>

<style lang="stylus">
w = 200px;

.has-navbar-fixed-top {
  padding-top: 3.25rem;
}

#toolbar {
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .navbar-burger {
    margin-left: 0;
  }
}

#sidebar {
  position: absolute;
  width: 100vw;
  z-index: 1;
  padding: 16px;
  overflow: hidden;
  transition: all 0.3s;
}

@media screen and (max-width: 1023px) {
  #sidebar.hidden {
    transform: translateY(-100%);
  }
}

@media screen and (min-width: 1024px) {
  #sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: w;
    height: 100%;
  }

  #main {
    margin-left: w;
  }
}
</style>
