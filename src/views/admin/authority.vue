<template>
  <div class="text-red-500">
    <div v-for="(value, key) in browserInfo" :key="key">{{ key }} : {{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BrowserType from '@/utils/browser-type';

defineOptions({
  name: 'Authority'
});

const browserInfo = ref(BrowserType('zh-cn'));
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
