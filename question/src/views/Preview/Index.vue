<template>
  <div class="preview-container">
    <div class="preview-content mc">
      <!-- 顶部区域 -->
      <div class="top-container flex space-between align-items-center">
        <!-- 左边按钮组 -->
        <div class="btn-group no-print">
          <el-button type="danger" @click="goBack">返回</el-button>
          <el-button type="success" @click="generateOnlineSurvey">生成在线问卷</el-button>
          <el-button type="warning" @click="generatePDF">生成本地PDF</el-button>
        </div>

        <!-- 右边问卷数量 -->
        <div class="survey-count mr-15">
          题目数量：<span>{{ editorStore.surveyComNum }}</span>
        </div>
      </div>

      <!-- 问卷内容 -->
      <div class="survey-container p20 b1 no-border">
        <div class="survey-com mb-10" v-for="(survey, index) in editorStore.coms" :key="survey.id">
          <component :is="survey.type" v-bind="survey" :serialNum="MaterialNo[index]" />
        </div>
      </div>
    </div>
  </div>

  <el-dialog title="在线链接" v-model="showDialog" width="500">
    分享链接：<a
      style="color: #0000ee; text-decoration: underline"
      :href="onlineSurveyUrl"
      target="_blank"
      >{{ onlineSurveyUrl }}</a
    >
    <template #footer>
      <el-button type="primary" @click="copyOnlineSurveyLink">复制链接</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/useEditor';
import { comNameIsCanGeneratePDF } from '@/utils';
import { useMaterialNo } from '@/utils/hooks';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

const route = useRoute();
const router = useRouter();
const editorStore = useEditorStore();
// 是否显示dialog弹出框
const showDialog = ref(false);
// 在线问卷的链接
const onlineSurveyUrl = ref('');

// 问卷id
const surveyId = computed(() => Number(route.params.id));
// 组件序号列表
const MaterialNo = computed(() => useMaterialNo(editorStore.coms));

// 返回
const goBack = () => {
  router.back();
};

// 生成本地PDF
const generatePDF = () => {
  // 首先需要判断是否存在不支持导出PDF的组件（哪些选项式的）
  const canGeneratePDF = editorStore.coms.every((com) => comNameIsCanGeneratePDF(com.name));
  if (!canGeneratePDF) {
    ElMessage.warning('存在不支持导出PDF的题目，请先移除这些题目');
  }
  // 调用浏览器的方法，生成PDF
  window.print();
};
// 生成在线问卷
const generateOnlineSurvey = async () => {
  // 生成id
  const onlineSurveyId = uuidv4();
  const onlineSurveyData = {
    coms: editorStore.coms,
    surveyCount: editorStore.surveyComNum,
  };
  // 保存该问卷到服务器
  const res = await fetch('/api/saveQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: onlineSurveyId,
      quizData: onlineSurveyData,
    }),
  }).then((res) => res.json());
  // 保存成功
  if (res.message) {
    // 生成对应链接
    onlineSurveyUrl.value = `${location.origin}/online-survey/${onlineSurveyId}`;
    // 显示弹出框
    showDialog.value = true;
  }
};
// 复制在线问卷链接
const copyOnlineSurveyLink = () => {
  if (onlineSurveyUrl.value) {
    navigator.clipboard.writeText(onlineSurveyUrl.value);
    showDialog.value = false;
    ElMessage.success('链接复制成功');
  } else {
    ElMessage.error('链接复制失败');
  }
};

onMounted(() => {
  if (surveyId.value) {
    // 调用仓库方法恢复仓库数据
    editorStore.restoreSurveyDataToStore(surveyId.value);
  }
});
</script>

<style scoped lang="scss">
.preview-container {
  width: 100vw;
  min-height: 100vh;
  background-image: url('@/assets/images/editor_background.png');
  .preview-content {
    width: 800px;
    .top-container {
      height: 60px;
      background-color: var(--white);
      .survey-count {
        color: var(--font-color-light);
        font-size: var(--font-size-base);
      }
    }
    .survey-container {
      border-radius: var(--border-radius-lg);
      background-color: var(--white);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }
}

// 媒体查询
@media print {
  .no-print {
    display: none;
  }
  .no-border {
    border: 0;
    box-shadow: none !important;
  }
}
</style>
