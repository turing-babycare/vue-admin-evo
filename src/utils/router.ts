import { NavigationGuard, Route } from 'vue-router';
import { getToken, setToken } from './auth';
import client from './client';
import { BootstrapOptions } from './bootstrap';
import NProgress from 'nprogress';
import Unauthorized from '@/components/Unauthorized.vue';
// import { AuthInfo } from '@/store';
// import { flatten } from './time';

NProgress.configure({ showSpinner: false });

// const checkAuth = ({ path, matched }: Route, auth?: AuthInfo[]) => {
//   if (path === '/' || path === '/401') return true;
//   const pagePath = matched.length ? matched[matched.length - 1].path : '';
//   const authArray = flatten(auth);
//   return !!authArray.find(i => i.path === pagePath);
// };

export const before = (options: BootstrapOptions): NavigationGuard => async (
  to,
  _from,
  next
) => {
  if (to.meta?.name) {
    document.title = options.appName + '-' + to.meta.name;
  }
  NProgress.start();
  const queryToken = String(to.query.__token || '');
  if (queryToken) {
    console.log('有queryToken');
    setToken(queryToken);
    // 根据当前token更新用户信息
    client.get(options.userInfoPath as string, {}).then((res: any) => {
      options.store.commit('evo/setUserInfo', res);
    });
    delete to.query['__token'];
    // next();
  }
  // console.log(to);
  const token = getToken();
  if (!token && !to.meta.loginPage && !to.meta.skipLogin) {
    console.log('无token');
    const url = `${options.loginHost}/login?oauth_callback=${window.location
      .origin + to.fullPath}`;
    window.location.replace(url);
  } else {
    console.log('有token');
    const userInfo = options.store.state.evo.userInfo;
    if (token && (!userInfo.token || token !== userInfo?.token)) {
      const info = await client.get(options.userInfoPath as string, {});
      options.store.commit('evo/setUserInfo', info);
      // client.get(options.userInfoPath as string, {}).then((res: any) => {
      //   options.store.commit('evo/setUserInfo', res);
      // });
    }
    // console.log(to.matched);
    // const res = checkAuth(
    //   to,
    //   options.store.state.evo.userInfo.authInfo.filter(
    //     i => i.name === options.appName
    //   )[0].children
    // );
    if (to.path === '/' || to.path === '/401') {
      next();
    } else {
      const pagePath = to.matched.length
        ? to.matched[to.matched.length - 1].path
        : to.fullPath;
      const {
        res: { status }
      } = (await client.get('/v2/admin/permission/verify', {
        params: { name: options.appName, path: pagePath }
      })) as any;
      status ? next() : next({ path: '401' });
    }
  }
};
type afterHook = (to: Route, from: Route) => any;

export const after = (): afterHook => () => {
  NProgress.done();
  // console.log('after', { to, from });
};

export const UnauthorizedRoute = {
  path: '/401',
  component: Unauthorized,
  name: 'Unauthorized'
};
