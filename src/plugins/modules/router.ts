import type { App } from 'vue'

import router from '@/router'
import { createRouterGuards } from '@/router/router-guards'

export function init(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}
