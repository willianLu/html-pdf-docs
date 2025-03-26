import { createApp } from 'vue'
// 引入全局样式
import '@/assets/style/index.less'
// 弹窗样式
import '@arco-design/web-vue/es/message/style/css.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
