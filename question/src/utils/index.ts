// 提供工具方法
import { componentMap } from '@/configs/componentMap';
import {
  ageStatus,
  careerStatus,
  educationStatus,
  genderStatus,
} from '@/configs/defaultStatus/IninStatus';
import type {
  BaseStatus,
  ComponentMapType,
  ComsKey,
  HasIsUseOptionsProps,
  OptionsProps,
  OptionsStatus,
  Status,
  StatusKeys,
  StringTextProps,
  SurveyComName,
  TextTypeStatus,
} from '@/types';
import {
  canGeneratePDFComNameArr,
  isPicTitleOrDescValueObjArray,
  isStringArray,
  isValueObjArray,
  surveyNameArr,
} from '@/types';

// 得到status值为字符串字面量类型的status
export const getStringTextStatus = (status: StringTextProps) => {
  if (status && typeof status.status === 'string') {
    return status.status;
  }
};

// 得到status值为字符串数组类型的status
export const getArrStatus = (status: OptionsProps) => {
  if (status && isStringArray(status.status)) {
    return status.status;
  }
};

// 得到status值为PicTitleOrDescValueObj数组类型的status
export const getAPicTitleOrDescValueObjStatus = (status: OptionsProps) => {
  if (status && isPicTitleOrDescValueObjArray(status.status)) {
    return status.status;
  }
};

// 得到status值为ValueObj数组类型的status
export const getValueObjStatus = (status: OptionsProps) => {
  if (status && isValueObjArray(status.status)) {
    return status.status;
  }
};

// 得到status值为三种数组类型的当前属性值
export const getArrCurrentStatus = (status: OptionsProps) => {
  if (status) {
    return status.currentStatus;
  }
};

// 根据currentStatus从数组中得到status值为字符串类型数组的当前属性值
export const getStringArrStatusByCurrentStatus = (status: OptionsProps) => {
  if (status && isStringArray(status.status)) {
    return status.status[status.currentStatus];
  }
};

// 根据currentStatus从数组中得到status值为ValueObj类型数组的当前属性值
export const getValueObjArrStatusByCurrentStatus = (status: OptionsProps) => {
  if (status && isValueObjArray(status.status)) {
    return status.status[status.currentStatus];
  }
};

// 根据currentStatus从数组中得到status值为icTitleOrDescValueObj类型数组的当前属性值
export const getPicTitleOrDescValueObjArrStatusByCurrentStatus = (status: OptionsProps) => {
  if (status && isPicTitleOrDescValueObjArray(status.status)) {
    return status.status[status.currentStatus];
  }
};

// 得到status值为三种数组类型，其isUse属性
export const getIsUse = (status: HasIsUseOptionsProps) => {
  if (status) {
    return status.isUse;
  }
};

// 判断状态对象的status是否包含options
export const isOptionsStatus = (status: BaseStatus): status is OptionsStatus => {
  return 'options' in status;
};

// 在组件添加之前更新默认状态对象
export const updateDefaultStatusBeforeAdd = (defaultStatus: Status, comName: ComsKey) => {
  switch (comName) {
    case 'personal-info-name': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '您的名字是？';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-id': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的身份证号';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-birth': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请选择您的出生日期';
      break;
    }
    case 'personal-info-gender': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请选择您的性别';
      if (isOptionsStatus(defaultStatus.status as BaseStatus)) {
        defaultStatus.status.options!.status = genderStatus();
      }
      break;
    }
    case 'personal-info-age': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请选择您的年龄';
      if (isOptionsStatus(defaultStatus.status as BaseStatus))
        defaultStatus.status.options!.status = ageStatus();
      break;
    }
    case 'personal-info-education': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请选择您到目前为止最高的学历';
      if (isOptionsStatus(defaultStatus.status as BaseStatus)) {
        defaultStatus.status.options!.status = educationStatus();
      }
      break;
    }
    case 'personal-info-collage': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的大学';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-major': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的专业';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-industry': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的行业';
      break;
    }
    case 'personal-info-career': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请选择您的职业';
      if (isOptionsStatus(defaultStatus.status as BaseStatus)) {
        defaultStatus.status.options!.status = careerStatus();
      }
      break;
    }
    case 'personal-info-company': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的公司';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-position': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的职位';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-tel': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的手机号';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-wechat': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的微信号';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-qq': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的QQ号';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-email': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的邮箱';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
    case 'personal-info-address': {
      defaultStatus.name = comName;
      defaultStatus.status.title.status = '请填写您的地址';
      (defaultStatus.status as TextTypeStatus).textType!.isShow = false;
      break;
    }
  }
};

// 判断传递的组件名称是否为题目组件
export const isSurveyComName = (comName: ComsKey): comName is SurveyComName => {
  return surveyNameArr.includes(comName);
};

// 判断传递的组件名称是否可导出PDF
export const comNameIsCanGeneratePDF = (comName: ComsKey) => {
  return canGeneratePDFComNameArr.includes(comName);
};

// 格式化事件
export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? (date.getMonth() + 1).toString().padStart(2, '0')
      : date.getMonth() + 1;
  const day = date.getDate() < 10 ? date.getDate().toString().padStart(2, '0') : date.getDate();
  const hour = date.getHours() < 10 ? date.getHours().toString().padStart(2, '0') : date.getHours();
  const minute =
    date.getMinutes() < 10 ? date.getMinutes().toString().padStart(2, '0') : date.getMinutes();
  const second =
    date.getSeconds() < 10 ? date.getSeconds().toString().padStart(2, '0') : date.getSeconds();

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};

// 根据组件名称还原组件
export const restoreComType = (coms: Status[]) => {
  // 还原业务组件
  for (const com of coms) {
    com.type = (componentMap as ComponentMapType)[com.name];

    // 还原编辑组件
    for (const key in com.status) {
      const editStatus = com.status[key as StatusKeys];
      editStatus.editCom = (componentMap as ComponentMapType)[editStatus.name];
    }
  }
};
