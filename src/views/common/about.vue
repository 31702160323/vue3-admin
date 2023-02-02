<script lang="ts" setup>
// import { EditorView, ViewUpdate, keymap, lineNumbers } from '@codemirror/view';
// import { EditorState, Compartment } from '@codemirror/state';
// import { css } from '@codemirror/lang-css';
// // import { sql } from '@codemirror/lang-sql';
// // import { EXAMPLE } from './index.js';
// import { autocompletion } from '@codemirror/autocomplete';
// import { oneDarkTheme, oneDarkHighlightStyle } from '@codemirror/theme-one-dark';
// import { syntaxHighlighting } from '@codemirror/language';
// import { history, historyKeymap, defaultKeymap } from '@codemirror/commands';

// const code = ref('');
// const textareaRef = ref();

// onMounted(() => {
//   const editor = new EditorView({
//     state: EditorState.create({
//       doc: code.value,
//       extensions: [
//         css(),
//         // EXAMPLE(),
//         // sql(),
//         history(),
//         keymap.of([...historyKeymap, ...defaultKeymap]),
//         oneDarkTheme,
//         syntaxHighlighting(oneDarkHighlightStyle),
//         lineNumbers(),
//         autocompletion({ activateOnTyping: true }),
//         new Compartment().of(EditorState.tabSize.of(2)),
//         EditorView.editable.of(true),
//         // 新版本一切皆插件，所以实时侦听数据变化也要通过写插件实现
//         EditorView.updateListener.of((_v: ViewUpdate) => {
//           // console.log(v.state.doc.toString());
//         })
//       ]
//     }),
//     parent: textareaRef.value as HTMLDivElement
//   });

//   console.log(editor);
// });
</script>

<template>
  <div class="about">
    <div ref="textareaRef"></div>
  </div>
</template>

<style scoped>
.about {
  width: 100%;
  height: 600px;
}

.about :deep(.cm-editor) {
  height: 300px;
  font-size: 18px;
}
</style>
