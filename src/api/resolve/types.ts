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
  isMark: 1 | 0;
}

export interface IOptionRate {
  option: string;
  optionRate: number;
}
