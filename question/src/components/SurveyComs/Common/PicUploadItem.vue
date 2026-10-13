<template>
  <div class="pic-upload-item-container">
    <!-- 上传图片的 -->
    <div class="upload flex justify-content-center align-items-center">
      <el-upload
        name="image"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          :src="imageUrl + value"
          style="max-width: 200px; max-height: 200px; object-fit: contain"
          v-if="value"
        />
        <div v-else>
          <el-icon><Upload /></el-icon>
          <span class="ml-5" style="vertical-align: 2px">添加图片</span>
        </div>
      </el-upload>
    </div>

    <!-- 显示标题和描述 -->
    <div class="info flex justify-content-center align-items-center">
      <span class="mb-5">{{ picTitle }}</span>
      <span class="desc">{{ picDesc }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GetPicLinkType } from '@/types';
import { Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import type { UploadProps } from 'element-plus';
import { inject } from 'vue';

const props = defineProps({
  picTitle: String,
  picDesc: String,
  value: String,
  index: Number,
});
// 图片前缀
const imageUrl = 'http://localhost:3000';
const getPicLink: GetPicLinkType = inject('getPicLink', () => {});

// 图片上传前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过 2MB!');
    return false;
  }
  return true;
};

// 图片上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (res) => {
  // 获取成功后回显到页面上，并修改仓库中status对应index对象的value值为图片地址
  getPicLink({ link: res.imageUrl, index: props.index! });
};
</script>

<style scoped lang="scss">
.pic-upload-item-container {
  width: 200px;
  height: 300px;
  border: 1px solid var(--font-color-lightest);
  border-radius: var(--border-radius-md);
  color: var(--font-color-light);

  .upload {
    width: 200px;
    height: 200px;
    background-color: var(--font-color-lightest);
  }

  .info {
    height: 100px;
    font-size: var(--font-size-lg);
    flex-direction: column;

    > span {
      line-height: 1.3;
    }

    .desc {
      font-size: var(--font-size-base);
    }
  }
}
</style>
