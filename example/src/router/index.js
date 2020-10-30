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
      icon: ''
    },
    children: [
      {
        path: 'page-a',
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
        path: 'child',
        name: 'child',
        component: BlankLayout,
        meta: {
          icon: '',
          skipLogin: true,
          name: 'child'
        },
        children: [
          {
            path: 'b',
            name: 'page-b',
            meta: {
              skipLogin: true,
              name: 'page-b'
            },
            component: PageB
          },
          {
            path: 'b/edit',
            name: 'page-b-edit',
            meta: {
              skipLogin: true,
              name: 'page-b-edit'
            },
            component: PageB
          }
        ]
      },
      {
        path: 'c',
        name: 'page-c',
        meta: {
          skipLogin: true,
          name: 'page-c'
        },
        component: PageC
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
