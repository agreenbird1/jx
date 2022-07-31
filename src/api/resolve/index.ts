import request from "@/utils/request";

/**
 * @returns 获取做题记录批改结果
 * @param eid - 做题记录id
 */
export const getResolvesById = (eid: number) => {
  return request.get<null>(`/question/userHandExam/mark/result?eid=${eid}`);
};
