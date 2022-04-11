<template>
  <el-container class="layout-container-demo">
    <el-aside width="auto">
      <el-scrollbar>
        <div @click="isCollapse = !isCollapse">标题</div>
        <el-menu :collapse="isCollapse" class="el-menu-vertical">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <message />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px; text-align: right">
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
      </el-header>

      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140"></el-table-column>
            <el-table-column prop="name" label="Name" width="120"></el-table-column>
            <el-table-column prop="address" label="Address"></el-table-column>
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Message, Setting } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'Home',
  components: { Message, Setting },
  setup() {
    const isCollapse = true

    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
    const tableData = Array(20).fill(item)

    return {
      isCollapse,
      tableData
    }
  }
})
</script>

<style lang="scss">
// .el-menu-vertical:not(.el-menu--collapse) {
//     width: 240px;
// }

.layout-container-demo {
  .el-header {
    position: relative;
    color: var(--el-text-color-primary);
    background-color: #b3c0d1;
  }

  .el-aside {
    color: var(--el-text-color-primary);
    background: #fff !important;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
  }

  .el-menu {
    border-right: none;
  }

  .el-main {
    padding: 0;
  }

  .toolbar {
    position: absolute;
    top: 50%;
    right: 20px;
    display: inline-flex;
    align-items: center;
    transform: translateY(-50%);
  }
}
</style>
