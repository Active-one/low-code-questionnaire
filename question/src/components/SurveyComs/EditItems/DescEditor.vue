<template>
  <div class="mb-10">标题内容</div>
  <el-input
    type="textarea"
    :rows="5"
    placeholder="请输入题目说明（选填）"
    v-model="inputValue"
    @update:modelValue="(newValue: string) => updateStatus(configKey, newValue)"
  />
</template>

<script lang="ts" setup>
import type { UpdateStatusType, VueComType } from '@/types';
import { ref, inject } from 'vue';

const props = defineProps<{
  configKey: string;
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
  status: string;
}>();

const inputValue = ref(props.status);
const updateStatus: UpdateStatusType = inject('updateStatus')!;
</script>
