export interface IUser {
  id: number;
  nickname: string;
  avatar: string;
  phone: string;
}

export interface IWxUserInfo {
  avatar: string;
  openid: string;
  id?: number;
  nickname?: string;
  phone?: string;
}
