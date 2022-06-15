<template>
  <el-sub-menu v-if="item.children" :index="item.redirect || item.path">
    <template #title>
      <el-icon>
        <component :is="item.meta?.icon" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <aside-menu-item v-for="chilItem in item.children" :key="chilItem.path" :item="chilItem" />
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
import { toRefs, defineComponent, PropType } from 'vue'
import { Location } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

export default defineComponent({
  name: 'aside-menu-item',
  components: { Location },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    }
  },
  setup(props) {
    return {
      ...toRefs(props)
    }
  }
})
</script>
