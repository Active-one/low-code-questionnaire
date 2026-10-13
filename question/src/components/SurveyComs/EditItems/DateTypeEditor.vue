<template>
  <div class="mb-20">
    <ButtonGroup title="日期类型" :statusText="getValueObjArrStatusByCurrentStatus(props)!.status">
      <el-select
        v-model="selectValue"
        placeholder="日期类型"
        style="width: 100px"
        @change="(newStatus: number) => updateStatus(configKey, newStatus)"
      >
        <el-option v-for="(item, index) in status" :key="index" :label="item.status" :value="item">
        </el-option>
      </el-select>
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import type { VueComType } from '@/types/common.js';
import ButtonGroup from './ButtonGroup.vue';
import { inject, ref } from 'vue';
import { getValueObjArrStatusByCurrentStatus } from '@/utils/index.js';
import type { ValueObjStatus } from '@/types/editProps.js';
import type { UpdateStatusType } from '@/types/provide.js';

const props = defineProps<{
  configKey: string;
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
  status: ValueObjStatus[];
  currentStatus: number;
}>();

const selectValue = ref('');
const updateStatus: UpdateStatusType = inject('updateStatus')!;
</script>
