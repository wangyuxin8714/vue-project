import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueLazyload from "vue-lazyload";
import router from './router/index'

Vue.use(VueLazyload, {
  preLoad: 1,
  error: "img/timg.gif",
  loading: "img/timg.gif",
  attempt: 1
}); // 挂在懒加载
// Vue.prototype.$store=store
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
