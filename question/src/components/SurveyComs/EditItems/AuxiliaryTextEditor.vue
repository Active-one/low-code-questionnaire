<template>
  <div class="mb-20">
    <div class="left flex align-items-center mb-10">
      <div class="mr-10">辅助文字</div>
      <el-switch
        v-model="switchValue"
        @change="(value: boolean) => updateStatus(configKey, value)"
      />
    </div>

    <!-- 状态文字编辑输入框组 -->
    <el-input
      v-if="isUse"
      class="mt-5 mb-5"
      v-model="stautsTextArr[index]"
      placeholder="请输入状态辅助文字"
      v-for="(_, index) in stautsTextArr"
      :key="index"
    />
  </div>
</template>

<script lang="ts" setup>
import type { VueComType } from '@/types/common.js';
import { inject, ref } from 'vue';
import type { UpdateStatusType } from '@/types/provide.js';

const props = defineProps<{
  configKey: string;
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
  status: string[];
  isUse: boolean;
}>();

// 状态文字输入框双向绑定
const stautsTextArr = ref(props.status);

const switchValue = ref(props.isUse);

const updateStatus: UpdateStatusType = inject('updateStatus')!;
</script>
