// 导入根请求
import request from "@/utils/request.js";
// 导出基于根请求配置好的登录获取数据请求
export const login = (data) => {
    return request({
        method: "POST",
        url: "/v1_0/authorizations",
        data,
    });
};

// 导出登录页发起获取验证码的请求
export const getCode = (mobile) => {
    return request({
        method: "GET",
        url: `/v1_0/sms/codes/${mobile}`, // 传参：手机号http://toutiao.itheima.net/v1_0/sms/codes/:mobile
    });
};

// 导出获取用户个人资料的请求
export const getUserInfo = () => {
    return request({
        method: "GET",
        url: "/v1_0/user",
        // 注意看接口文档必须携带请求头信息，去接口处设置
        // headers: {
        //     // 在设置具体请求方式的时候，在里面加入headers:{}可设置具体请求头信息！！！
        //     // 注意仔细看接口文档Bearer+空格+用户token
        //     Authorization: `Bearer ${store.state.user.token}`, //===> 容器模块下 => 具体容器名 ==> 存储对象 ==> 存储对象中存储的属性名 （token/refreshToken）
        // },
    });
};
// 导出获取用户频道的请求
export const getChannels = () => {
    return request({
        method: "GET",
        url: "/v1_0/user/channels",
    });
};