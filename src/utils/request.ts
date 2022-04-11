import axios, { AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";

export type Response<T = any> = {
  code: number;
  message: string;
  data: T;
};

export interface RequestConfig extends AxiosRequestConfig {
  /** 请求成功是提示信息 */
  successMsg?: string;
  /** 请求失败是提示信息 */
  errorMsg?: string;
}

export type BaseResponse<T = any> = Promise<Response<T>>;

const UNKNOWN_ERROR = "未知错误，请重试";

const service = axios.create({
  // baseURL: baseApiUrl,
  timeout: 6000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 200) {
      const error = new Error(res.message || UNKNOWN_ERROR) as Error & {
        code: any;
      };
      error.code = res.code;
      return Promise.reject(error);
    } else {
      return res;
    }
  },
  (error) => {
    // 处理 422 或者 500 的错误异常提示
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
    ElMessage(error);
    error.message = errMsg;
    return Promise.reject(error);
  }
);

export const request = async <T = any>(config: RequestConfig): Promise<T> => {
  try {
    const res = await service.request(config);
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
