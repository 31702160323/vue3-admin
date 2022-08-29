<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';

defineOptions({
  name: 'XTerminal'
});

const props = defineProps<{
  socket: WebSocket;
}>();

let term: Terminal;
const fitAddon = new FitAddon();
const attachAddon = new AttachAddon(props.socket);
const resize = (size) => {
  console.log(size);
  fitAddon.fit();
};

onMounted(() => {
  const terminalDom = document.getElementById('terminal');
  if (terminalDom) {
    term = new Terminal({
      cursorBlink: true,
      rendererType: 'canvas', //渲染类型
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontWeight: 400,
      fontSize: 14,
      // cols: Math.ceil(terminalDom.offsetWidth / 14),
      // rows: Math.ceil(terminalDom.offsetHeight / 17),
      theme: {
        background: '#002833',
        cursor: '#FF0'
      }
    });

    term.loadAddon(fitAddon);
    term.loadAddon(attachAddon);
    window.addEventListener('resize', resize);
    term.open(terminalDom);
    term.focus();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  term?.dispose();
});
</script>

<template>
  <div>
    <div id="terminal" class="w-full h-full"></div>
  </div>
</template>

<style scoped>
#terminal:deep(.xterm) {
  padding: 10px;
}
</style>
