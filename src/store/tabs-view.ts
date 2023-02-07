import { useKeepAliveCache } from '@/hooks/useKeepAliveCache';

const { removeKeepAliveCache, resetKeepAliveCache } = useKeepAliveCache();
import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useTabsViewStore = defineStore('tabsView', () => {
  const tabsList = reactive<SimpleRoute[]>([]);

  function init(routes: SimpleRoute[]) {
    // 初始化标签页
    closeAllTabs();
    tabsList.push(...routes);
  }

  function addTabs(route: SimpleRoute): boolean {
    // 添加标签页
    const isExists = tabsList.some((item) => item.fullPath == route.fullPath);
    if (!isExists) {
      resetKeepAliveCache(route.name);
      tabsList.push(route);
    }
    return true;
  }

  function closeLeftTabs(fullPath) {
    // 关闭左侧
    const index = tabsList.findIndex((item) => item.fullPath == fullPath);
    tabsList.splice(0, index);
  }

  function closeRightTabs(fullPath) {
    // 关闭右侧
    const index = tabsList.findIndex((item) => item.fullPath == fullPath);
    tabsList.splice(index + 1);
  }

  function closeOtherTabs(fullPath) {
    // 关闭其他
    closeAllTabs();
    tabsList.push(...tabsList.filter((item) => item.fullPath == fullPath));
  }

  function closeCurrentTabs(fullPath) {
    // 关闭当前页
    const index = tabsList.findIndex((item) => {
      if (item.fullPath === fullPath) {
        removeKeepAliveCache(item.name);
        return true;
      }
      return false;
    });
    tabsList.splice(index, 1);
  }

  function closeAllTabs() {
    // 关闭全部
    tabsList.length = 0;
  }

  return {
    tabsList,
    init,
    addTabs,
    closeLeftTabs,
    closeRightTabs,
    closeOtherTabs,
    closeCurrentTabs,
    closeAllTabs
  };
});
