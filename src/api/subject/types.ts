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
  chapterId: number;
}

export interface ISubmitSubject {
  uid: number;
  oid: number;
  chapterId: number;
  selectAnswer: string;
  otopicScore: number;
  isMark?: 1 | 0;
}
