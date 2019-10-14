import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import axios from "axios";

axios.defaults.headers["Authorization"] = "3333";

Vue.config.productionTip = false;
Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
