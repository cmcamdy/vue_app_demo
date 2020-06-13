import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import "./assets/js/rem.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import { Header,  Swipe, SwipeItem } from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Indicator.name, Indicator);
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"


global.API_PROXY = "http://bird.ioliu.cn/v1/?url="
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
