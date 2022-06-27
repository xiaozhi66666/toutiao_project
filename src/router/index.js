import Vue from "vue";
import VueRouter from "vue-router";
// 引入全局less文件
import "@/styles/index.less";
// 引入vant
import Vant from "vant";
// 引入vant的css文件
import "vant/lib/index.css";

Vue.use(Vant);
Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
    routes,
});

export default router;