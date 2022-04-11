import { request, BaseResponse } from "@/utils/request";

/**
 * @description 登录
 * @param {LoginParams} data
 * @returns
 */
export function login(data: API.LoginParams) {
  return request<BaseResponse<API.LoginResult>>({
    url: "base/login",
    method: "POST",
    data,
  });
}
