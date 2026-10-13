<template>
  <div class="right-side-container border-box b1">
    <div v-if="editorStore.currentCom">
      <EditPanel :status="editorStore.currentCom" />
    </div>
    <div class="tip flex justify-content-center align-items-center" v-else>点击题型进行编辑</div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/useEditor';
import EditPanel from '@/components/SurveyComs/EditItems/EditPanel.vue';

const editorStore = useEditorStore();
</script>

<style scoped lang="scss">
.right-side-container {
  position: fixed;
  right: 20px;
  top: 70px;
  width: 320px;
  height: calc(100vh - 50px - 40px);
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  overflow-y: auto;

  .tip {
    height: 100%;
  }
}
</style>
