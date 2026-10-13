// 文本输入组件的状态对象
import { markRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Status } from '@/types';
import TextNote from '@/components/SurveyComs/Materials/NoteComs/TextNote.vue';
import TitleEditor from '@/components/SurveyComs/EditItems/TitleEditor.vue';
import DescEditor from '@/components/SurveyComs/EditItems/DescEditor.vue';
import SizeEditor from '@/components/SurveyComs/EditItems/SizeEditor.vue';
import WeightEditor from '@/components/SurveyComs/EditItems/WeightEditor.vue';
import ItalicEditor from '@/components/SurveyComs/EditItems/ItalicEditor.vue';
import ColorEditor from '@/components/SurveyComs/EditItems/ColorEditor.vue';
import PositionEditor from '@/components/SurveyComs/EditItems/PositionEditor.vue';
import NoteTypeEditor from '@/components/SurveyComs/EditItems/NoteTypeEditor.vue';

// 导出一个函数，通过调用函数得到状态对象。直接返回对象可能会导致多个组件共用一个状态对象
export default function (): Status {
  return {
    type: markRaw(TextNote),
    name: 'text-note',
    id: uuidv4(),
    status: {
      noteType: {
        id: uuidv4(),
        status: ['标题', '段落'],
        currentStatus: 1,
        isShow: true,
        name: 'note-type-editor',
        editCom: markRaw(NoteTypeEditor),
      },
      title: {
        id: uuidv4(),
        status: '默认标题内容',
        isShow: false,
        name: 'title-editor',
        editCom: markRaw(TitleEditor),
      },
      desc: {
        id: uuidv4(),
        status: '默认描述内容',
        isShow: true,
        name: 'desc-editor',
        editCom: markRaw(DescEditor),
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
        status: ['26', '22', '22'],
        currentStatus: 0,
        isShow: false,
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
        isShow: false,
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
        isShow: false,
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
        isShow: false,
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
