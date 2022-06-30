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