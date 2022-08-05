import request from "@/utils/request";
import { IResolveData } from "./types";

/**
 * @returns 获取做题记录批改结果
 * @param eid - 做题记录id
 */
export const getResolvesById = (eid: number) => {
  return request.get<IResolveData>(
    `/question/userHandExam/mark/result?eid=${eid}`
  );
};
