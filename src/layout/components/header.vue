<template>
  <div class="toolbar">
    <el-dropdown>
      <el-icon style="margin-top: 1px; margin-right: 8px">
        <setting />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>Tom</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Setting } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'page-header',
  components: { Setting }
})
</script>

<style lang="scss" scoped>
.toolbar {
  position: absolute;
  top: 50%;
  right: 20px;
  display: inline-flex;
  align-items: center;
  transform: translateY(-50%);
}
</style>
