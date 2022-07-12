import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/login"),
    },
    {
        path: "/",
        // name: "layout",
        component: () =>
            import ("@/views/layout"),
        children: [{
                path: "/", // 如果路径设置为空，则为默认路径
                name: "home",
                component: () =>
                    import ("@/views/home"),
            },
            {
                path: "/my",
                name: "my",
                component: () =>
                    import ("@/views/my"),
            },
            {
                path: "/video",
                name: "video",
                component: () =>
                    import ("@/views/video"),
            },
            {
                path: "/qa",
                name: "qa",
                component: () =>
                    import ("@/views/qa"),
            },
        ],
    },
    {
        path: "/search",
        name: "search",
        component: () =>
            import ("@/views/search"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;