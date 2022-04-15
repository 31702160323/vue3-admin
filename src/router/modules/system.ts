import { markRaw } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import RouterTransition from '@/components/router-transition/router-transition.vue'

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
    redirect: '/system/home',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '/system/home',
        name: 'Home',
        meta: {
          title: '首页',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/system/home.vue')
      }
    ]
  }
]

export default routes
