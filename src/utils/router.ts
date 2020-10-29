import { NavigationGuard, Route } from 'vue-router';
import { getToken, setToken } from './auth';

export const before = (loginHost: string): NavigationGuard => (
  to,
  from,
  next
) => {
  console.log('before', to, from);
  const token = getToken();
  const queryToken = String(to.query.__token || '');
  if (queryToken) {
    setToken(queryToken);
    delete to.query['__token'];
    next({
      name: to.name as string,
      path: to.path,
      hash: to.hash,
      query: to.query,
      params: to.params
    });
  } else if (!token && (!to.meta || !to.meta.loginPage || !to.meta.skipLogin)) {
    window.location.replace(
      `${loginHost}?oauth_callback=${encodeURIComponent(
        window.location.origin + to.fullPath
      )}`
    );
  } else {
    if (token) {
      //todo: 如果store中没有userinfo就去getuserinfo
    }
    next();
  }
};
type afterHook = (to: Route, from: Route) => any;

export const after = (): afterHook => (to, from) => {
  console.log('after', { to, from });
};
