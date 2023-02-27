import { request, BaseResponse } from '@/utils/request';

/**
 * @description 登录
 * @param {LoginParams} data
 * @returns
 */
export function login(data: API.LoginParams) {
  return request<BaseResponse<API.LoginResult>>({
    url: 'base/login',
    method: 'POST',
    data
  });
}

export function getImageCaptcha(params?: API.CaptchaParams) {
  return request<API.CaptchaResult>({
    url: 'captcha/img',
    method: 'get',
    params
  });
}

export function getContainer() {
  return request({
    url: '/docker/container',
    method: 'get'
  });
}
