import Vue from 'vue';
import VueRouter from 'vue-router';
import { AdminLayout, BlankLayout } from 'vue-admin-evo';
import PageA from '../views/PageA';
import PageB from '../views/PageB';
import PageC from '../views/PageC';

Vue.use(VueRouter);

const routes = [
  {
    path: '/cc',
    name: 'page-cc',
    meta: {
      icon: 'form',
      skipLogin: true,
      name: 'page-cc'
    },
    component: PageC
  },
  {
    path: '/',
    component: AdminLayout,
    meta: {
      skipLogin: true,
      name: '首页',
      hidden: true,
      icon: ''
    },
    children: [
      {
        path: '/page-a',
        name: 'page-a', //
        meta: {
          icon: '', // 当前菜单icon，antd icon组件
          name: 'page-a', // 当前菜单及面包屑名称
          hidden: false, // 是否显示当前菜单，默认false显示
          skipLogin: true, // 是否验证token, 默认false验证
          breadHidden: false, //是否隐藏当前面包屑，默认false显示
          breadcrumb: undefined // 是否自定义当前面包屑[{icon:'',name:'',path:''}]，
        },
        component: PageA
      },
      {
        path: '/child',
        name: 'child',
        component: BlankLayout,
        meta: {
          icon: '',
          skipLogin: true,
          hidden: true,
          breadHidden: true,
          name: '父子节点'
        },
        children: [
          {
            path: '/child/b',
            name: 'page-b',
            meta: {
              // hidden: false,
              skipLogin: true,
              name: '咨询服务'
            },
            component: PageB
          }
          // {
          //   path: '/child/b/edit',
          //   name: 'page-b-edit',
          //   meta: {
          //     skipLogin: true,
          //     name: 'page-b-edit'
          //   },
          //   component: PageB
          // }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
