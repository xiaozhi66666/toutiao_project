import request from "@/utils/request.js";
// 获取所有频道列表的请求
export const getAllChannel = () =>
    request({
        method: "GET",
        url: "/v1_0/channels",
    });
// 增加频道指定列表的请求
export const addUserChannel = (channel) =>
    request({
        method: "PATCH",
        url: "/v1_0/user/channels",
        data: {
            channels: [channel],
        },
    });
// 删除频道指定列表的请求
export const delUserChannel = (channelID) =>
    request({
        method: "DELETE",
        url: `/v1_0/user/channels/${channelID}`,
    });