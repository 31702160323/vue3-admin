import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import admin from '@/router/modules/admin'
import system from '@/router/modules/system'
import common from '@/router/modules/common'

console.log('初始化 vue-router')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/system',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/index.vue'),
    meta: {
      title: '首页'
    },
    children: [...admin, ...system]
  },
  ...common
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
