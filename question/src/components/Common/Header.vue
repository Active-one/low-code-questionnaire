<template>
  <div class="header-container border-box flex bb-1">
    <!-- 左侧区域 -->
    <div class="left flex justify-content-center align-items-center">
      <el-button :icon="ArrowLeft" circle size="small" @click="backToHome" />
    </div>

    <!-- 中间区域 -->
    <div class="center flex align-items-center bl-1 br-1 pl-15 pr-15">
      <div class="btns flex space-between" v-if="isEditor">
        <!-- 左侧区域 -->
        <div class="left-btns">
          <!-- 新问卷显示的 -->
          <template v-if="!surveyId">
            <el-button type="danger" size="small" @click="resetSurvey">重置问卷</el-button>
            <el-button type="success" size="small" @click="saveSurvey">保存问卷</el-button>
          </template>

          <!-- 已有的问卷显示的 -->
          <template v-else>
            <el-button type="warning" size="small" @click="updateSurvey">更新问卷</el-button>
          </template>
        </div>
        <!-- 右侧区域 -->
        <div class="right-btns">
          <el-button type="primary" size="small" @click="previewSurvey">预览</el-button>
        </div>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="right flex justify-content-center align-items-center">
      <el-avatar :size="30" :src="avatar" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/useEditor';
import type { SurveyDataType } from '@/types';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps({
  // 标识是否是在编辑器中显示
  isEditor: Boolean,
});

const editorStore = useEditorStore();
const router = useRouter();
const route = useRoute();
const avatar = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif');

// 问卷id，如果有，代表是编辑问卷
const surveyId = computed(() => Number(route.params.id));

// 回首页
const backToHome = () => {
  localStorage.setItem('active-view', 'home');
  router.push('/');
};
// 重置问卷
const resetSurvey = () => {
  ElMessageBox.confirm('确定要重置问卷吗？已有题目将全部删除', '重置提示', {
    type: 'warning',
  })
    // 确定
    .then(() => {
      editorStore.resetToDefaultComs();
      ElMessage.success('已重置');
    })
    // 取消
    .catch(() => {
      ElMessage.info('已取消重置');
    });
};
// 保存问卷
const saveSurvey = (callback?: (surveyId: number) => void) => {
  ElMessageBox.prompt('请输入问卷标题', '保存提示', {
    type: 'info',
  })
    .then(({ value }) => {
      const surveyData: SurveyDataType = {
        title: value,
        createDate: Date.now(),
        updateDate: Date.now(),
        surveyCount: editorStore.surveyComNum,
        coms: JSON.parse(JSON.stringify(editorStore.coms)),
      };
      editorStore
        .saveSurvey(surveyData)
        .then((surveyId: number) => {
          ElMessage.success('保存成功');
          // 如果有传递回调函数，就调用
          if (callback && typeof callback === 'function') {
            callback(surveyId);
          }
          // 否则就是点了保存问卷按钮，切换到编辑状态
          else {
            router.replace(`/editor/${surveyId}/survey-type`);
          }
        })
        .catch(() => {
          ElMessage.success('保存失败');
        });
    })
    .catch(() => {
      ElMessage.info('已取消保存');
    });
};
// 更新问卷
const updateSurvey = async () => {
  if (surveyId.value) {
    await editorStore.updateSurvey(surveyId.value, {
      coms: JSON.parse(JSON.stringify(editorStore.coms)),
      updateDate: Date.now(),
      surveyCount: editorStore.surveyComNum,
    });
    ElMessage.success('更新成功');
  }
};
// 预览问卷
const previewSurvey = () => {
  // 分两种情况：当前是编辑问卷，那就弹窗提示会保存问卷
  ElMessageBox.confirm('预览需保存问卷，确定要保存问卷吗？', '预览提示', {
    type: 'warning',
  })
    .then(() => {
      if (surveyId.value) {
        // 更新问卷
        updateSurvey();
        // 跳转到预览页面
        router.push(`/preview/${surveyId.value}`);
      }
      // 如果是添加问卷
      else {
        // 就保存问卷，然后跳转到预览页面
        saveSurvey((surveyId: number) => {
          router.replace(`/preview/${surveyId}`);
        });
      }
    })
    .catch(() => {
      ElMessage.info('已取消预览');
    });
};
</script>

<style scoped lang="scss">
.header-container {
  height: 50px;
}
.left {
  width: 60px;
}
.center {
  flex: 1;
  .btns {
    width: 100%;
  }
}
.right {
  width: 80px;
}
</style>
