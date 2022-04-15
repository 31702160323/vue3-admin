<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <transition>
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'authority',
  setup() {
    const show = ref(true)
    return {
      show
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
