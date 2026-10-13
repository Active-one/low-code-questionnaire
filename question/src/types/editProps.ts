// 定义编辑组件props类型
import type { EditItemComsNameType, VueComType } from './common';
import type { ComsKey } from './store';

// 单个编辑组件的基本props类型
export interface BaseProps {
  name: EditItemComsNameType;
  id: string;
  isShow: boolean;
  editCom: VueComType;
}

// 三种数组形式的status中单个对象的类型别名
export type StringStatus = string;
export type ValueObjStatus = { value: string; status: string };
export type PicTitleOrDescValueObjStatus = {
  picTitle: string;
  picDesc: string;
  value: string;
};

// status字段为字符串内容的props类型
export interface StringTextProps extends BaseProps {
  status: string;
}
// 三种数组形式的status类型别名
export type optionStatusArr =
  StringStatus[] | Array<ValueObjStatus> | PicTitleOrDescValueObjStatus[];

// status字段为数组的props类型，数组内容可以为上面三种情况任何一种
export interface OptionsProps extends BaseProps {
  status: optionStatusArr;
  currentStatus: number;
}

// 含有isUse属性且status字段为数组的props类型，数组内容可以为上面三种情况任何一种
export interface HasIsUseOptionsProps extends OptionsProps {
  isUse: boolean;
}

// 业务组件的基本props类型（就是某个业务组件的status字段的类型）
export interface BaseStatus {
  title: StringTextProps;
  desc: StringTextProps;
  position: OptionsProps;
  titleSize: OptionsProps;
  descSize: OptionsProps;
  titleWeight: OptionsProps;
  descWeight: OptionsProps;
  titleItalic: OptionsProps;
  descItalic: OptionsProps;
  titleColor: StringTextProps;
  descColor: StringTextProps;
}

// 并不是所有业务组件都有选项，索引单独定义有选项的类型
export interface OptionsStatus extends BaseStatus {
  options?: OptionsProps;
}

// 含有textTypetype编辑项的业务组件
export interface TextTypeStatus extends BaseStatus {
  textType?: OptionsProps;
}

// options对象包含isUse属性的业务组件
export interface OptionsHasIsUseStatus extends BaseStatus {
  options?: HasIsUseOptionsProps;
}

// 含有noteType编辑项的业务组件
export interface NoteTypeStatus extends BaseStatus {
  noteType?: OptionsProps;
}

// status对象的键的联合类型
export type StatusKeys = keyof BaseStatus;

// picLink对象的类型
export type PicLinkObj = { index: number; link: string };

export type SurveyComType = {
  title: string;
  icon: VueComType;
  comList: {
    comName: string;
    materialName: ComsKey;
  }[];
};
// 题型列表的类型
export type SurveyComListType = SurveyComType[];
