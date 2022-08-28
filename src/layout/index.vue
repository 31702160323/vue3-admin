<template>
  <el-container>
    <el-aside width="auto">
      <el-scrollbar>
        <Logo v-model="isCollapse"></Logo>
        <AsideMenu :collapsed="isCollapse"></AsideMenu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <el-row class="w-full h-[48px]">
          <el-col :span="24">
            <PageHeader></PageHeader>
          </el-col>
        </el-row>
        <el-row class="w-full h-[48px]">
          <el-col :span="24">
            <TabsView></TabsView>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <RouterTransition />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import Logo from './components/logo.vue';
import AsideMenu from './components/menu.vue';
import PageHeader from './components/header.vue';
import TabsView from './components/tabs.vue';
import RouterTransition from '@/components/router-transition/router-transition.vue';

export default defineComponent({
  name: 'Home',
  components: { Logo, AsideMenu, PageHeader, TabsView, RouterTransition },
  setup() {
    const state = reactive({
      isCollapse: true
    });

    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="scss" scoped>
.el-header {
  position: relative;
  width: 100%;
  height: 96px;
  padding: 0;
  overflow: hidden;
  color: var(--el-text-color-primary);
  background-color: #b3c0d1;
}

.el-aside {
  color: var(--el-text-color-primary);
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
  transition: width 0.2s;
}

.el-main {
  min-height: calc(100vh - 100px);
  padding: 0;
  background-color: #f0f2f5;
}
</style>
