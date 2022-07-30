import request from "@/utils/request";
import { IUser } from "./types";
export * from "./types";

/**
 * 验证码发送请求
 * @param phone - 手机号
 */
export const sendCode = (phone: string) => {
  return request.get<null>(`/auth/sendCode?phone=${phone}`);
};

/**
 * 无需前端验证，后端进行逻辑校验
 * @param phone - 手机号
 * @param code - 验证码发送后收到的code
 */
export const loginByCode = (phone: string, code: string) => {
  return request.post<IUser>("/auth/loginByCode", { phone, code });
};
