import type { Status } from './common';

// 问卷数据库中，问卷表的每一条数据的类型
export interface SurveyDataType {
  createDate: number; // 存储的是时间戳，所以为数字
  updateDate: number;
  title: string;
  surveyCount: number;
  coms: Status[];
}

// 有id的类型
export interface SurveyDataHasIdType extends SurveyDataType {
  id: number;
}
