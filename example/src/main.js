import Vue from 'vue';
import Antd, { Modal } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Evo from 'vue-admin-evo';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(Antd);

Vue.use(Evo, {
  store,
  router,
  loginURL: 'http://baidu.com',
  clientBaseURL: 'https://api-v3.baobaohehu.com',
  $message: Vue.prototype.$message,
  $modal: Modal
});
// console.log(new Request({}));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
