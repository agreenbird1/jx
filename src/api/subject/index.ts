import request from "@/utils/request";

export interface IChapterSubject {
  chapterId: number;
  content: string;
  otopicFrontVos: IChapterSubjectDetails[];
}

export interface IChapterSubjectDetails {
  id: number;
  options: string;
  score: number;
  title: string;
  topicNumber: number;
  type: 1 | 2 | 3;
}

export interface ISubmitSubject {
  uid: number;
  oid: number;
  chapterId: number;
  selectAnswer: string;
  otopicScore: number;
}
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
