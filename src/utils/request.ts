import axios from "axios";
import type { Method, AxiosPromise } from "axios";
import { AFanTiAxiosRequestConfig } from "../types/axios";

const service = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_APP_BASEURL,
});

service.interceptors.request.use(
  (config: AFanTiAxiosRequestConfig) => {
    // if(config.isLoading) {
    //   添加加载动画
    // }
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

service.interceptors.response.use((res) => {
  return res;
});

// 规定返回和请求值的类型
export default <T = any>(
  url: string,
  method: Method,
  data?: unknown,
  config?: AFanTiAxiosRequestConfig // 配置其他，包括 isLoading
): AxiosPromise<T> => {
  return service({
    url,
    method,
    [method.toLocaleLowerCase() === "get" ? "params" : "data"]: data,
    ...config,
  });
};
