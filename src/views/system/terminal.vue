<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import XTerminal from '@/components/XTerminal/index.vue';
import { useKeepAliveCache } from '@/hooks/useKeepAliveCache';

const { removeKeepAliveCache, resetKeepAliveCache } = useKeepAliveCache();

defineOptions({
  name: 'Terminal'
});

const socket = new WebSocket(
  'ws://localhost:3000/exec/d0909b799681bd3a25c40f2763b5f00abaa20321860ffd6ed4c883a44e9eb1e9'
);

const instance = getCurrentInstance();
onBeforeRouteLeave((to) => {
  console.log(String(to.name));
  if (['Terminal'].includes(String(to.name))) {
    removeKeepAliveCache(instance);
  } else {
    resetKeepAliveCache(instance);
  }
});

onUnmounted(() => {
  console.log('onUnmounted');
  socket.close();
});
</script>

<template>
  <div>
    <XTerminal :socket="socket"></XTerminal>
  </div>
</template>
