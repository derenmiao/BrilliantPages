const routes = [
    {
        path: "/",
        redirect:{name: 'Home'},
        meta: {
            title:'特效',
            key: '0',
            icon:'WindowsOutlined'
        },
        component:  () => import('@/Layout/index.vue'),
        children: [
            { 
                path: "tianqi", 
                name: "Home", 
                meta: {
                    title:'第一页',
                    key: '0-0',
                    icon:'WindowsOutlined'
                },
                component:  () => import('@/Views/Home/Tianqi/index.vue') 
            },
            { 
                path: "shenqiu", 
                name: "Home2", 
                meta: {
                    title:'第2页',
                    key: '0-1',
                    icon:'WindowsOutlined'
                }, 
                component:  () => import('@/Views/Home/Shenqiu/index.vue')
            },
        ]
    },
    {
        path: "/func",
        redirect: { name: 'Thor' },
        meta: {
            key: '1',
            title:'功能',
            icon:'WindowsOutlined'
        },
        component:  () => import('@/Layout/index.vue'),
        children: [
            { 
                path: "thor", 
                name: "Thor",
                meta: {
                    key: '1-0',
                    title:'thor',
                    icon:'WindowsOutlined'
                },
                component:  () => import('@/Views/Function/Thor/index.vue') 
            },
        ]
    },
    { 
        path: '/:pathMatch(.*)',
        name: 'CodePage', 
        meta: {
            key: '-1',
            hident: true
        },
        component: () => import('@/Views/StatusPage/index.vue'), 
        params: { code: 404, msg: '404 NOT PAGES', msg_cn: '页面找不到' },
    }
];

export default routes;