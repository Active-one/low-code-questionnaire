<template>
  <div class="button-group-container flex align-items-center space-between">
    <!-- 左侧标题和当前状态 -->
    <div class="left flex align-items-center">
      <div class="mr-20">{{ title }}</div>
      <slot name="status-text">
        <span>{{ statusText }}</span>
      </slot>
    </div>

    <!-- 右侧按钮 -->
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  statusText: String,
});
</script>

<style scoped lang="scss">
.left {
  span {
    color: var(--font-color-lighter);
    font-size: var(--font-size-base);
  }
}
</style>
