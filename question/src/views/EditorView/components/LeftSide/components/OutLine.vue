<template>
  <div class="outline-container">
    <div class="title-list" v-if="editorStore.surveyComNum">
      <draggable v-model="editorStore.coms" item-key="index" @start="dragstart">
        <template #item="{ element, index }">
          <div
            class="title-item p10 mb-10"
            :class="{ active: editorStore.currentSelectComIndex === index }"
            v-if="isSurveyComName(element.name)"
            @click="selectComName(index)"
          >
            <p class="title m0">{{ materialNo[index] }}. {{ element.status.title.status }}</p>
          </div>
        </template>
      </draggable>
    </div>
    <div class="tip flex justify-content-center align-items-center" v-else>请添加题目</div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/useEditor';
import { isSurveyComName } from '@/utils';
import { useMaterialNo } from '@/utils/hooks';
import { computed } from 'vue';
import draggable from 'vuedraggable';
import emitter from '@/utils/eventBus';

const editorStore = useEditorStore();
// 得到序号列表
const materialNo = computed(() => useMaterialNo(editorStore.coms));

// 拖拽开始
const dragstart = () => {
  // 拖拽时，取消编辑状态
  editorStore.setCurrentSelectComIndex(-1);
};
// 点击对应题目标题
const selectComName = (index: number) => {
  // 选中/取消选中对应的题目组件
  editorStore.setCurrentSelectComIndex(editorStore.currentSelectComIndex === index ? -1 : index);
  if (editorStore.currentSelectComIndex !== -1) {
    // 使画布滚动到对应的题目位置
    emitter.emit('scrollToCenter', index);
  }
};
</script>

<style scoped lang="scss">
.outline-container {
  height: 100%;
  .title-list {
    .title-item {
      color: var(--font-color-light);
      cursor: pointer;
      transition: 0.4s;
      &.active {
        transform: scale(1.04);
        background-color: var(--border-color);
        border-radius: var(--border-radius-lg);
      }
      .title {
        font-size: var(--font-size-base);
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .tip {
    height: 100%;
  }
}
</style>
