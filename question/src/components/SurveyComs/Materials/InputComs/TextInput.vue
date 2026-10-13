<template>
  <div class="multi-select-container" :class="{ 'text-center': statusInfo.position }">
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

    <div>
      <el-input
        placeholder="请输入"
        :type="statusInfo.textType ? 'textarea' : ''"
        :rows="statusInfo.textType ? 5 : 0"
        @click.stop
        v-model="inputValue"
        @change="(value: string) => emits('get-answer', value)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import type { TextTypeStatus } from '@/types';
import {
  getArrCurrentStatus,
  getStringArrStatusByCurrentStatus,
  getStringTextStatus,
} from '@/utils';
import { computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const props = defineProps<{
  serialNum: number;
  status: TextTypeStatus;
}>();
const emits = defineEmits(['get-answer']);

// 输入的值
const inputValue = ref('');

onBeforeRouteLeave(() => {
  // 跳转路由之前将输入框的值清空，因为很多预设组件用的是同一个文本输入组件，不清空会导致不同组件输入的值共用
  inputValue.value = '';
});

// 整理对应属性
const statusInfo = computed(() => ({
  textType: getArrCurrentStatus(props.status.textType!),
  title: getStringTextStatus(props.status.title),
  desc: getStringTextStatus(props.status.desc),
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
