import request from "@/utils/request";
import { useUserStore } from "@/store/user";
import pinia from "@/store";
import { IChapterSubject, ISubmitSubject } from "./types";

const userStore = useUserStore(pinia);

/**
 * 根据章节id查询章节下的题目信息
 * @param chapterId - 章节id
 */
export const getSubjectsByChapterId = (chapterId: string) => {
  return request.get<IChapterSubject[]>(
    `/question/otopic/get/byChapter?uid=${userStore.id}&chapterId=${chapterId}`
  );
};

/**
 *
 * @param payload - 交卷信息！
 */
export const submitChapter = (
  payload: {
    nickname: string;
    totalScore: number;
    eid: number;
    userOtopicRecords: ISubmitSubject[];
  },
  submitType: 0 | 1 = 0
) => {
  return request.post<number>(
    `/question/userHandExam/submit/paper?submitType=${submitType}`,
    payload
  );
};
