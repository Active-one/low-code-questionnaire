// 组件市场内所有组件状态的仓库
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import {
  setStringStatus,
  AddOption,
  delOption,
  setCurrentStatus,
  setPicOptionByIndex,
  changeOptionsObjIsUseValue,
} from './actions';
import type { ComsKey, PresetComsKeyType, Status } from '@/types';
import { updateDefaultStatusBeforeAdd } from '@/utils';

// 需要初始化的组件name数组
const needInitNames: PresetComsKeyType[] = [
  'personal-info-name',
  'personal-info-id',
  'personal-info-birth',
  'personal-info-gender',
  'personal-info-age',
  'personal-info-education',
  'personal-info-collage',
  'personal-info-major',
  'personal-info-industry',
  'personal-info-career',
  'personal-info-company',
  'personal-info-position',
  'personal-info-tel',
  'personal-info-wechat',
  'personal-info-qq',
  'personal-info-email',
  'personal-info-address',
];

// 保存初始化后的状态对象
const initializedStatus: {
  [K in PresetComsKeyType]?: Status;
} = {};

// 遍历进行初始化
needInitNames.forEach((comName: PresetComsKeyType) => {
  // 保存默认的状态对象
  let defaultStatus = defaultStatusMap[comName]();
  // 初始化对应的状态对象
  updateDefaultStatusBeforeAdd(defaultStatus, comName);
  // console.log(comName, defaultStatus);
  initializedStatus[comName] = defaultStatus;
});

export const useMaterialStore = defineStore('material', () => {
  // 当前选中的业务组件名称
  const currentMaterialCom = ref<ComsKey>('single-select');
  // 记录所有的业务组件的状态
  const coms = ref({
    'single-select': defaultStatusMap['single-select'](),
    'multi-select': defaultStatusMap['multi-select'](),
    'options-select': defaultStatusMap['options-select'](),
    'single-pic-select': defaultStatusMap['single-pic-select'](),
    'multi-pic-select': defaultStatusMap['multi-pic-select'](),
    'text-input': defaultStatusMap['text-input'](),
    'evaluate-mark': defaultStatusMap['evaluate-mark'](),
    'date-time': defaultStatusMap['date-time'](),
    'text-note': defaultStatusMap['text-note'](),
    // 预设组件
    'personal-info-name': initializedStatus['personal-info-name'],
    'personal-info-id': initializedStatus['personal-info-id'],
    'personal-info-birth': initializedStatus['personal-info-birth'],
    'personal-info-gender': initializedStatus['personal-info-gender'],
    'personal-info-age': initializedStatus['personal-info-age'],
    'personal-info-education': initializedStatus['personal-info-education'],
    'personal-info-collage': initializedStatus['personal-info-collage'],
    'personal-info-major': initializedStatus['personal-info-major'],
    'personal-info-industry': initializedStatus['personal-info-industry'],
    'personal-info-career': initializedStatus['personal-info-career'],
    'personal-info-company': initializedStatus['personal-info-company'],
    'personal-info-position': initializedStatus['personal-info-position'],
    'personal-info-tel': initializedStatus['personal-info-tel'],
    'personal-info-wechat': initializedStatus['personal-info-wechat'],
    'personal-info-qq': initializedStatus['personal-info-qq'],
    'personal-info-email': initializedStatus['personal-info-email'],
    'personal-info-address': initializedStatus['personal-info-address'],
  });

  // 根据当前选中的业务组件名称，得到其状态对象
  const currentMaterialStatus = computed(() => coms.value[currentMaterialCom.value]);

  // 修改当前选中的业务组件名称
  const changeCurrentMaterialCom = (newMaterialComName: ComsKey) => {
    if (coms.value[newMaterialComName]) {
      // 更新为新的值
      currentMaterialCom.value = newMaterialComName;
    }
  };

  return {
    currentMaterialCom,
    currentMaterialStatus,
    coms,
    changeCurrentMaterialCom,
    setStringStatus,
    AddOption,
    delOption,
    setCurrentStatus,
    setPicOptionByIndex,
    changeOptionsObjIsUseValue,
  };
});
