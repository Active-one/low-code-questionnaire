<template>
  <div class="home-container p20">
    <!-- 标题 -->
    <h1 class="text-center font-weight-200">个人问卷系统</h1>

    <!-- 按钮组 -->
    <div class="btns mb-15">
      <el-button type="primary" :icon="Plus" @click="goToEditor">创建问卷</el-button>
      <el-button type="success" :icon="Compass" @click="goToMaterials">组件市场</el-button>
    </div>

    <!-- 问卷列表 -->
    <el-table :data="surveies" border>
      <!-- 创建日期 -->
      <el-table-column label="创建日期" align="center" width="300">
        <template #default="{ row }">
          {{ formatTime(row.createDate) }}
        </template>
      </el-table-column>

      <!-- 问卷标题 -->
      <el-table-column prop="title" label="问卷标题" align="center" />

      <!-- 题目数 -->
      <el-table-column prop="surveyCount" label="题目数" align="center" width="200" />

      <!-- 最近更新日期 -->
      <el-table-column label="最近更新日期" align="center" width="300">
        <template #default="{ row }">
          {{ formatTime(row.updateDate) }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="280">
        <template #default="{ row }">
          <el-button type="primary" size="small" link @click="viewSurvey(row.id)">
            查看问卷
          </el-button>
          <el-button type="primary" size="small" link @click="editSurvey(row.id)">编辑</el-button>
          <el-button type="primary" size="small" link @click="delSurvey(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Compass } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { SurveyDataType } from '@/types';
import { formatTime } from '@/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useEditorStore } from '@/stores/useEditor';

const router = useRouter(); // 路由器
const surveies = ref<SurveyDataType[]>([]); // 问卷列表
const editorStore = useEditorStore();

// 创建问卷按钮点击事件
const goToEditor = () => {
  localStorage.setItem('active-view', 'editor');
  // 重置仓库中的组件列表
  editorStore.resetToDefaultComs();
  router.push('/editor');
};
// 组件市场按钮点击事件
const goToMaterials = () => {
  localStorage.setItem('active-view', 'materials');
  router.push('/materials');
};
// 获取问卷列表
const getSurveies = async () => {
  const res = await editorStore.getAllSurvey();
  surveies.value = res;
};
// 查看问卷
const viewSurvey = (surveyId: number) => {
  router.push(`/preview/${surveyId}`);
};
// 删除问卷
const delSurvey = (surveyId: number) => {
  ElMessageBox.confirm('确定要删除该问卷吗？', '删除提示', {
    type: 'warning',
  })
    .then(async () => {
      await editorStore.delSurvey(surveyId);
      getSurveies();
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};
// 编辑问卷
const editSurvey = (surveyId: number) => {
  // 跳转到编辑页面
  router.push(`/editor/${surveyId}/survey-type`);
};

onMounted(() => {
  getSurveies();
});
</script>
