<template>
  <div class="online-survey-container mc">
    <!-- 题目数量 -->
    <div class="survey-count mb-20">题目数量：{{ surveyData.surveyCount }}</div>

    <!-- 题目容器 -->
    <div class="survey-container">
      <div
        class="survey-com p-10 pb-10 mb-15"
        v-for="(survey, index) in surveyData.coms"
        :key="survey.id"
      >
        <component
          :is="survey.type"
          v-bind="survey"
          :serialNum="materialNo[index]"
          @get-answer="(value: string) => getSurveyComAnswer(value, index)"
        />
      </div>
    </div>

    <!-- 提交答案按钮 -->
    <div class="submit-btn">
      <el-button type="primary" @click="submitAnswer">提交答案</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Status } from '@/types';
import { restoreComType } from '@/utils';
import { useMaterialNo } from '@/utils/hooks';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
// 问卷数据
const surveyData = ref<{ surveyCount: number; coms: Status[] }>({
  surveyCount: 0,
  coms: [],
});
// 答案列表，索引对应题号
const answers = ref<(string | number | null)[]>([]);

// 问卷id
const surveyId = computed(() => route.params.id);
// 序号列表
const materialNo = computed(() => useMaterialNo(surveyData.value.coms));

// 根据问卷id获取问卷数据
const getSurveyData = async () => {
  if (surveyId.value) {
    const res = await fetch(`/api/getQuiz/${surveyId.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    if (res) {
      // 还原组件的type
      restoreComType(res.coms);
      surveyData.value = res;
      // 初始化答案数组
      answers.value = res.coms.map(() => null);
    }
  }
};
// 获取题目组件的答案
const getSurveyComAnswer = (value: string | number, index: number) => {
  answers.value[index] = value ? value : null;
};
// 提交答案
const submitAnswer = async () => {
  // 提交答案
  const res = await fetch('/api/submitAnswers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: surveyId.value,
      answers: answers.value,
    }),
  }).then((res) => res.json());
  if (res) {
    ElMessage.success('提交成功');
  }
};

onMounted(() => {
  getSurveyData();
});
</script>

<style scoped lang="scss">
.online-survey-container {
  width: 800px;
  padding: 30px 0;

  .submit-btn {
    text-align: center;
    margin: 30px 0 10px 0;
  }
}
</style>
