import type { App } from 'vue';
import { createPinia } from 'pinia';

// import store from '@/store'

export function init(app: App) {
  app.use(createPinia());
}
