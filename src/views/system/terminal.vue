<script lang="ts" setup>
import XTerminal from '@/components/XTerminal/index.vue';

defineOptions({
  name: 'Terminal'
});

const socket = new WebSocket(
  'ws://localhost:3000/exec/d0909b799681bd3a25c40f2763b5f00abaa20321860ffd6ed4c883a44e9eb1e9'
);

onUnmounted(() => {
  socket.close();
});
</script>

<template>
  <div>
    <XTerminal :socket="socket"></XTerminal>
  </div>
</template>
