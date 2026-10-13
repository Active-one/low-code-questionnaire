<template>
  <div class="mb-20">
    <ButtonGroup
      :title="`${configKey.includes('title') ? '标题' : '描述'}颜色`"
      :statusText="getStringTextStatus(props)"
    >
      <el-color-picker
        :show-alpha="true"
        v-model="selectColor"
        @change="(newValue: string) => updateStatus(configKey, newValue)"
      />
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import type { VueComType } from '@/types/common.js';
import ButtonGroup from './ButtonGroup.vue';
import { inject, ref } from 'vue';
import { getStringTextStatus } from '@/utils/index.js';
import type { UpdateStatusType } from '@/types/provide.js';

const props = defineProps<{
  configKey: string;
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
  status: string;
}>();

const selectColor = ref(props.status);

const updateStatus: UpdateStatusType = inject('updateStatus')!;
</script>
