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
      title: '首页',
      keepAlive: true
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
  },
  {
    path: '/mediapipe',
    name: 'Mediapipe',
    meta: {
      icon: 'location',
      title: 'Mediapipe',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/common/mediapipe.vue')
  }
];

export default routes;
