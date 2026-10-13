<template>
  <div>
    <div class="title flex align-items-center mb-10">
      <span class="mr-10">题目选项</span>
      <!-- 添加按钮 -->
      <el-button circle size="small" :icon="Plus" @click="addOption" />
    </div>

    <!-- 选项组 -->
    <div class="option-group">
      <!-- 一个选项 -->
      <div class="option flex align-items-center" v-for="(_, index) in status" :key="index">
        <el-input class="mt-5 mb-5" placeholder="请输入选项内容" v-model="inputValueArr[index]" />
        <!-- 删除按钮 -->
        <el-button
          class="ml-10"
          type="danger"
          size="small"
          circle
          :icon="Minus"
          @click="removeOption(index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UpdateStatusType, VueComType } from '@/types';
import { ref, inject } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';

const props = defineProps<{
  configKey: string;
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
  status: string[];
  currentStatus: number;
}>();

const inputValueArr = ref(props.status);
const updateStatus: UpdateStatusType = inject('updateStatus')!;

// 添加选项
const addOption = () => {
  const lastOption = inputValueArr.value[inputValueArr.value.length - 1]!;
  // 根据最后一个选项的尾号，计算新选项的选项号
  let newOptionNum = parseInt(lastOption.slice(lastOption.length - 1)) + 1;
  // 转换失败就重新从1开始
  if (isNaN(newOptionNum)) newOptionNum = 1;

  // 更新仓库中的数据
  updateStatus(props.configKey, `新增选项${newOptionNum}`);
};

// 删除选项
const removeOption = (index: number) => {
  updateStatus(props.configKey, index);
};
</script>
