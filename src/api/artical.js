// 导入根请求
import request from "@/utils/request.js";
// 导出基于根请求配置好获取新闻列表信息数据请求
// 导出获取文章新闻推荐的请求;
export const getArticalList = (params) => {
    return request({
        method: "GET",
        url: "/v1_0/articles",
        params,
    });
};