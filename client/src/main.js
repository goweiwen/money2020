import Vue from "vue";
import Buefy from "buefy";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "buefy/dist/buefy.css";

Vue.config.productionTip = false;

Vue.use(Buefy);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBKPJ3DCwCco-vvh-46tPTaRcEEtjoul-k",
    libraries: "places"
  }
});

Notification.requestPermission(permission => {
  if (permission === "granted") {
    setTimeout(function() {
      new Notification("Hey Thomas, choo choo");
    }, 10000);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
