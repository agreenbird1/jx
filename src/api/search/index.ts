import request from "@/utils/request";
import { ISubmitSubject } from "..";

export interface ISearchSubject {
  id: number;
  topicNumber: number;
  type: number;
  title: string;
  options: string;
  chapterId: number;
  answer?: string | string[];
  isSubmit?: boolean;
  resolve?: string;
  rightAnswer?: string;
  otopicStatus: 0 | 1 | 2;
}

/**
 *
 * @param keyWords - 关键字
 */
export const searchSubjectByKeyWords = (keyWords: string, isAll = true) => {
  return request.get<ISearchSubject[]>(
    `/search/otopic?condition=${keyWords}&isAll=${isAll}`
  );
};

/**
 *
 * @param id - 题目id
 * @return 根据题目id查询结果
 */
export const searchSubjectResult = (payload: ISubmitSubject) => {
  return request.post<{
    resolve: string;
    answer: string;
    otopicStatus: 0 | 1 | 2;
  }>(`/question/userOtopicRecords/submit`, payload);
};
