import { NavigationGuard, Route } from 'vue-router';
import { getToken, setToken } from './auth';
import client from './client';
import { BootstrapOptions } from './bootstrap';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

export const before = (options: BootstrapOptions): NavigationGuard => (
  to,
  from,
  next
) => {
  // console.log('before', to, from);
  if (to.meta?.name) {
    document.title = document.title + '-' + to.meta.name;
  }
  NProgress.start();
  const token = getToken();
  const queryToken = String(to.query.__token || '');
  if (queryToken) {
    setToken(queryToken);
    // 根据当前token更新用户信息
    client.get(options.userInfoPath as string, {}).then((res: any) => {
      options.store.commit('evo/setUserInfo', res);
    });
    delete to.query['__token'];
    next({
      name: to.name as string,
      path: to.path,
      hash: to.hash,
      query: to.query,
      params: to.params
    });
  } else if (!token && !to.meta.loginPage && !to.meta.skipLogin) {
    const url = `${options.loginHost}/login?oauth_callback=${window.location
      .origin + to.fullPath}`;
    console.log(url);
    window.location.replace(url);
  } else {
    const userInfo = options.store.state.evo.userInfo;
    if (token && (!userInfo.token || token !== userInfo?.token)) {
      client.get(options.userInfoPath as string, {}).then((res: any) => {
        options.store.commit('evo/setUserInfo', res);
      });
    }
    next();
  }
};
type afterHook = (to: Route, from: Route) => any;

export const after = (): afterHook => (to, from) => {
  NProgress.done();
  // console.log('after', { to, from });
};
