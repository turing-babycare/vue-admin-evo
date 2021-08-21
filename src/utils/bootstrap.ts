import Vuex, { Store } from 'vuex';
import VueRouter from 'vue-router';
import { evo, EvoState } from '@/store';
import { after, before, UnauthorizedRoute } from './router';
import { initClient } from './client';
import { set } from './options';
export interface BootstrapOptions {
  appName?: string;
  clientBaseURL: string;
  wsBaseURL: string;
  loginHost: string;
  logoutURL?: string;
  userInfoPath?: string;
  onlineStatusPath?: string;
  store: Store<{ evo: EvoState }>;
  router: VueRouter;
  $message: any;
  $modal: any;
  Moment: any;
}

export default function bootstrap(options: BootstrapOptions) {
  set('options', options);

  initClient({
    $message: options.$message,
    $modal: options.$modal,
    baseURL: options.clientBaseURL
  });
  options.store.registerModule('evo', evo);
  if (options.router.addRoutes) {
    options.router.addRoutes([UnauthorizedRoute]);
  } else {
    // // @ts-ignore
    // options.router?.addRoute(UnauthorizedRoute);
    // console.log(options.router);
  }
  options.router.beforeEach(before(options));
  options.router.afterEach(after());
}
