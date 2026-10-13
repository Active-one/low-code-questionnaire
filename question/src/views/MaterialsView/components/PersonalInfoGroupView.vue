<template>
  <Layout>
    <template #left>
      <router-link
        exact-active-class="active"
        class="link-item"
        :to="item.link"
        v-for="(item, i) in infoList"
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
const infoList = [
  {
    title: '姓名',
    link: '/personal-info-name',
  },
  {
    title: '身份证',
    link: '/personal-info-id',
  },
  {
    title: '出生日期',
    link: '/personal-info-birth',
  },
  {
    title: '性别',
    link: '/personal-info-gender',
  },
  {
    title: '年龄',
    link: '/personal-info-age',
  },
  {
    title: '学历',
    link: '/personal-info-education',
  },
  {
    title: '大学',
    link: '/personal-info-collage',
  },
  {
    title: '专业',
    link: '/personal-info-major',
  },
  {
    title: '行业',
    link: '/personal-info-industry',
  },
  {
    title: '职业',
    link: '/personal-info-career',
  },
  {
    title: '公司',
    link: '/personal-info-company',
  },
  {
    title: '职位',
    link: '/personal-info-position',
  },
];
</script>
