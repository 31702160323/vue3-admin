import type { App } from 'vue';
import { createPinia } from 'pinia';

export function init(app: App) {
  app.use(createPinia());
}
