<template>
  <div class="mb-20">
    <ButtonGroup
      :title="`${configKey.includes('title') ? '标题' : '描述'}尺寸`"
      :statusText="getStringArrStatusByCurrentStatus(props)"
    >
      <el-button-group>
        <el-button
          :type="currentStatus === index ? 'primary' : ''"
          v-for="(_, index) in status"
          :key="index"
          @click="updateStatus(configKey, index)"
        >
          <font-awesome-icon icon="font" :size="sizes[index]" />
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
const sizes = ['lg', 'sm', 'xs'];

const updateStatus: UpdateStatusType = inject('updateStatus')!;
</script>
