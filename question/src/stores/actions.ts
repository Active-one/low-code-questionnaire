// 提取一些公共的action
import type {
  HasIsUseOptionsProps,
  NoteTypeStatus,
  OptionsProps,
  PicLinkObj,
  Status,
  StatusKeys,
  StringTextProps,
} from '@/types';
import { isPicTitleOrDescValueObj, isPicTitleOrDescValueObjArray, isStringArray } from '@/types';

// 更新状态对象中status字段下的status字段为字符串的编辑对象
export const setStringStatus = (editStatus: StringTextProps, newStatus: string) => {
  editStatus.status = newStatus;
};

// 更新编辑对象的currentStatus字段
export const setCurrentStatus = (editStatus: OptionsProps, newStatus: number) => {
  editStatus.currentStatus = newStatus;
};

// 添加option
export const AddOption = (editStatus: OptionsProps, newValue: string | object) => {
  // 添加字符串类型的option
  if (isStringArray(editStatus.status) && typeof newValue === 'string') {
    editStatus.status.push(newValue);
  }
  // 添加对象类型的option
  else if (typeof newValue === 'object') {
    // 添加PicTitleOrDescValueObj类型的option
    if (isPicTitleOrDescValueObjArray(editStatus.status) && isPicTitleOrDescValueObj(newValue)) {
      editStatus.status.push(newValue);
    }
  }
};

// 删除选项
export const delOption = (editStatus: OptionsProps, index: number) => {
  if (editStatus.status.length === 2) {
    return false;
  } else {
    editStatus.status.splice(index, 1);
    return true;
  }
};

// 根据传递的index设置对应的图片option对象的value
export const setPicOptionByIndex = (editStatus: OptionsProps, newStatus: PicLinkObj) => {
  if (isPicTitleOrDescValueObjArray(editStatus.status)) {
    editStatus.status[newStatus.index]!.value = newStatus.link;
  }
};

// 修改options编辑状态对象中的isUse属性
export const changeOptionsObjIsUseValue = (editStatus: HasIsUseOptionsProps, newValue: boolean) => {
  editStatus.isUse = newValue;
};

// 切换配置对象中编辑状态配置对象的isShow属性
export const changeEditStatusIsShowValue = (typeStatus: NoteTypeStatus) => {
  typeStatus.title.isShow = !typeStatus.title.isShow;
  typeStatus.desc.isShow = !typeStatus.desc.isShow;
  typeStatus.position.isShow = !typeStatus.position.isShow;
  typeStatus.titleSize.isShow = !typeStatus.titleSize.isShow;
  typeStatus.descSize.isShow = !typeStatus.descSize.isShow;
  typeStatus.titleWeight.isShow = !typeStatus.titleWeight.isShow;
  typeStatus.descWeight.isShow = !typeStatus.descWeight.isShow;
  typeStatus.titleItalic.isShow = !typeStatus.titleItalic.isShow;
  typeStatus.descItalic.isShow = !typeStatus.descItalic.isShow;
  typeStatus.titleColor.isShow = !typeStatus.titleColor.isShow;
  typeStatus.descColor.isShow = !typeStatus.descColor.isShow;
};
