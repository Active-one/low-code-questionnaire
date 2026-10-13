<template>
  <div class="center-container p20 b1" ref="centerContainerRef">
    <!-- 从仓库中读取组件列表，然后渲染出来 -->
    <draggable v-model="editorStore.coms" item-key="index" @start="dragstart">
      <template #item="{ element, index }">
        <div
          class="survey-com p10 mb-10"
          :class="{ active: editorStore.currentSelectComIndex === index }"
          @click="selectCom(index)"
          :ref="(el) => (surveyComRefs[index] = el)"
        >
          <component :is="element.type" :serialNum="materialNo[index]" :status="element.status" />
          <!-- 删除按钮 -->
          <div class="delete-btn" @click.stop="deleteCom(index)">
            <el-button
              type="danger"
              size="small"
              :icon="Close"
              circle
              v-show="editorStore.currentSelectComIndex === index"
            />
          </div>
        </div>
      </template>
    </draggable>

    <div class="tip" v-if="editorStore.coms.length === 0">空空如也~</div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/useEditor';
import { computed, nextTick, ref, type ComponentPublicInstance } from 'vue';
import emitter from '@/utils/eventBus';
import { Close } from '@element-plus/icons-vue';
import draggable from 'vuedraggable';
import { useMaterialNo } from '@/utils/hooks';
import { ElMessage, ElMessageBox } from 'element-plus';

const editorStore = useEditorStore();

// 容器的ref引用
const centerContainerRef = ref<HTMLDivElement | null>(null);
// 画布中所有组件的ref引用数组
const surveyComRefs = ref<(Element | ComponentPublicInstance | null)[]>([]);

// 得到序号列表
const materialNo = computed(() => useMaterialNo(editorStore.coms));

// 选中画布中的组件
const selectCom = (index: number) => {
  editorStore.setCurrentSelectComIndex(editorStore.currentSelectComIndex === index ? -1 : index);
  if (editorStore.currentSelectComIndex !== -1) {
    emitter.emit('scrollToCenter', index);
  }
};
// 拖拽开始
const dragstart = () => {
  // 拖拽时，取消编辑状态
  editorStore.setCurrentSelectComIndex(-1);
};
// 删除对应题目
const deleteCom = (index: number) => {
  console.log('点击button');

  ElMessageBox.confirm('确定要删除该题目吗？', '删除提示', {
    type: 'warning',
  })
    .then(() => {
      const res = editorStore.delCom(index);
      if (res) ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};
// 容器滚动方法
const scrollToBottom = async () => {
  // 等待加入的组件渲染完毕
  await nextTick();
  // 滚动到底部
  if (centerContainerRef.value) {
    window.scrollTo({
      top: centerContainerRef.value.scrollHeight,
      behavior: 'smooth',
    });
  }
};
// 使容器滚动到对应索引的题目组件位置(从而让对应题目组件位于中间位置)
const scrollToCenter = async (index: number) => {
  await nextTick();
  const surveyComRef = surveyComRefs.value[index];
  // 存在并且得到的是html元素
  if (surveyComRef && surveyComRef instanceof HTMLElement) {
    surveyComRef.scrollIntoView({
      behavior: 'smooth', // 平滑滚动
      block: 'center', // 位于中间
    });
  }
};

// 绑定到事件总线上
emitter.on('scrollToBottom', scrollToBottom);
emitter.on('scrollToCenter', scrollToCenter);
</script>

<style scoped lang="scss">
.center-container {
  width: calc(50%);
  margin: 70px auto 0;
  position: relative;
  left: 0;
  top: 0;
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  padding-bottom: 50px;
  .survey-com {
    cursor: pointer;
    transition: 0.5s;
    position: relative;
    &:hover {
      transform: scale(1.01);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    &.active {
      transform: scale(1.01);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .delete-btn {
      position: absolute;
      top: -10px;
      right: -10px;
    }
  }
}
.tip {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font-color-lighter);
}
</style>
