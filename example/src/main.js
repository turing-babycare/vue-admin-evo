import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Request } from 'vue-admin-evo';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(Antd);

console.log(new Request({}));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
