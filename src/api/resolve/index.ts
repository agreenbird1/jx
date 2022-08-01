import request from "@/utils/request";

export interface IResolveData {
  correctNum: number;
  getScore: number;
  totalOtopic: number;
  totalScore: number;
  markOtopicVos: IResolveItem[];
}

export interface IResolveItem {
  answer: string;
  correctRate: number;
  id: number;
  options: string;
  otopicStatus: number;
  resolve: string;
  score: number;
  selectAnswer: string;
  title: string;
  topicNumber: number;
  type: number;
  optionSelectVos: IOptionRate[];
}

export interface IOptionRate {
  option: string;
  optionRate: number;
}

/**
 * @returns 获取做题记录批改结果
 * @param eid - 做题记录id
 */
export const getResolvesById = (eid: number) => {
  return request.get<IResolveData>(
    `/question/userHandExam/mark/result?eid=${eid}`
  );
};
