### 所有项目约定

##### URL 跳转回跳参数为 oauth_callback

##### URL 带 token 参数为 \_\_token

##### 路由约定

```
      {
        path: '/page-a',
        name: 'page-a',
        meta: {
          icon: '', // 当前菜单icon，antd icon组件
          name: 'page-a', // 当前菜单及面包屑名称
          hidden: true, // 是否显示当前菜单，默认false显示
          skipLogin: true, // 是否验证token, 默认false验证
          activeMenu:'', //当前路由高亮选中菜单，不设置默认高亮当前路由匹配的菜单
          breadHidden: false, //是否隐藏当前面包屑，默认false显示
          breadcrumb: undefined // 是否自定义当前面包屑[{icon:'',name:'',path:''}]，
        },
        component: PageA,
        children: []
      },
```

### 组件介绍

```
export { AdminLayout, BlankLayout, Request, client, socket };
```

##### AdminLayout、BlankLayout 为框架级组件

##### AdminLayout 带头部导航和左侧菜单,

###### 需要传入 appName，表示当前项目名称

```
  props: {
    appName: {
      type: String,
      require,
      default: ''
    }
  },
```

##### BlankLayout 为空白页面

---

##### client 是实例化后的 Axios，可以直接使用，如需特殊需求，使用 Request 自行封装

```
import { client } from 'vue-admin-evo';

async function getData() {
  const res = await client.get('/data')
  console.log(res)
}
```

---

##### socket 是实例化后的 socket.io 客户端,提供了 connentSocket 方法连接 socket 客户端，连接参数为

```
{
  ns: string;
  token: string;
  url: string;
}
```

```
import { socket,connectSocket } from 'vue-admin-evo';
socket.on('name', res => {
  console.log(res)
})
```

---

##### 自动注入名为 `evo` 的 Module

```
export interface UserInfo {
  ws_token: { ns: string; token: string };
  avatar: string;
  id: number;
  navigation: {
    key: string;
    text: string;
    url: string;
  }[];
  token: string;
}

export interface EvoState {
  userInfo: UserInfo;
}
state: {
  userInfo: {}
}

mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload;
  }
}
```

---

##### 提供了统一的 router.beforeEach，router.afterEach 进行 token 校验

### 使用方法

```
import Evo from 'vue-admin-evo';
import 'vue-admin-evo/dist/vue-admin-evo.css';
Vue.use(Evo, {
  store, //传入store
  router, // 传入router
  logoutURL: '/v2/admin/login-out',
  wsBaseURL: '',
  loginHost: process.env.VUE_APP_LOGIN_URL, // 登录项目域名
  clientBaseURL: process.env.VUE_APP_API_BASE_URL, // 接口根域名
  requestURL:process.env.VUE_APP_API_REQUEST_URL,//新接口域名
  userInfoPath: '/v2/admin/userinfo', // 获取用户信息接口路径
  onlineStatusPath: '/v2/admin/online-state', // 上下线接口路径
  $message: Vue.prototype.$message, // message组件
  $modal: Modal, // modal组件
  Moment: Moment // Moment
});
```
