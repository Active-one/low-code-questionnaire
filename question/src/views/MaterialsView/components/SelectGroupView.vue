<template>
  <Layout>
    <template #left>
      <router-link
        exact-active-class="active"
        class="link-item"
        :to="item.link"
        v-for="(item, i) in selectList"
        :key="i"
      >
        {{ item.title }}
      </router-link>
    </template>

    <template #right> 右侧插槽 </template>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from './Layout.vue';

const selectList = [
  {
    title: '单选题',
    link: '/single-select',
  },
  {
    title: '多选题',
    link: '/multi-select',
  },
  {
    title: '下拉选择题',
    link: '/options-select',
  },
  {
    title: '图片单选题',
    link: '/single-pic-select',
  },
  {
    title: '图片多选题',
    link: '/multi-pic-select',
  },
];
</script>
