import { createApp } from 'vue'
import App from './App.vue'
import plugins from '@/plugins'

const app = createApp(App)

plugins.init(app, ['router', 'store'])

app.mount('#app')
