import { ref } from 'vue';
import type { ComponentInternalInstance } from 'vue';

export const excludes = ref<string[]>([]);

export function useKeepAliveCache() {
  const removeKeepAliveCache = function (instance: ComponentInternalInstance | null) {
    if (instance && instance.type.name) {
      excludes.value.push(instance.type.name);
    }
    console.log(excludes.value, 'remove');
  };
  const resetKeepAliveCache = function (instance: ComponentInternalInstance | null) {
    if (instance) {
      excludes.value = excludes.value.filter((item) => item !== instance.type.name);
    }
    console.log(excludes.value, 'reset');
  };
  return {
    removeKeepAliveCache,
    resetKeepAliveCache
  };
}
