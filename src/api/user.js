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
        url: `/v1_0/sms/codes/${mobile}`, // 传参：手机号
    });
};