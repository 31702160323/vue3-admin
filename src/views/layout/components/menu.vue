<template>
  <el-menu class="el-menu-vertical" :collapse="collapsed" @select="toPage">
    <template v-for="item in menuList" :key="item.path">
      <aside-menu-item :item="item" />
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import AsideMenuItem from './menu-item.vue'
export default defineComponent({
  name: 'aside-menu',
  components: { AsideMenuItem },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const menuList = ref<RouteRecordRaw[]>([])
    if (router.options.routes[0].children) {
      menuList.value = router.options.routes[0].children
    }

    const toPage = (path: string) => {
      console.log(path)

      if (path === route.fullPath) return
      router.push({ path: path })
    }

    return {
      menuList,
      toPage
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

/* stylelint-disable-next-line selector-class-pattern */
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
