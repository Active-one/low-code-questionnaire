<template>
  <Layout>
    <template #left>
      <router-link
        exact-active-class="active"
        class="link-item"
        :to="item.link"
        v-for="(item, i) in inputList"
        :key="i"
      >
        {{ item.title }}
      </router-link>
    </template>

    <!-- 三级路由出口 -->
    <router-view></router-view>

    <template #right> 右侧插槽 </template>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from './Layout.vue';
const inputList = [
  {
    title: '文本输入',
    link: '/text-input',
  },
];
</script>
