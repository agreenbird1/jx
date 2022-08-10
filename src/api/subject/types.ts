export interface IChapterSubject {
  chapterId: number;
  content: string;
  eid: number; // 当前第一次进入的考试 id
  firstTime: number; // 开始时间，时间戳
  otopicFrontVos: IChapterSubjectDetails[];
}

export interface IChapterSubjectDetails {
  id: number; // 做题记录 id
  oid: number; // 客观题 id
  options: string;
  score: number;
  title: string;
  topicNumber: number;
  type: 1 | 2 | 3;
  chapterId: number;
  eid: number;
  selectAnswer: string;
  isMark: 0 | 1;
}

export interface ISubmitSubject {
  id: number;
  oid: number;
  selectAnswer: string;
  otopicScore: number;
  isMark?: 1 | 0;
}
