<template>
  <div class="evaluate-mark-container" :class="{ 'text-center': statusInfo.position }">
    <MaterialsHeader
      :serialNum="serialNum"
      :title="statusInfo.title"
      :desc="statusInfo.desc"
      :titleSize="statusInfo.titleSize"
      :descSize="statusInfo.descSize"
      :titleWeight="statusInfo.titleWeight"
      :descWeight="statusInfo.descWeight"
      :titleItalic="statusInfo.titleItalic"
      :descItalic="statusInfo.descItalic"
      :titleColor="statusInfo.titleColor"
      :descColor="statusInfo.descColor"
    />

    <!-- 日期组件 -->
    <el-date-picker
      :type="statusInfo.options?.value"
      placeholder="请选择日期"
      v-model="dateValue"
      @change="(value: string) => emits('get-answer', value)"
    />
  </div>
</template>

<script lang="ts" setup>
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import type { OptionsStatus } from '@/types';
import {
  getArrCurrentStatus,
  getStringArrStatusByCurrentStatus,
  getStringTextStatus,
  getValueObjArrStatusByCurrentStatus,
} from '@/utils';
import { computed, ref } from 'vue';

const props = defineProps<{
  serialNum: number;
  status: OptionsStatus;
}>();
const emits = defineEmits(['get-answer']);

const dateValue = ref(''); // 选定的日期

// 整理对应属性
const statusInfo = computed(() => ({
  title: getStringTextStatus(props.status.title),
  desc: getStringTextStatus(props.status.desc),
  options: getValueObjArrStatusByCurrentStatus(props.status.options!),
  position: getArrCurrentStatus(props.status.position),
  titleSize: getStringArrStatusByCurrentStatus(props.status.titleSize),
  descSize: getStringArrStatusByCurrentStatus(props.status.descSize),
  titleWeight: getArrCurrentStatus(props.status.titleWeight),
  descWeight: getArrCurrentStatus(props.status.descWeight),
  titleItalic: getArrCurrentStatus(props.status.titleItalic),
  descItalic: getArrCurrentStatus(props.status.descItalic),
  titleColor: getStringTextStatus(props.status.titleColor),
  descColor: getStringTextStatus(props.status.descColor),
}));
</script>
