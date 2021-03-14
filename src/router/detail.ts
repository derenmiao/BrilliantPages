import Home from '@/views/Home/index.vue'
import About from '@/views/About/index.vue'
import StatusCode from '@/views/StatusPage/index.vue'

const routes = [
    {
        path: "/",
        redirect:'/home',
        key: '0',
        title:'特效',
        icon:'WindowsOutlined',
        component:  Home,
        children: [
            { path: "/home", name: "Home",key:'0-0', title:'第一页', component:  Home},
        ]
    },
    { path: "/about", name: "About", key: '99', title:'关于', component:  About},
    { path: '/:pathMatch(.*)', key: '-1', component: StatusCode, hident: true}
];

export default routes;