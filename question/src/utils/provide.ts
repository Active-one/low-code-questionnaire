import { useMaterialStore } from '@/stores/useMaterial';
import { ElMessage } from 'element-plus';
import { isPicLinkObj, isPicTitleOrDescValueObj, isValueObj, isValueObjArray } from '@/types';
import type {
  HasIsUseOptionsProps,
  MaterialStoreType,
  NoteTypeStatus,
  OptionsProps,
  PicLinkObj,
  Status,
  StringTextProps,
  ValueObjStatus,
} from '@/types';
import { changeEditStatusIsShowValue } from '@/stores/actions';

// 获取图片链接
export const getPicLink = (picInfo: PicLinkObj, status: Status) => {
  updateStatus('options', picInfo, status);
};
// 修改状态数据
export const updateStatus = (
  configKey: string,
  newValue: string | number | boolean | object,
  status: Status,
) => {
  const materialStore = useMaterialStore() as MaterialStoreType;

  // @ts-ignore
  const editStatus = status.status[configKey];

  switch (configKey) {
    case 'title':
    case 'desc':
    case 'titleColor':
    case 'descColor': {
      if (typeof newValue !== 'string') {
        console.error('值应为字符类型');
      } else {
        // 触发action，更新仓库中的数据
        materialStore.setStringStatus(editStatus as StringTextProps, newValue);
      }
      break;
    }
    case 'options': {
      // 判断是要删除option操作
      if (typeof newValue === 'number') {
        const res = materialStore.delOption(editStatus as OptionsProps, newValue);
        if (res) {
          ElMessage.success('删除成功');
        } else {
          ElMessage.error('至少保留两个选项');
        }
      }
      // 判断是要添加值为字符串的option
      else if (typeof newValue === 'string') {
        materialStore.AddOption(editStatus as OptionsProps, newValue);
      }
      // 修改isUse属性
      else if (typeof newValue === 'boolean') {
        materialStore.changeOptionsObjIsUseValue(editStatus as HasIsUseOptionsProps, newValue);
      }
      // 参数为对象
      else if (typeof newValue === 'object') {
        if (newValue && editStatus) {
          // 判断要添加值为icTitleOrDescValueObj的option
          if (isPicTitleOrDescValueObj(newValue)) {
            materialStore.AddOption(editStatus as OptionsProps, newValue);
          }
          // 判断是否为设置图片value
          else if (isPicLinkObj(newValue)) {
            materialStore.setPicOptionByIndex(editStatus as OptionsProps, newValue);
          }
          // 判断是否为修改日期类型
          else if (isValueObj(newValue) && isValueObjArray((editStatus as OptionsProps).status)) {
            const index = (editStatus.status as Array<ValueObjStatus>).findIndex(
              (obj: ValueObjStatus) =>
                obj.value === newValue.value && obj.status === newValue.status,
            );
            materialStore.setCurrentStatus(editStatus as OptionsProps, index);
          }
        }
      }
      break;
    }
    case 'position':
    case 'titleSize':
    case 'descSize':
    case 'titleWeight':
    case 'descWeight':
    case 'titleItalic':
    case 'descItalic':
    case 'textType': {
      if (typeof newValue !== 'number') {
        console.error('值应为数值类型');
      } else {
        materialStore.setCurrentStatus(editStatus as OptionsProps, newValue);
      }
      break;
    }
    case 'noteType': {
      if (typeof newValue !== 'number') {
        console.error('值应为数值类型');
        return;
      }
      changeEditStatusIsShowValue(status.status as NoteTypeStatus);
      materialStore.setCurrentStatus(editStatus, newValue);
      break;
    }
  }
};
