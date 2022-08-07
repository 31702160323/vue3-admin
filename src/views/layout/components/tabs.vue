<template>
  <el-tabs
    v-model="activeKey"
    style="background: white"
    type="card"
    closable
    @contextmenu.prevent="openContextMenu"
    @tab-click="changeTab"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="pageItem in tabsList"
      :key="pageItem.fullPath"
      :label="pageItem.meta.title"
      :name="pageItem.fullPath"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage as message } from 'element-plus'

export default defineComponent({
  name: 'tabs',
  props: {
    collapsed: {
      type: Boolean
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // 获取简易的路由对象
    const getSimpleRoute = (route) => {
      const { fullPath, hash, meta, name, params, path, query } = route
      return { fullPath, hash, meta, name, params, path, query }
    }

    // 初始化标签页
    store.commit('tabs-view/init', [getSimpleRoute(route)])

    const tabsList = computed(() => store.getters.tabsList)

    const state = reactive({
      activeKey: route.fullPath
    })

    const whiteList = ['login']

    watch(
      () => route.fullPath,
      (to) => {
        if (whiteList.includes(route.name as string)) return
        state.activeKey = to
        // tabsViewMutations.addTabs(getSimpleRoute(route))
        store.commit('tabs-view/addTabs', getSimpleRoute(route))
      },
      { immediate: true }
    )

    const changeTab = (component) => {
      router.push({ path: component.props.name })
    }

    const removeTab = (targetName: string) => {
      console.log(targetName)
      if (tabsList.value.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！')
      }
      store.commit('tabs-view/closeCurrentTabs', targetName)

      // 如果关闭的是当前页
      if (state.activeKey === targetName) {
        const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)]
        state.activeKey = currentRoute.fullPath
        router.push(currentRoute)
      }
    }

    const openContextMenu = (e) => {
      console.log(e)
    }

    return {
      ...toRefs(state),
      tabsList,
      changeTab,
      removeTab,
      openContextMenu
    }
  }
})
</script>

<style lang="scss" scoped>
.el-tabs__header {
  margin: 0;
}
</style>
