import { markRaw } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import RouterTransition from '@/components/router-transition/router-transition.vue'

/**
 * 授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      icon: 'location',
      title: '管理'
    },
    redirect: '/admin/authority',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '/admin/authority',
        name: 'Authority',
        meta: {
          title: '用户'
        },
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/authority.vue')
      }
    ]
  }
]

export default routes
