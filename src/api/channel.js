import request from "@/utils/request.js";
export const getAllChannel = () =>
    request({
        method: "GET",
        url: "/v1_0/channels",
    });