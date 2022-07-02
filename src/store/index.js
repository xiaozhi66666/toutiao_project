import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 导入存储信息模块的方法
import { getItem, setItem } from "@/utils/storage";
const TOKEN_KET = "TOKEN_USER";
// 在vuex中保存token的优势：
//1：如果在本地localStroage中村塾，获取的时候会很麻烦，并且数据不是响应式，也就是数据发生改变了不会影响到用到该数据的地方2:如果放在vuex容器中进行存储，首先数据是响应式，而且获取方便，但是要注意，vuex保存数据并不是持久化的，所以最后需要将其保存到本地
export default new Vuex.Store({
    state: {
        // 定义一个变量，来保存用户登录成功后的token等信息
        user: getItem(TOKEN_KET), // 定义好存储到本地后直接从本地取值
    },
    mutations: {
        // 关于state中的数据的计算改变一定是写在mutations
        setUser(state, data) {
            state.user = data;
            // 这是固定写法，state为第一个参数(定义vuex容器中的变量)，data为形参，后面的调用中传入形参
            // 未来防止页面刷新，导致代码重新格式化，保存的数据会丢失，因为在此处设定的是按下登录在触发保存,我们将值再保存到本地存储中去
            setItem(TOKEN_KET, state.user); //记住要转成JSON字符串再进行存储
        },
    },
    actions: {},
    modules: {},
});