import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import Antd from './Plugins/AntDesign'
import "ant-design-vue/dist/antd.css"
import "../public/global.css"

const app = createApp(App)
Antd(app)
app.use(router)
app.mount('#app')
