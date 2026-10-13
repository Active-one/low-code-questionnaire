<template>
  <div class="left-side-container border-box b1 flex">
    <div class="left-nav br-1 flex align-items-center">
      <div
        class="nav-item"
        :class="{ active: route.name === 'survey-type' }"
        @click="$router.push('/editor/survey-type')"
      >
        <el-icon><Document /></el-icon>
        <span>题型</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: route.name === 'outline' }"
        @click="$router.push('/editor/outline')"
      >
        <el-icon><Memo /></el-icon>
        <span>大纲</span>
      </div>
    </div>

    <div class="rigth-content">
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Document, Memo } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped lang="scss">
.left-side-container {
  position: fixed;
  left: 20px;
  top: 70px;
  width: 300px;
  height: calc(100vh - 50px - 40px);
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  .left-nav {
    width: 50px;
    flex-direction: column;
    .nav-item {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--font-color-light);
      cursor: pointer;
      &.active {
        color: var(--primary-color);
      }

      span {
        font-size: var(--font-size-base);
        margin-top: 5px;
      }
    }
  }

  .rigth-content {
    flex: 1;
    overflow-y: auto;
    padding: 25px;
    padding-right: 15px;
  }
}
</style>
