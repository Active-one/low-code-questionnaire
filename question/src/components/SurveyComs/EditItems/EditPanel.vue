<template>
  <div class="editor-panel-container p30">
    <div class="mb-20" v-for="(item, key) in status.status" :key="item.id">
      <component v-if="item.isShow" :is="item.editCom" :config-key="key" v-bind="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Status } from '@/types';

defineProps<{ status: Status }>();
</script>
