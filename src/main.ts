import { createApp } from 'vue';
import App from './App.vue';
import plugins from '@/plugins';
import 'windi.css';

import { ElLoading } from 'element-plus';
import 'element-plus/es/components/loading/style/css';
import 'element-plus/es/components/message/style/css';

const app = createApp(App);

app.use(ElLoading);

plugins.init(app, ['router', 'store']);

app.mount('#app');
