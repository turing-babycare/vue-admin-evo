import Vue from 'vue';
import VueRouter from 'vue-router';
import { AdminLayout, BlankLayout } from 'vue-admin-evo';
import PageA from '../views/PageA';
import PageB from '../views/PageB';
import PageC from '../views/PageC';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'page-a',
        component: PageA
      },
      {
        path: 'child',
        name: 'child',
        component: BlankLayout,
        children: [
          {
            path: 'b',
            name: 'page-b',
            component: PageB
          },
          {
            path: 'c',
            name: 'page-c',
            component: PageC
          }
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
