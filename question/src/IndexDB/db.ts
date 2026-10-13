// 定义数据库已经表的结构
import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { SurveyDataType } from '@/types';

// 继承Dexie类，方便添加一些自己的属性
class SurveyDataBase extends Dexie {
  // 定义一个属性 surveies，后面是该属性的类型
  // 该类型表示表的每一条记录是第一个参数类型，主键是number类型
  // 可以给该属性非空断言一下，表示使用它的时候一定不为空
  surveies!: Table<SurveyDataType, number>;

  constructor() {
    // 调用dexie的方法，定义数据库的名称
    super('SurveyDataBase');
    this.version(1).stores({
      // 定义问卷表的结构，++id表示id自增
      surveies: '++id, createDate, updateDate, title, surveyCount, coms',
    });
  }
}

export const db = new SurveyDataBase();
