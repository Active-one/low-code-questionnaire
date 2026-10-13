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

    <!-- 多选框框组 -->
    <div class="options">
      <el-checkbox-group
        v-model="selectValue"
        @click.stop
        @change="(selectValue: string[]) => emits('get-answer', selectValue.join(','))"
      >
        <el-checkbox v-for="(item, i) in status.options!.status" :key="i" :value="item">
          {{ item }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import type { OptionsStatus } from '@/types';
import {
  getArrStatus,
  getArrCurrentStatus,
  getStringArrStatusByCurrentStatus,
  getStringTextStatus,
} from '@/utils';
import { computed, ref } from 'vue';

const props = defineProps<{
  serialNum: number;
  status: OptionsStatus;
}>();
const emits = defineEmits(['get-answer']);

// 选择的值数组
const selectValue = ref([]);

// 整理对应属性
const statusInfo = computed(() => ({
  title: getStringTextStatus(props.status.title),
  desc: getStringTextStatus(props.status.desc),
  options: getArrStatus(props.status.options!),
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
