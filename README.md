### 所有项目约定

##### URL 跳转回跳参数为 oauth_callback

##### URL 带 token 参数为 \_\_token

### 组件介绍

```
export { AdminLayout, BlankLayout, Request, client };
```

##### AdminLayout、BlankLayout 为框架级组件

##### AdminLayout 带头部导航和左侧菜单

##### BlankLayout 为空白页面

---

##### client 是实例化后的 Request，可以直接使用，如需特殊需求，使用 Request 自行封装

```
import { client } from 'vue-admin-evo';

async function getData() {
  const res = await client.get('/data')
  console.log(res)
}
```

---

##### 自动注入名为 `evo` 的 Module

```
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

Vue.use(Evo, {
  store, //传入store
  router, // 传入router
  loginHost: 'http://baidu.com', // 登陆项目域名
  clientBaseURL: 'https://api-v3.baobaohehu.com', // 接口根域名
  userInfoPath?: '/login'; // 登陆接口
  $message: Vue.prototype.$message, // message组件
  $modal: Modal // modal组件
});
```
