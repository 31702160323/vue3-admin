import { ref } from 'vue';

export const excludes = ref<string[]>([]);

export function useKeepAliveCache() {
  const removeKeepAliveCache = function (name?: string) {
    if (name) {
      excludes.value.push(name);
    }
    console.log(excludes.value, 'remove');
  };
  const resetKeepAliveCache = function (name?: string) {
    if (name) {
      excludes.value = excludes.value.filter((item) => item !== name);
    }
    console.log(excludes.value, 'reset');
  };
  return {
    removeKeepAliveCache,
    resetKeepAliveCache
  };
}
