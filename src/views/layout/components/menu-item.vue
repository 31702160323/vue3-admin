<template>
  <el-sub-menu v-if="item.children" :index="item.redirect || item.path">
    <template #title>
      <el-icon>
        <component :is="item.meta?.icon" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <el-menu-item-group
      v-for="chilItem in item.children"
      :key="chilItem.path"
      :title="item.meta?.title"
    >
      <aside-menu-item :item="chilItem" />
    </el-menu-item-group>
  </el-sub-menu>
  <el-menu-item v-else :index="item.redirect || item.path">
    <el-icon>
      <component :is="item.meta?.icon" />
    </el-icon>
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Location } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'aside-menu-item',
  components: { Location },
  props: {
    item: {
      type: Object
    }
  },
  setup(props) {
    return {
      ...props
    }
  }
})
</script>
