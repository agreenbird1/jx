import request from "@/utils/request";
import { IChapterSubject, ISubmitSubject } from "./types";

/**
 * 根据章节id查询章节下的题目信息
 * @param chapterId - 章节id
 */
export const getSubjectsByChapterId = (chapterId: string) => {
  return request.get<IChapterSubject[]>(
    `/question/otopic/get/byChapter?chapterId=${chapterId}`
  );
};

/**
 *
 * @param payload - 交卷信息！
 */
export const submitChapter = (payload: {
  uid: number;
  nickname: string;
  totalScore: number;
  totalOtopic: number;
  handTime: number;
  userOtopicRecords: ISubmitSubject[];
}) => {
  return request.post<number>("/question/userHandExam/submit/paper", payload);
};
