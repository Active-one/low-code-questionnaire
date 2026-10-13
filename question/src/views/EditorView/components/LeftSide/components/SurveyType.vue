<template>
  <div class="survey-type-container">
    <SurveyComGroup v-for="(comGroup, index) in surveyComList" :key="index" v-bind="comGroup" />
  </div>
</template>

<script lang="ts" setup>
import SurveyComGroup from '@/components/Editor/SurveyComGroup.vue';
import { surveyComList } from '@/configs/surveyGroupConfig';
</script>

<style scoped lang="scss"></style>
