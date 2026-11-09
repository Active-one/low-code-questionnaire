<template>
  <div class="multi-pic-select-container" :class="{ 'text-center': statusInfo.position }">
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

    <div class="flex wrap">
      <el-checkbox-group
        class="flex wrap"
        v-model="selectValue"
        @click.stop
        @change="(selectValue: string[]) => emits('get-answer', selectValue.join(','))"
      >
        <el-checkbox
          class="radio-item flex mb-15"
          v-for="(item, index) in statusInfo.options"
          :key="index"
          :value="item.picTitle"
        >
          <PicUploadItem
            class="mb-10"
            v-bind="{ ...item }"
            :index
            @selectCurrentCom="selectCurrentCom"
          />
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PicUploadItem from '../../Common/PicUploadItem.vue';
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import type { OptionsStatus, SelectCurrentComType } from '@/types';
import {
  getArrCurrentStatus,
  getStringArrStatusByCurrentStatus,
  getStringTextStatus,
  getAPicTitleOrDescValueObjStatus,
} from '@/utils';
import { computed, inject, ref } from 'vue';

const props = defineProps<{
  serialNum: number;
  status: OptionsStatus;
  comIndex: number; // 该组件在仓库的coms中的索引
}>();
const emits = defineEmits(['get-answer']);

// 选择的值
const selectValue = ref([]);

// 整理对应属性
const statusInfo = computed(() => ({
  title: getStringTextStatus(props.status.title),
  desc: getStringTextStatus(props.status.desc),
  options: getAPicTitleOrDescValueObjStatus(props.status.options!),
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

const selectComByIndex = inject<SelectCurrentComType>('selectComByIndex');

// 给子类的用于选中当前题目为编辑状态的自定义事件处理器
const selectCurrentCom = () => {
  if (selectComByIndex) {
    selectComByIndex(props.comIndex);
  }
};
</script>

<style scoped lang="scss">
.radio-item {
  flex-direction: column-reverse;
  height: auto;
}
</style>
