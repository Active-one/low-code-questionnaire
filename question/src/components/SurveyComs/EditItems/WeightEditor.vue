<template>
  <div class="mb-20">
    <ButtonGroup
      :title="`${configKey.includes('title') ? '标题' : '描述'}加粗`"
      :statusText="getStringArrStatusByCurrentStatus(props)"
    >
      <el-button-group>
        <el-button
          :type="currentStatus === index ? 'primary' : ''"
          v-for="(_, index) in status"
          :key="index"
          @click="updateStatus(configKey, index)"
        >
          <span :style="{ fontSize: '18px', fontWeight: index === 0 ? 'bold' : 'none' }">B</span>
        </el-button>
      </el-button-group>
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import type { VueComType } from '@/types/common.js';
import ButtonGroup from './ButtonGroup.vue';
import { inject } from 'vue';
import { getStringArrStatusByCurrentStatus } from '@/utils/index.js';
import type { UpdateStatusType } from '@/types/provide.js';

const props = defineProps<{
  configKey: string;
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
  status: string[];
  currentStatus: number;
}>();

const updateStatus: UpdateStatusType = inject('updateStatus')!;
</script>
