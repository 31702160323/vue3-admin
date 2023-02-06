<template>
  <router-view v-slot="{ Component }">
    <transition name="zoom-fade" mode="out-in" appear>
      <keep-alive :include="keepAliveComponents" :exclude="excludes" :max="10">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { excludes } from '@/hooks/useKeepAliveCache';

export default defineComponent({
  name: 'router-transition',
  props: {
    notNeedKey: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    // 需要缓存的路由组件
    const keepAliveComponents = reactive<string[]>([]);

    // 获取需要缓存的组件
    onBeforeRouteUpdate((to, from) => {
      console.log(excludes);

      const currentComName = from.matched.find((item) => item.name == from.name)?.components
        ?.default.name;
      if (currentComName && !keepAliveComponents.includes(currentComName) && from.meta?.keepAlive) {
        // 需要缓存的组件
        keepAliveComponents.push(currentComName);
      } else if (!from.meta?.keepAlive || to.name == 'Redirect') {
        // 不需要缓存的组件
        const index = keepAliveComponents.findIndex((name) => name == currentComName);
        if (index != -1) {
          keepAliveComponents.splice(index, 1);
        }
      }
    });

    return {
      excludes,
      keepAliveComponents
    };
  }
});
</script>

<style scoped>
/* router view transition */
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: transform 0.35s, opacity 0.28s ease-in-out;
}

.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(0.97);
}

.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(1.03);
}
</style>
