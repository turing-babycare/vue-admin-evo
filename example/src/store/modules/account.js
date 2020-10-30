export default {
  namespaced: true,
  state: {
    user: {
      id: 1,
      avatar:
        'https://static-legacy.dingtalk.com/media/lADPAuoR6HXIEnXNA3LNA3I_882_882.jpg',
      name: '吴少愚',
      navigation: [
        {
          key: 'system',
          text: '系统设置',
          url: 'https://fhs-system-admin-fe-dev.baobaohehu.com'
        },
        {
          key: 'ask',
          text: '咨询设置',
          url: 'https://fhs-ask-admin-fe-dev.baobaohehu.com'
        }
      ],
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjAzOTY0MTQ0LCJleHAiOjE2MzU1MDAxNDR9.CuI9S24trqSJ84H0YdymELCLn-I303oJ-M49DNhQkEM',
      ws_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAzOTY0MTQ0LCJleHAiOjE2MzU1MDAxNDR9.Kjr9NAQfIpP2Q-IHKM5RsKZDP4gwQx9RWiWqG6C5UeU'
    },
    wsToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkYXRhdmlldy9hc2siLCJpYXQiOjE2MDI5MjQ1NzYsImV4cCI6MTYzNDQ2MDU3Nn0.Tx1lfQtCdsmA047imCVWVEmkh-aPrxn-PG32XQP2Two',
    permissions: null,
    roles: null,
    routesConfig: null
  },
  getters: {},
  mutations: {
    setWsToken(state, token) {
      state.wsToken = token;
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user));
    },
    setPermissions(state, permissions) {
      state.permissions = permissions;
      localStorage.setItem(
        process.env.VUE_APP_PERMISSIONS_KEY,
        JSON.stringify(permissions)
      );
    },
    setRoles(state, roles) {
      state.roles = roles;
      localStorage.setItem(
        process.env.VUE_APP_ROLES_KEY,
        JSON.stringify(roles)
      );
    },
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig;
      localStorage.setItem(
        process.env.VUE_APP_ROUTES_KEY,
        JSON.stringify(routesConfig)
      );
    }
  },
  actions: {}
};
