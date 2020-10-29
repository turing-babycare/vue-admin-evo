import Vue from 'vue';
import AdminLayout from './components/layouts/admin-layout/AdminLayout.vue';
import BlankLayout from './components/layouts/BlankLayout.vue';
import Request from './utils/request';
import bootstrap, { BootstrapOptions } from './utils/bootstrap';
import client from './utils/client';

function install(_Vue: typeof Vue, opt: BootstrapOptions) {
  _Vue.component(AdminLayout.name, AdminLayout);
  _Vue.component(BlankLayout.name, BlankLayout);

  bootstrap(opt);
}

export default { install };

export { AdminLayout, BlankLayout, Request, client };
