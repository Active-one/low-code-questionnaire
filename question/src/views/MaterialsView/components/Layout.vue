<template>
  <div class="layout-container flex b1">
    <!-- 左侧区域 -->
    <div class="left p20 flex">
      <!-- 左具名插槽 -->
      <slot name="left"></slot>
    </div>

    <!-- 中间区域 -->
    <div class="center bl-1 br-1 p30">
      <!-- 三级路由出口 -->
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          :serialNum="1"
          :status="materialStore.currentMaterialStatus.status"
        />
      </router-view>
    </div>

    <!-- 右侧区域 -->
    <div class="right">
      <!-- 右具名插槽 -->
      <EditPanel :status="materialStore.currentMaterialStatus" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import EditPanel from '@/components/SurveyComs/EditItems/EditPanel.vue';
import { useMaterialStore } from '@/stores/useMaterial';
import type { MaterialStoreType, PicLinkObj, Status } from '@/types';
const materialStore = useMaterialStore() as MaterialStoreType;

import { getPicLink, updateStatus } from '@/utils/provide';
// 为后代组件提供修改状态数据的方法
provide(
  'updateStatus',
  (
    configKey: string,
    newValue: string | number | boolean | object,
    status: Status = materialStore.currentMaterialStatus,
  ) => updateStatus(configKey, newValue, status),
);
// 得到上传的图片信息后，手动调用updateStatus，去修改仓库中的数据
provide('getPicLink', (picInfo: PicLinkObj) =>
  getPicLink(picInfo, materialStore.currentMaterialStatus),
);
</script>

<style scoped lang="scss">
.layout-container {
  height: calc(100vh - 100px - 40px - 20px);
  align-items: flex-start;
  border-radius: var(--border-radius-lg);
  border-top-left-radius: 0;
  > div {
    height: 100%;
    box-sizing: border-box;
  }
  .left {
    text-align: center;
    width: 210px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-between;
    color: var(--font-color-light);
  }
  .center {
    flex: 1;
    overflow-y: auto;
  }
  .right {
    width: 330px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
}
</style>
