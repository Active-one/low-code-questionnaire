<template>
  <div
    class="survey-com-item-container flex justify-content-center align-items-center mb-10"
    @click="addSurveyCom"
  >
    <span>{{ comName }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import { updateDefaultStatusBeforeAdd } from '@/utils';
import type { ComsKey } from '@/types';
import { useEditorStore } from '@/stores/useEditor';
import emitter from '@/utils/eventBus';

const props = defineProps<{
  comName: string;
  materialName: ComsKey;
}>();

const editorStore = useEditorStore();

const addSurveyCom = () => {
  // 要添加的组件的name
  const newMaterialName = props.materialName;

  // 根据组件nane得到默认的组件状态对象
  const newMaterialStatus = defaultStatusMap[newMaterialName]();
  // 初始化预设组件的状态对象
  updateDefaultStatusBeforeAdd(newMaterialStatus, newMaterialName);
  // 添加到仓库中
  editorStore.addCom(newMaterialStatus);
  // 添加完组件后，自动滚动到底部
  emitter.emit('scrollToBottom');
};
</script>

<style scoped lang="scss">
.survey-com-item-container {
  width: 65px;
  height: 30px;
  background-color: var(--background-color);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  user-select: none;
  padding: 0 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--font-color-lightest);
  }
}
</style>
