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
      <div class="option" v-for="(item, index) in status" :key="index">
        <div class="option-title mb-10 mt-10 flex align-items-center">
          <span>选项{{ index + 1 }}</span>
          <!-- 删除按钮 -->
          <el-button
            style="width: 19px; height: 19px"
            class="ml-10"
            type="danger"
            size="small"
            circle
            :icon="Minus"
            @click="removeOption(index)"
          />
        </div>
        <div class="mb-5 flex align-items-center">
          <span class="mr-5">{{ item.value ? '已' : '未' }}上传图片</span>
          <el-link
            type="primary"
            underline="hover"
            v-show="item.value"
            @click="delUpdatedPic(index)"
          >
            删除图片
          </el-link>
        </div>
        <div class="info">
          <el-input
            class="mt-5 mb-5"
            placeholder="请输入图片标题"
            v-model="inputValueArr[index]!.picTitle"
          />
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入图片描述"
            v-model="inputValueArr[index]!.picDesc"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PicTitleOrDescValueObjStatus,
  VueComType,
  UpdateStatusType,
  GetPicLinkType,
} from '@/types';
import { ref, inject } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const props = defineProps<{
  configKey: string;
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
  status: PicTitleOrDescValueObjStatus[];
  currentStatus: number;
}>();

const inputValueArr = ref(props.status);
const updateStatus: UpdateStatusType = inject('updateStatus')!;
const getPicLink: GetPicLinkType = inject('getPicLink')!;

// 添加选项
const addOption = () => {
  const lastOption = inputValueArr.value[inputValueArr.value.length - 1]!;
  // 根据最后一个选项的尾号，计算新选项的选项号
  let newOptionNum = parseInt(lastOption.picTitle.slice(lastOption.picTitle.length - 1)) + 1;
  // 转换失败就重新从1开始
  if (isNaN(newOptionNum)) newOptionNum = 1;

  // 更新仓库中的数据
  updateStatus(props.configKey, {
    picTitle: `新增图片标题${newOptionNum}`,
    picDesc: `新增图片描述${newOptionNum}`,
    value: '',
  });
};

// 删除上传的图片
const delUpdatedPic = (index: number) => {
  // 询问是否删除
  ElMessageBox.confirm('确定要删除已上传的图片吗？', '删除提示', {
    type: 'warning',
  })
    .then(() => {
      // 删除仓库中保存的上传的图片（修改仓库中的图片数据为空）
      getPicLink({ index, link: '' });
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};

// 删除选项
const removeOption = (index: number) => {
  updateStatus(props.configKey, index);
};
</script>

<style scoped lang="scss">
.option {
  span {
    font-size: var(--font-size-base);
    color: var(--font-color-light);
  }
}
</style>
