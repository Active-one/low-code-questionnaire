import type { defaultStatusMapType } from '@/types';
import singleSelectDefaultStautsFn from './SingleSelect';
import multiSelectDefaultStatusFn from './MultiSelect';
import optionsSelectDefaultStatusFn from './OptionsSelect';
import singlePicSelectDefaultStatusFn from './SinglePicSelect';
import multiPicSelectDefaultStatusFn from './MultiPicSelect';
import textInputDefaultStatusFn from './TextInput';
import EvaluateMarkDefaultStatusFn from './EvaluateMark';
import DateTimeDefaultStatusFn from './DateTime';
import TextNoteDefaultStatusFn from './TextNote';

// 默认状态映射对象
export const defaultStatusMap: defaultStatusMapType = {
  'single-select': singleSelectDefaultStautsFn,
  'multi-select': multiSelectDefaultStatusFn,
  'options-select': optionsSelectDefaultStatusFn,
  'single-pic-select': singlePicSelectDefaultStatusFn,
  'multi-pic-select': multiPicSelectDefaultStatusFn,
  'text-input': textInputDefaultStatusFn,
  'evaluate-mark': EvaluateMarkDefaultStatusFn,
  'date-time': DateTimeDefaultStatusFn,
  'text-note': TextNoteDefaultStatusFn,
  // 预设组件：个人信息
  'personal-info-name': textInputDefaultStatusFn,
  'personal-info-id': textInputDefaultStatusFn,
  'personal-info-birth': DateTimeDefaultStatusFn,
  'personal-info-gender': singleSelectDefaultStautsFn,
  'personal-info-age': singleSelectDefaultStautsFn,
  'personal-info-education': singleSelectDefaultStautsFn,
  'personal-info-collage': textInputDefaultStatusFn,
  'personal-info-major': textInputDefaultStatusFn,
  'personal-info-industry': textInputDefaultStatusFn,
  'personal-info-career': singleSelectDefaultStautsFn,
  'personal-info-company': textInputDefaultStatusFn,
  'personal-info-position': textInputDefaultStatusFn,
  // 预设组件：联系方式
  'personal-info-tel': textInputDefaultStatusFn,
  'personal-info-wechat': textInputDefaultStatusFn,
  'personal-info-qq': textInputDefaultStatusFn,
  'personal-info-email': textInputDefaultStatusFn,
  'personal-info-address': textInputDefaultStatusFn,
};
