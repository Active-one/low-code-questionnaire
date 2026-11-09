// 编辑器的数据状态仓库
import type { NoteTypeStatus, OptionsProps, Status, SurveyDataType } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  setStringStatus,
  AddOption,
  delOption,
  setCurrentStatus,
  setPicOptionByIndex,
  changeOptionsObjIsUseValue,
  changeEditStatusIsShowValue,
} from './actions';
import { isSurveyComName, restoreComType } from '@/utils';
import TextNoteDefaultStatusFn from '@/configs/defaultStatus/TextNote';
import {
  delSurveyById,
  saveSurvey as save,
  getAllSurvey as getAll,
  getSurveyById,
  updateSurveyById,
} from '@/IndexDB/operation';

// 设置问卷默认状态
const setDefultComs = () => {
  const titleCom = TextNoteDefaultStatusFn();
  const descCom = TextNoteDefaultStatusFn();
  titleCom.status.title.status = '问卷标题';
  (titleCom.status.position as OptionsProps).currentStatus = 1;
  (titleCom.status as NoteTypeStatus).noteType!.currentStatus = 0;
  changeEditStatusIsShowValue(titleCom.status as NoteTypeStatus);
  descCom.status.desc.status =
    '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！';

  return [titleCom, descCom];
};

export const useEditorStore = defineStore('editor', () => {
  // 当前选中组件的索引
  const currentSelectComIndex = ref(-1);
  // 问卷中题目的数量（不包括非题目组件（备注说明））
  const surveyComNum = ref(0);
  // 画布组件数组（里面存储的是一个一个的组件状态对象）
  const coms = ref<Status[]>(setDefultComs());

  // 当前选中的组件
  const currentCom = computed(() => coms.value[currentSelectComIndex.value]);

  // 向题目数组中添加题目
  const addCom = (newComStatus: Status) => {
    coms.value.push(newComStatus);
    // 当添加一个新题目时，画布当中不选中任何一个题目
    currentSelectComIndex.value = -1;
    // 题目数量中不计算非题目组件，所有这里要判断下
    if (isSurveyComName(newComStatus.name)) surveyComNum.value++;
  };

  // 设置当前选中组件的索引
  const setCurrentSelectComIndex = (index: number) => {
    currentSelectComIndex.value = index;
  };

  // 删除题目
  const delCom = (index: number) => {
    if (coms.value[index]) {
      // 如果要删除题目组件，那数量要对应--
      if (isSurveyComName(coms.value[index].name)) {
        surveyComNum.value--;
      }
      coms.value.splice(index, 1);
      // 删除之后不选中任何题目
      setCurrentSelectComIndex(-1);
      return true;
    }
  };

  // 将仓库中的组件列表重置至默认状态
  const resetToDefaultComs = () => {
    coms.value = setDefultComs();
    surveyComNum.value = 0;
    currentSelectComIndex.value = -1;
  };

  // 保存问卷
  const saveSurvey = (survey: SurveyDataType) => {
    return save(survey);
  };

  // 获取问卷列表
  const getAllSurvey = () => {
    return getAll();
  };

  // 删除问卷
  const delSurvey = (surveyId: number) => {
    return delSurveyById(surveyId);
  };

  // 根据问卷id获取问卷数据
  const getSurveyDataById = (surveyId: number) => {
    return getSurveyById(surveyId);
  };

  // 恢复问卷数据到仓库中
  const restoreSurveyDataToStore = async (surveyId: number) => {
    // 首先获取问卷数据
    const surveyData = await getSurveyDataById(surveyId);
    // 得到的数据中，组件的type中的render、setup等方法都丢失了，所以要还原组件
    restoreComType(surveyData!.coms);

    // 然后将问卷数据恢复到仓库中
    surveyComNum.value = surveyData!.surveyCount;
    coms.value = surveyData!.coms;
  };

  // 更新问卷
  const updateSurvey = (surveyId: number, surveyData: Partial<SurveyDataType>) => {
    return updateSurveyById(surveyId, surveyData);
  };

  return {
    currentSelectComIndex,
    surveyComNum,
    coms,
    currentCom,
    setStringStatus,
    AddOption,
    delOption,
    setCurrentStatus,
    setPicOptionByIndex,
    changeOptionsObjIsUseValue,
    addCom,
    setCurrentSelectComIndex,
    delCom,
    resetToDefaultComs,
    saveSurvey,
    getAllSurvey,
    delSurvey,
    getSurveyDataById,
    restoreSurveyDataToStore,
    updateSurvey,
  };
});
