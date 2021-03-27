import { createApp } from 'vue'
import App from '@/App.vue'
import router from './Router'
import axios from './Request'
import Antd from './Plugins/AntDesign'
import "ant-design-vue/dist/antd.css"
import "@/Global/index.less"

const app = createApp(App)
Antd(app)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$router = router;
app.use(router).mount('#app')
