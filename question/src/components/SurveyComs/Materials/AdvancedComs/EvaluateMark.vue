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

    <!-- 评分组件 -->
    <div class="options">
      <el-rate
        v-model="rateValue"
        allow-half
        :texts="statusInfo.options"
        :show-text="statusInfo.isUse ? true : false"
        @click.stop
        @change="(value: number) => emits('get-answer', value)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import type { OptionsHasIsUseStatus } from '@/types';
import {
  getArrCurrentStatus,
  getArrStatus,
  getIsUse,
  getStringArrStatusByCurrentStatus,
  getStringTextStatus,
} from '@/utils';
import { valueEquals } from 'element-plus';
import { computed, ref } from 'vue';

const props = defineProps<{
  serialNum: number;
  status: OptionsHasIsUseStatus;
}>();
const emits = defineEmits(['get-answer']);

// 评分值
const rateValue = ref();

// 整理对应属性
const statusInfo = computed(() => ({
  title: getStringTextStatus(props.status.title),
  desc: getStringTextStatus(props.status.desc),
  options: getArrStatus(props.status.options!),
  isUse: getIsUse(props.status.options!),
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
