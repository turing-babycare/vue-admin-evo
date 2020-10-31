import Vuex, { Store } from 'vuex';
import VueRouter from 'vue-router';
import { evo, EvoState } from '@/store';
import { after, before } from './router';
import { initClient } from './client';
import { setOptions } from './options';
export interface BootstrapOptions {
  clientBaseURL: string;
  loginHost: string;
  logoutURL?: string;
  userInfoURL?: string;
  userInfoPath?: string;
  store: Store<{ evo: EvoState }>;
  router: VueRouter;
  $message: any;
  $modal: any;
}

export default function bootstrap(options: BootstrapOptions) {
  setOptions(options);
  initClient({
    $message: options.$message,
    $modal: options.$modal,
    baseURL: options.clientBaseURL
  });
  options.store.registerModule('evo', evo);
  options.router.beforeEach(before(options));
  options.router.afterEach(after());
}
