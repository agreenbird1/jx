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
