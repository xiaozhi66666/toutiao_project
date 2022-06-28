/* 
封装请求模块
1：导入请求axios模块
2：配置请求根路径
3：默认导出请求对象
*/

import axios from "axios";
const request = axios.create({
    //  接收方法的返回值
    baseURL: "http://ttapi.research.itcast.cn", //请求根路径
});

// 导出返回对象
export default request;