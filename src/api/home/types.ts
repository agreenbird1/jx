export interface IChapter {
  content: string;
  createTime: string;
  doOtopicNum: number; // 用户已做的题目数量
  id: number;
  isDelete: 1 | 2; // 是否删除 1.未删除 2.已删除
  isFrontendShow: number;
  otopicNum: number; // 章节对应的题目数量
  parentId: number;
  position: number;
  type: number;
  updateTime: string;
  children: IChapter[];
}

export interface IRecord {
  chapterId: number;
  content: string; // 章节标题
  createTime: string;
  doOtopicNum: number;
  getScore: number;
  handTime: number;
  id: number;
  secondChapterContent: string;
  totalOtopic: number;
  totalScore: number;
  uid: number;
  updateTime: string;
}

export interface IRankItem {
  rank: number;
  nickname: string;
  doQuestionNum: number;
}
