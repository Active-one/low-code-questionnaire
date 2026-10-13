// pinia仓库的类型文件
import type { Status } from './common';
import type { HasIsUseOptionsProps, OptionsProps, PicLinkObj, StringTextProps } from './editProps';

// 单选组件的组件名称联合类型
type SelectComsKeyType =
  'single-select' | 'multi-select' | 'options-select' | 'single-pic-select' | 'multi-pic-select';
// 文本输入组件的组件名称联合类型
type InputComsKeyType = 'text-input';
// 高级题型组件的组件名称联合类型
type AdvancedComsKeyType = 'evaluate-mark' | 'date-time';
// 预设组件的组件名称类型
export type PresetComsKeyType =
  | 'personal-info-name'
  | 'personal-info-id'
  | 'personal-info-birth'
  | 'personal-info-gender'
  | 'personal-info-age'
  | 'personal-info-education'
  | 'personal-info-collage'
  | 'personal-info-major'
  | 'personal-info-industry'
  | 'personal-info-career'
  | 'personal-info-company'
  | 'personal-info-position'
  | 'personal-info-tel'
  | 'personal-info-wechat'
  | 'personal-info-qq'
  | 'personal-info-email'
  | 'personal-info-address';

// 题目类型
export type SurveyComName =
  SelectComsKeyType | InputComsKeyType | AdvancedComsKeyType | PresetComsKeyType;

// 备注说明组件的组件名称联合类型（非题目类型）
type NoteComsKeyType = 'text-note';

// 拥有的业务组件键的类型（题目类型 + 非题目类型）
export type ComsKey = SurveyComName | NoteComsKeyType;

// 当前选中的业务组件名称的类型
export type currentMaterialComType = string;

// 组件市场仓库的类型
export interface MaterialStoreType {
  currentMaterialCom: currentMaterialComType;
  coms: Record<ComsKey, Status>;
  currentMaterialStatus: Status;
  // 方法类型
  changeCurrentMaterialCom: (newMaterialComName: string) => void;
  setStringStatus: (editStatus: StringTextProps, newStatus: string) => void;
  setCurrentStatus: (editStatus: OptionsProps, newStatus: number) => void;
  AddOption: (editStatus: OptionsProps, newValue: string | object) => void;
  delOption: (editStatus: OptionsProps, index: number) => boolean;
  setPicOptionByIndex: (editStatus: OptionsProps, newStatus: PicLinkObj) => void;
  changeOptionsObjIsUseValue: (editStatus: HasIsUseOptionsProps, newValue: boolean) => void;
}

// 包含所有题目组件名称的数组
export const surveyNameArr = [
  'single-select',
  'multi-select',
  'options-select',
  'single-pic-select',
  'multi-pic-select',
  'text-input',
  'evaluate-mark',
  'date-time',
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

// 包含所有可生成PDF的组件名称的数组
export const canGeneratePDFComNameArr: ComsKey[] = [
  'single-select',
  'multi-select',
  'single-pic-select',
  'multi-pic-select',
  'text-input',
  'text-note',
  'personal-info-name',
  'personal-info-id',
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
