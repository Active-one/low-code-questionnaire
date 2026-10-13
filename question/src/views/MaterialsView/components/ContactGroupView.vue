<template>
  <Layout>
    <template #left>
      <router-link
        exact-active-class="active"
        class="link-item"
        :to="item.link"
        v-for="(item, i) in contactList"
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
const contactList = [
  {
    title: '手机',
    link: '/personal-info-tel',
  },
  {
    title: '微信号',
    link: '/personal-info-wechat',
  },
  {
    title: 'QQ号',
    link: '/personal-info-qq',
  },
  {
    title: '邮箱',
    link: '/personal-info-email',
  },
  {
    title: '地址',
    link: '/personal-info-address',
  },
];
</script>
