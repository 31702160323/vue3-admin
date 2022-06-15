<template>
  <div>
    <div v-for="(value, key) in browserInfo" :key="key">{{ key }} : {{ value }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BrowserType from '@/utils/browser-type'

export default defineComponent({
  name: 'authority',
  setup() {
    // 获取浏览器信息
    const browserInfo = ref(BrowserType('zh-cn'))
    return {
      browserInfo
    }
  }
})
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
