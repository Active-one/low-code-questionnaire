<template>
  <div class="survey-com-group-container mc">
    <div class="title mb-15">
      <el-icon><component :is="icon" /></el-icon>
      <span class="ml-5">{{ title }}</span>
    </div>
    <!-- 组件列表 -->
    <div class="com-list flex wrap space-between mb-20">
      <SurveyComItem v-for="(item, index) in comList" :key="index" v-bind="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComsKey, VueComType } from '@/types';
import SurveyComItem from './SurveyComItem.vue';

defineProps<{
  title: string;
  icon: VueComType;
  comList: {
    comName: string;
    materialName: ComsKey;
  }[];
}>();
</script>

<style scoped lang="scss">
.survey-com-group-container {
  width: 93%;
  &:last-child {
    .com-list {
      margin-bottom: 0;
    }
  }
}
.title {
  span {
    font-size: var(--font-size-base);
    vertical-align: 3px;
  }
}
</style>
