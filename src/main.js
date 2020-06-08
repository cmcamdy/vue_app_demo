import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import "./assets/js/rem.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

global.API_PROXY = 'http://bird.ioliu.cn/v1/?url='
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
