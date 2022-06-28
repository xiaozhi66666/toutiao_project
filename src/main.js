import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局less文件
import "@/styles/index.less";
// 引入vant
import Vant from "vant";
// 引入vant的css文件
import "vant/lib/index.css";
// 加载动态设置rem基准值
import "amfe-flexible";

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");