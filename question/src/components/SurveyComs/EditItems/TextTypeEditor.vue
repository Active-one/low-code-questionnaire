<template>
  <div class="mb-20">
    <ButtonGroup title="文本类型" :statusText="getStringArrStatusByCurrentStatus(props)">
      <el-button-group>
        <el-button :type="!currentStatus ? 'primary' : ''" @click="changeCurrentStatus(0)">
          <el-icon><DocumentRemove /></el-icon>
        </el-button>
        <el-button :type="currentStatus ? 'primary' : ''" @click="changeCurrentStatus(1)">
          <el-icon><Document /></el-icon>
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
import { Document, DocumentRemove } from '@element-plus/icons-vue';
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

const changeCurrentStatus = (newStatus: number) => {
  updateStatus(props.configKey, newStatus);
};
</script>
