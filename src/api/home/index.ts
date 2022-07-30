import request from "@/utils/request";
import { useUserStore } from "@/store/user";
import pinia from "@/store";
import { IChapter, IRankItem, IRecord } from "./types";

export * from "./types";

const userStore = useUserStore(pinia);

/**
 * 根据用户id查询章节题目信息
 */
export const getAllSubjects = () => {
  return request.get<IChapter[]>(
    `/question/chapter/otopic/records?uid=${userStore.id}`
  );
};

/**
 * 获取做题记录
 */
export const getRecords = (isShowAll = true) => {
  return request.get<IRecord[]>(
    `/question/userHandExam/get/records?uid=${1}&isShowAll=${isShowAll}`
  );
};

/**
 * 50名排名
 */
export const getRankList = () => {
  return request.get<IRankItem[]>("/question/userOtopicRecords/top/fifty");
};
