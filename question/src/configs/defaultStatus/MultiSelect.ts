// 多选题组件的状态对象
import { markRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from '@/components/SurveyComs/Materials/SelectComs/MultiSelect.vue';
import TitleEditor from '@/components/SurveyComs/EditItems/TitleEditor.vue';
import DescEditor from '@/components/SurveyComs/EditItems/DescEditor.vue';
import OptionsEditor from '@/components/SurveyComs/EditItems/OptionsEditor.vue';
import SizeEditor from '@/components/SurveyComs/EditItems/SizeEditor.vue';
import WeightEditor from '@/components/SurveyComs/EditItems/WeightEditor.vue';
import ItalicEditor from '@/components/SurveyComs/EditItems/ItalicEditor.vue';
import ColorEditor from '@/components/SurveyComs/EditItems/ColorEditor.vue';
import PositionEditor from '@/components/SurveyComs/EditItems/PositionEditor.vue';
import type { Status } from '@/types';

// 导出一个函数，通过调用函数得到状态对象。直接返回对象可能会导致多个组件共用一个状态对象
export default function (): Status {
  return {
    type: markRaw(MultiSelect),
    name: 'multi-select',
    id: uuidv4(),
    status: {
      title: {
        id: uuidv4(),
        status: '多选题默认标题',
        isShow: true,
        name: 'title-editor',
        editCom: markRaw(TitleEditor),
      },
      desc: {
        id: uuidv4(),
        status: '多选题默认描述',
        isShow: true,
        name: 'desc-editor',
        editCom: markRaw(DescEditor),
      },
      options: {
        id: uuidv4(),
        status: ['默认多选题选项1', '默认多选题选项2'],
        currentStatus: 0,
        isShow: true,
        name: 'options-editor',
        editCom: markRaw(OptionsEditor),
      },
      position: {
        id: uuidv4(),
        status: ['左对齐', '居中对齐'],
        currentStatus: 0,
        isShow: true,
        name: 'position-editor',
        editCom: markRaw(PositionEditor),
      },
      titleSize: {
        id: uuidv4(),
        status: ['22', '20', '18'],
        currentStatus: 0,
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      descSize: {
        id: uuidv4(),
        status: ['16', '14', '12'],
        currentStatus: 0,
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      titleWeight: {
        id: uuidv4(),
        status: ['加粗', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      descWeight: {
        id: uuidv4(),
        status: ['加粗', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      titleItalic: {
        id: uuidv4(),
        status: ['倾斜', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      descItalic: {
        id: uuidv4(),
        status: ['倾斜', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      titleColor: {
        id: uuidv4(),
        status: '#000',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
      descColor: {
        id: uuidv4(),
        status: '#909399',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
    },
  };
}
