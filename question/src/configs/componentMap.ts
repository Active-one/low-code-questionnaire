import SingleSelect from '@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue';
import MultiSelect from '@/components/SurveyComs/Materials/SelectComs/MultiSelect.vue';
import OptionsSelect from '@/components/SurveyComs/Materials/SelectComs/OptionsSelect.vue';
import SinglePicSelect from '@/components/SurveyComs/Materials/SelectComs/SinglePicSelect.vue';
import MultiPicSelect from '@/components/SurveyComs/Materials/SelectComs/MultiPicSelect.vue';
import TextInput from '@/components/SurveyComs/Materials/InputComs/TextInput.vue';
import EvaluateMark from '@/components/SurveyComs/Materials/AdvancedComs/EvaluateMark.vue';
import DateTime from '@/components/SurveyComs/Materials/AdvancedComs/DateTime.vue';
import AuxiliaryTextEditor from '@/components/SurveyComs/EditItems/AuxiliaryTextEditor.vue';
import ColorEditor from '@/components/SurveyComs/EditItems/ColorEditor.vue';
import DateTypeEditor from '@/components/SurveyComs/EditItems/DateTypeEditor.vue';
import DescEditor from '@/components/SurveyComs/EditItems/DescEditor.vue';
import ItalicEditor from '@/components/SurveyComs/EditItems/ItalicEditor.vue';
import NoteTypeEditor from '@/components/SurveyComs/EditItems/NoteTypeEditor.vue';
import OptionsEditor from '@/components/SurveyComs/EditItems/OptionsEditor.vue';
import PicOptionsEditor from '@/components/SurveyComs/EditItems/PicOptionsEditor.vue';
import PositionEditor from '@/components/SurveyComs/EditItems/PositionEditor.vue';
import SizeEditor from '@/components/SurveyComs/EditItems/SizeEditor.vue';
import TextTypeEditor from '@/components/SurveyComs/EditItems/TextTypeEditor.vue';
import TitleEditor from '@/components/SurveyComs/EditItems/TitleEditor.vue';
import WeightEditor from '@/components/SurveyComs/EditItems/WeightEditor.vue';
import type { ComponentMapType } from '@/types';
import TextNote from '@/components/SurveyComs/Materials/NoteComs/TextNote.vue';
import { markRaw } from 'vue';

// 组件名称与具体组件之间的映射
export const componentMap: ComponentMapType = {
  // 业务组件
  'single-select': markRaw(SingleSelect),
  'multi-select': markRaw(MultiSelect),
  'options-select': markRaw(OptionsSelect),
  'single-pic-select': markRaw(SinglePicSelect),
  'multi-pic-select': markRaw(MultiPicSelect),
  'text-input': markRaw(TextInput),
  'text-note': markRaw(TextNote),
  'evaluate-mark': markRaw(EvaluateMark),
  'date-time': markRaw(DateTime),
  'personal-info-name': markRaw(TextInput),
  'personal-info-id': markRaw(TextInput),
  'personal-info-birth': markRaw(DateTime),
  'personal-info-gender': markRaw(SingleSelect),
  'personal-info-age': markRaw(SingleSelect),
  'personal-info-education': markRaw(SingleSelect),
  'personal-info-collage': markRaw(TextInput),
  'personal-info-major': markRaw(TextInput),
  'personal-info-industry': markRaw(TextInput),
  'personal-info-career': markRaw(SingleSelect),
  'personal-info-company': markRaw(TextInput),
  'personal-info-position': markRaw(TextInput),
  'personal-info-tel': markRaw(TextInput),
  'personal-info-wechat': markRaw(TextInput),
  'personal-info-qq': markRaw(TextInput),
  'personal-info-email': markRaw(TextInput),
  'personal-info-address': markRaw(TextInput),
  // 编辑组件
  'auxiliary-text-editor': markRaw(AuxiliaryTextEditor),
  'color-editor': markRaw(ColorEditor),
  'date-type-editor': markRaw(DateTypeEditor),
  'desc-editor': markRaw(DescEditor),
  'italic-editor': markRaw(ItalicEditor),
  'note-type-editor': markRaw(NoteTypeEditor),
  'options-editor': markRaw(OptionsEditor),
  'pic-options-editor': markRaw(PicOptionsEditor),
  'position-editor': markRaw(PositionEditor),
  'size-editor': markRaw(SizeEditor),
  'text-type-editor': markRaw(TextTypeEditor),
  'title-editor': markRaw(TitleEditor),
  'weight-editor': markRaw(WeightEditor),
};
