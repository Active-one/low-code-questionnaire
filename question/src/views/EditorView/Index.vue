<template>
  <div class="editor-view-container">
    <div class="header">
      <Header :is-editor="true" />
    </div>

    <!-- 主要内容区域 -->
    <div class="main-container p20 flex">
      <!-- 左侧组件选择 -->
      <LeftSide />
      <!-- 右侧属性编辑 -->
      <RightSide />
    </div>
    <div>
      <!-- 中间组件显示区域 -->
      <Center />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Common/Header.vue';
import LeftSide from './components/LeftSide/Index.vue';
import Center from './components/Center.vue';
import RightSide from './components/RightSide.vue';
import { computed, onMounted, provide } from 'vue';
import { getPicLink, updateStatus } from '@/utils/provide';
import type { PicLinkObj, Status } from '@/types';
import { useEditorStore } from '@/stores/useEditor.js';
import { useRoute } from 'vue-router';

const editorStore = useEditorStore();
const route = useRoute();
const surveyId = computed(() => Number(route.params.id));

onMounted(() => {
  // 回显要编辑的问卷数据到仓库
  if (surveyId.value) {
    editorStore.restoreSurveyDataToStore(surveyId.value);
  }
});

// 为后代组件提供修改状态数据的方法
provide(
  'updateStatus',
  (
    configKey: string,
    newValue: string | number | boolean | object,
    status: Status = editorStore.currentCom!,
  ) => updateStatus(configKey, newValue, status),
);
// 得到上传的图片信息后，手动调用updateStatus，去修改仓库中的数据
provide('getPicLink', (picInfo: PicLinkObj) => getPicLink(picInfo, editorStore.currentCom!));
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: var(--white);
  position: fixed;
  top: 0;
  z-index: 100;
}
.main-container {
  position: fixed;
  left: 0;
  top: 50px;
  background-image: url('@/assets/images/editor_background.png');
  width: calc(100vw - 40px);
  height: calc(100vh - 50px - 40px);
}
</style>
