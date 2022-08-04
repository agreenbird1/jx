import request from "@/utils/request";
import { IUser, IWxUserInfo } from "./types";
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
export const loginByCode = (
  phone: string,
  code: string,
  weiXinVo: IWxUserInfo
) => {
  return request.post<IUser>("/auth/loginByCode", { phone, code, weiXinVo });
};

/**
 *
 * @param code - 微信扫面后的code
 * @returns 微信用户信息
 */
export const getWxUserInfo = (code: string) => {
  return request.get<IWxUserInfo>(`/auth/weiXin/login?code=${code}`);
};
