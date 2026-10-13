<template>
  <div class="materials-view-container">
    <!-- 头部区域 -->
    <Header :is-editor="false" />

    <!-- 标题 -->
    <h1 class="title font-weight-100 text-center mt-20 mb-20">组件市场</h1>

    <!-- 内容区域 -->
    <div class="main-container mc flex">
      <!-- 左侧分类标签 -->
      <div class="category">
        <router-link
          class="category-item"
          :to="link.link"
          v-for="link in categoryList"
          :key="link.id"
        >
          <!-- 图标 -->
          <el-icon :size="14">
            <component :is="link.iconCom" />
          </el-icon>
          <!-- 标签内容 -->
          <span class="text">{{ link.title }}</span>
        </router-link>
      </div>

      <!-- 右侧内容 -->
      <div class="content">
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Common/Header.vue';
import {
  CircleCheck,
  EditPen,
  Files,
  ChatLineSquare,
  User,
  Message,
} from '@element-plus/icons-vue';

// 分类列表
const categoryList = [
  {
    id: 1,
    title: '选择',
    iconCom: CircleCheck,
    link: '/select-group',
  },
  {
    id: 2,
    title: '文本输入',
    iconCom: EditPen,
    link: '/input-group',
  },
  {
    id: 3,
    title: '高级题型',
    iconCom: Files,
    link: '/advanced-group',
  },
  {
    id: 4,
    title: '备注说明',
    iconCom: ChatLineSquare,
    link: '/note-group',
  },
  {
    id: 5,
    title: '个人信息',
    iconCom: User,
    link: '/personal-info-group',
  },
  {
    id: 6,
    title: '联系方式',
    iconCom: Message,
    link: '/contact-group',
  },
];
</script>

<style scoped lang="scss">
.title {
  height: 50px;
}
.main-container {
  width: 1180px;
  height: 600px;
  .category {
    width: 70px;
    height: 100%;
    .category-item {
      width: 70px;
      height: 70px;
      border-top-left-radius: var(--border-radius-lg);
      border-bottom-left-radius: var(--border-radius-lg);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: red;
      overflow: hidden;
      color: var(--white);
      font-size: 14px;
      margin-bottom: 10px;
      .text {
        display: block;
      }
      @for $i from 1 through 4 {
        &:nth-child(4n + #{$i}) {
          @if $i == 1 {
            background-color: var(--primary-color);
          } @else if $i == 2 {
            background-color: var(--success-color);
          } @else if $i == 3 {
            background-color: var(--warning-color);
          } @else if $i == 4 {
            background-color: var(--error-color);
          }
        }
      }
    }
  }
  .content {
    width: calc(1180px - 60px);
    height: 100%;
    flex-shrink: 0;
  }
}
</style>
