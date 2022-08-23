<script lang="ts" setup>
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';

const term = new Terminal({
  cursorBlink: true
});
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
fitAddon.fit();
window.addEventListener('resize', () => fitAddon.fit());

term.onKey((e) => {
  console.log(e);
  if (e.domEvent.keyCode === 13) {
    term.writeln('');
    term.write(new Date().toTimeString());
  } else {
    term.write(e.key);
  }
});

onMounted(() => {
  const terminalDom = document.getElementById('terminal');
  if (terminalDom) {
    term.open(terminalDom);
    term.write(new Date().toTimeString());
    term.focus();
  }
});
</script>

<template>
  <div>
    <div id="terminal" class="w-full"></div>
  </div>
</template>
