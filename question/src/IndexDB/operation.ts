// 定义具体的数据库相关操作
import { db } from './db';
import type { SurveyDataType } from '@/types';

// 保存数据
export const saveSurvey = (survey: SurveyDataType) => {
  return db.surveies.add(survey);
};

// 查询所有数据
export const getAllSurvey = () => {
  return db.surveies.toArray();
};

// 根据id查询某一条数据
export const getSurveyById = (surveyId: number) => {
  return db.surveies.get(surveyId);
};

// 根据id删除某一条数据
export const delSurveyById = (surveyId: number) => {
  return db.surveies.delete(surveyId);
};

// 根据id更新某一条数据
export const updateSurveyById = (surveyId: number, surveyData: Partial<SurveyDataType>) => {
  return db.surveies.update(surveyId, surveyData);
};
