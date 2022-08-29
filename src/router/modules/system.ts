import { RouteRecordRaw } from 'vue-router';

/**
 * 授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    meta: {
      icon: 'location',
      title: '首页'
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/system/home.vue')
  },
  {
    path: '/terminal',
    name: 'Terminal',
    meta: {
      icon: 'location',
      title: '控制台',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/system/terminal.vue')
  }
];

export default routes;
