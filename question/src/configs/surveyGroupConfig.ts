import type { SurveyComListType } from '@/types';
import {
  ChatLineSquare,
  CircleCheck,
  EditPen,
  Files,
  Message,
  User,
} from '@element-plus/icons-vue';

// 题型列表的配置
export const surveyComList: SurveyComListType = [
  {
    title: '选择',
    icon: CircleCheck,
    comList: [
      {
        comName: '单选', // 题型名称
        materialName: 'single-select', // 组件名称
      },
      {
        comName: '多选',
        materialName: 'multi-select',
      },
      {
        comName: '下拉',
        materialName: 'options-select',
      },
      {
        comName: '图片单选',
        materialName: 'single-pic-select',
      },
      {
        comName: '图片多选',
        materialName: 'multi-pic-select',
      },
    ],
  },
  {
    title: '文本输入',
    icon: EditPen,
    comList: [
      {
        comName: '文本输入',
        materialName: 'text-input',
      },
    ],
  },
  {
    title: '高级题型',
    icon: Files,
    comList: [
      {
        comName: '评价/打分',
        materialName: 'evaluate-mark',
      },
      {
        comName: '日期/时间',
        materialName: 'date-time',
      },
    ],
  },
  {
    title: '备注说明',
    icon: ChatLineSquare,
    comList: [
      {
        comName: '备注说明',
        materialName: 'text-note',
      },
    ],
  },
  {
    title: '个人信息',
    icon: User,
    comList: [
      {
        comName: '姓名',
        materialName: 'personal-info-name',
      },
      {
        comName: '身份证',
        materialName: 'personal-info-id',
      },
      {
        comName: '出生日期',
        materialName: 'personal-info-birth',
      },
      {
        comName: '性别',
        materialName: 'personal-info-gender',
      },
      {
        comName: '年龄',
        materialName: 'personal-info-age',
      },
      {
        comName: '学历',
        materialName: 'personal-info-education',
      },
      {
        comName: '大学',
        materialName: 'personal-info-collage',
      },
      {
        comName: '专业',
        materialName: 'personal-info-major',
      },
      {
        comName: '行业',
        materialName: 'personal-info-industry',
      },
      {
        comName: '职业',
        materialName: 'personal-info-career',
      },
      {
        comName: '公司',
        materialName: 'personal-info-company',
      },
      {
        comName: '职位',
        materialName: 'personal-info-position',
      },
    ],
  },
  {
    title: '个人信息',
    icon: Message,
    comList: [
      {
        comName: '手机',
        materialName: 'personal-info-tel',
      },
      {
        comName: '微信号',
        materialName: 'personal-info-wechat',
      },
      {
        comName: 'QQ号',
        materialName: 'personal-info-qq',
      },
      {
        comName: '邮箱',
        materialName: 'personal-info-email',
      },
      {
        comName: '地址',
        materialName: 'personal-info-address',
      },
    ],
  },
];
