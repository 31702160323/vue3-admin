import type { App } from 'vue';

export default {
  init: function (app: App, plugins: Array<string>) {
    const files = require.context('./modules', false, /\.ts$/);

    files.keys().forEach((key) => {
      if (plugins.includes(key.slice(2, -3))) {
        files(key).init(app);
      }
    });
  }
};
