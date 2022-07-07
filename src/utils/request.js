/* 
封装请求模块
1：导入请求axios模块
2：配置请求根路径
3：默认导出请求对象
*/
import axios from "axios";
// 导入vuex中的容器模块
import store from "@/store";
const request = axios.create({
    //  接收方法的返回值
    baseURL: "http://toutiao.itheima.net", //请求根路径
});

// 添加请求拦截器
// 在这里我们已经利用axios.create()配置好了一个axios对象，所以在这里必须要给这个新生成的axios对象进行配置请求拦截器
request.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        // config  ==>  本次请求的配置对象
        // console.log(config);
        // 将store中的容器user从store.state中解构出来
        const { user } = store.state;
        if (user && user.token) {
            //这里添加一个判断，如果用户已经登录并且用户token已经保存就让其添加请求头，否则无效，截断请求
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        // console.log(config);
        //注意，这里务必要返回config配置对象，否则请求就会停留再这里出不去，也就访问不到这个请求
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        // 这里不需要进行任何修改，（还没有发出去请求）会进入这里，抛出错误
        return Promise.reject(error);
    }
);
// 导出返回对象
export default request;