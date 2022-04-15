<template>
  <div class="logo" :style="{ width: collapsed ? '56px' : '200px' }">
    <img src="@/assets/images/logo.png" alt="" />
    <h2 v-show="!collapsed" class="title">One Piece</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'logo',
  props: {
    collapsed: {
      type: Boolean
    }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 12px;
  overflow: hidden;
  line-height: 64px;
  white-space: nowrap;
  transition: width ease 0.3s;

  img {
    height: 32px;
  }

  .title {
    margin-bottom: 0;
    margin-left: 8px;
    color: black;
  }
}
</style>
