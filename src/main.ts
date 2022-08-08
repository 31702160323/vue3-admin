import { createApp } from 'vue'
import App from './App.vue'
import plugins from '@/plugins'
import 'windi.css'

const app = createApp(App)

plugins.init(app, ['router', 'store'])

app.mount('#app')
