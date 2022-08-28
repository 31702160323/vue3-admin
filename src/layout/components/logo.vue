<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'logo',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean
    }
  }
});
</script>

<template>
  <div
    class="logo"
    :style="{ width: modelValue ? '64px' : '200px' }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <img src="@/assets/images/logo.png" alt="logo" align="middle" />
    <h2>One Piece</h2>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 64px;
  overflow: hidden;
  white-space: nowrap;
  transition: width ease 0.3s;

  img {
    width: 64px;
    padding: 16px;
  }
}
</style>
