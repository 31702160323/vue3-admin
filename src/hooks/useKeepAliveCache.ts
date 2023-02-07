import { ref } from 'vue';
import type { RouteRecordName } from 'vue-router';

export const excludes = ref<string[]>([]);

export function useKeepAliveCache() {
  const removeKeepAliveCache = function (name?: RouteRecordName) {
    if (name) {
      excludes.value.push(name as string);
    }
  };
  const resetKeepAliveCache = function (name?: RouteRecordName) {
    if (name) {
      excludes.value = excludes.value.filter((item) => item !== name);
    }
  };
  return {
    removeKeepAliveCache,
    resetKeepAliveCache
  };
}
