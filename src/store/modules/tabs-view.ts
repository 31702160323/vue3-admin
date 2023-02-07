import { useKeepAliveCache } from '@/hooks/useKeepAliveCache';

const { removeKeepAliveCache, resetKeepAliveCache } = useKeepAliveCache();

export default {
  namespaced: true,
  state: {
    tabsList: []
  },
  mutations: {
    init(state, routes) {
      // 初始化标签页
      state.tabsList = routes;
    },
    addTabs(state, route): boolean {
      // 添加标签页
      const isExists = state.tabsList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        resetKeepAliveCache(route.name);
        state.tabsList.push(route);
      }
      return true;
    },
    closeLeftTabs(state, fullPath) {
      // 关闭左侧
      const index = state.tabsList.findIndex((item) => item.fullPath == fullPath);
      state.tabsList.splice(0, index);
    },
    closeRightTabs(state, fullPath) {
      // 关闭右侧
      const index = state.tabsList.findIndex((item) => item.fullPath == fullPath);
      state.tabsList.splice(index + 1);
    },
    closeOtherTabs(state, fullPath) {
      // 关闭其他
      state.tabsList = state.tabsList.filter((item) => item.fullPath == fullPath);
    },
    closeCurrentTabs(state, fullPath) {
      // 关闭当前页
      const index = state.tabsList.findIndex((item) => {
        if (item.fullPath === fullPath) {
          removeKeepAliveCache(item.name);
          return true;
        }
        return false;
      });
      state.tabsList.splice(index, 1);
    },
    closeAllTabs(state) {
      // 关闭全部
      state.tabsList.length = 0;
    }
  },
  actions: {}
};
