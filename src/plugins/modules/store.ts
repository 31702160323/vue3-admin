import type { App } from 'vue'

import store from '@/store'

export function init(app: App) {
  app.use(store)
}
