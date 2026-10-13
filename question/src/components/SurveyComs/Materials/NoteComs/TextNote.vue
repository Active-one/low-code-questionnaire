<template>
  <div class="multi-select-container" :class="{ 'text-center': statusInfo.position }">
    <h2
      class="title"
      :class="{ 'font-italic': !statusInfo.titleItalic }"
      :style="{
        fontSize: `${statusInfo.titleSize}px`,
        color: statusInfo.titleColor,
        fontWeight: statusInfo.titleWeight ? 100 : 700,
      }"
      v-if="statusInfo.noteType === 0"
    >
      {{ statusInfo.title }}
    </h2>
    <p
      class="desc"
      :class="{ 'font-bold': !statusInfo.descWeight, 'font-italic': !statusInfo.descItalic }"
      :style="{ fontSize: `${statusInfo.descSize}px`, color: statusInfo.descColor }"
      v-else
    >
      {{ statusInfo.desc }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { NoteTypeStatus } from '@/types';
import {
  getArrCurrentStatus,
  getStringArrStatusByCurrentStatus,
  getStringTextStatus,
} from '@/utils';
import { computed } from 'vue';

const props = defineProps<{
  status: NoteTypeStatus;
}>();

// 整理对应属性
const statusInfo = computed(() => ({
  noteType: getArrCurrentStatus(props.status.noteType!),
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

<style scoped lang="scss">
.title {
  font-size: 20px;
  padding: 10px 0;
}
.desc {
  font-size: var(--font-size-base);
  color: var(--font-color-lighter);
}
</style>
