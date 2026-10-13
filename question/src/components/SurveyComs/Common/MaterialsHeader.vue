<template>
  <div class="materials-header-contianer mb-15">
    <h2
      class="title"
      :class="{ 'font-italic': !titleItalic }"
      :style="{
        fontSize: `${titleSize}px`,
        color: titleColor,
        fontWeight: titleWeight ? 100 : 700,
      }"
    >
      <span>{{ serialNum < 10 ? `0${serialNum}` : serialNum }}.</span>
      <span>{{ title }}</span>
    </h2>
    <p
      class="desc"
      :class="{ 'font-bold': !descWeight, 'font-italic': !descItalic }"
      :style="{ fontSize: `${descSize}px`, color: descColor }"
    >
      {{ desc }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  serialNum: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  titleSize: {
    type: String,
    default: '22',
  },
  descSize: {
    type: String,
    default: '12',
  },
  titleWeight: {
    type: Number,
    default: 1,
  },
  descWeight: {
    type: Number,
    default: 1,
  },
  titleItalic: {
    type: Number,
    default: 1,
  },
  descItalic: {
    type: Number,
    default: 1,
  },
  titleColor: {
    type: String,
    default: '#000',
  },
  descColor: {
    type: String,
    default: '#909399',
  },
});
</script>

<style scoped lang="scss">
.title {
  font-size: 20px;

  span {
    margin: 0 5px;
  }
}
.desc {
  font-size: var(--font-size-base);
  color: var(--font-color-lighter);
  text-indent: 5px;
}
</style>
