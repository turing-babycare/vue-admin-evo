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
        name: 'page-a',
        meta: {
          icon: '',
          name: 'page-a',
          hidden: false,
          skipLogin: true,
          breadcrumb: undefined
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
          name: '父子节点'
        },
        children: [
          {
            path: '/child/b',
            name: 'page-b',
            meta: {
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
