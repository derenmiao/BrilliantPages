const routes = [
    {
        path: "/",
        redirect:'/tianqi',
        key: '0',
        title:'特效',
        meta: { icon:'WindowsOutlined' },
        component:  () => import('@/Views/Home/index.vue'),
        children: [
            { path: "/tianqi", name: "Home", key:'0-0', title:'第一页', component:  () => import('@/Views/Home/Tianqi/index.vue') },
            { path: "/shenqiu", name: "Home2", key:'0-1', title:'第2页', component:  () => import('@/Views/Home/Shenqiu/index.vue')},
        ]
    },
    {
        path: "/func",
        redirect:'/func/thor',
        key: '1',
        title:'功能',
        meta: { icon:'WindowsOutlined' },
        component:  () => import('@/Views/Function/index.vue'),
        children: [
            { path: "/func/thor", name: "Home", key:'1-0', title:'thor', component:  () => import('@/Views/Function/Thor/index.vue') },
        ]
    },
    { path: "/about", name: "About", key: '-2', title:'关于', meta: { icon:'WindowsOutlined' }, component:  () => import('@/Views/About/index.vue')},
    { 
        path: '/:pathMatch(.*)',
        name: 'CodePage', 
        key: '-1',
        component: () => import('@/Views/StatusPage/index.vue'), 
        params: { code: 404, msg: '404 NOT PAGES', msg_cn: '页面找不到' },
        hident: true
    }
];

export default routes;