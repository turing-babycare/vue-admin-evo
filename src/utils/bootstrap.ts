import Vuex, { Store } from 'vuex';
import VueRouter from 'vue-router';
import { evo } from '@/store';
import { after, before } from './router';
import { initClient } from './client';

export interface BootstrapOptions {
  clientBaseURL: string;
  loginHost: string;
  userInfoPath?: string;
  store: Store<object>;
  router: VueRouter;
  $message: any;
  $modal: any;
}

export default function bootstrap(options: BootstrapOptions) {
  initClient({
    $message: options.$message,
    $modal: options.$modal,
    baseURL: options.clientBaseURL
  });
  options.store.registerModule('evo', evo);
  options.router.beforeEach(before(options.loginHost));
  options.router.afterEach(after());
}
