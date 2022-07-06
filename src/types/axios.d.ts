import { AxiosRequestConfig } from "axios";

export interface AFanTiAxiosRequestConfig extends AxiosRequestConfig {
  isLoading?: boolean;
}
