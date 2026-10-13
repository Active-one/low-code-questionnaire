// 定义类型文件公用的类型
import { defineComponent } from 'vue';
import type {
  optionStatusArr,
  ValueObjStatus,
  PicTitleOrDescValueObjStatus,
  PicLinkObj,
  ComsKey,
  StatusKeys,
  StringTextProps,
  OptionsProps,
  HasIsUseOptionsProps,
} from './index';

// vue组件实例的类型
export type VueComType = ReturnType<typeof defineComponent>;

// 配置文件中的默认状态对象的类型
export interface Status {
  type: VueComType;
  id: string;
  name: ComsKey;
  status: {
    [K in StatusKeys]: StringTextProps | OptionsProps | HasIsUseOptionsProps;
  } & {
    options?: OptionsProps | HasIsUseOptionsProps;
    textType?: OptionsProps;
    noteType?: OptionsProps;
  };
}

// 默认状态映射对象的类型
export type defaultStatusMapType = {
  [K in ComsKey]: () => Status;
};

// 编辑组件的组件名称联合类型
export type EditItemComsNameType =
  | 'auxiliary-text-editor'
  | 'color-editor'
  | 'date-type-editor'
  | 'desc-editor'
  | 'italic-editor'
  | 'note-type-editor'
  | 'options-editor'
  | 'pic-options-editor'
  | 'position-editor'
  | 'size-editor'
  | 'text-type-editor'
  | 'title-editor'
  | 'weight-editor';

// 业务组件+编辑组件名称的联合类型
export type comsKeyType = ComsKey | EditItemComsNameType;

// 组件名称到具体组件映射对象的类型
export type ComponentMapType = Record<comsKeyType, VueComType>;

// 判断status是否为字符串数组
export const isStringArray = (status: optionStatusArr): status is string[] => {
  return Array.isArray(status) && typeof status[0] === 'string';
};

// 判断对象是否为valueObj类型
export const isValueObj = (obj: object): obj is ValueObjStatus => {
  return typeof obj === 'object' && 'status' in obj && 'value' in obj;
};

// 判断status是否为valueObj类型的数组
export const isValueObjArray = (status: optionStatusArr): status is ValueObjStatus[] => {
  return Array.isArray(status) && typeof status[0] === 'object' && isValueObj(status[0]);
};

// 判断对象是否为PicTitleOrDescValueObj类型;
export const isPicTitleOrDescValueObj = (obj: object): obj is PicTitleOrDescValueObjStatus => {
  return typeof obj === 'object' && 'picTitle' in obj && 'picDesc' in obj && 'value' in obj;
};

// 判断status是否为PicTitleOrDescValueObj类型的数组
export const isPicTitleOrDescValueObjArray = (
  status: optionStatusArr,
): status is PicTitleOrDescValueObjStatus[] => {
  return (
    Array.isArray(status) && typeof status[0] === 'object' && isPicTitleOrDescValueObj(status[0])
  );
};

// 判断对象是否为picLink对象类型
export const isPicLinkObj = (obj: object): obj is PicLinkObj => {
  return typeof obj === 'object' && 'index' in obj && 'link' in obj;
};
