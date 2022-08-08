"use strict";

const { defineConfig } = require("@vue/cli-service");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");
const resolve = (...dir) => path.join(__dirname, ...dir);

module.exports = defineConfig({
  pluginOptions: {
    windicss: {
    },
  },
  chainWebpack: (config) => {
    // 配置相关loader，支持修改，添加和替换相关的loader
    config.resolve.alias.set("@", resolve("src"));
  },
  configureWebpack: config => {
    config.devtool = 'source-map';
    config.plugins.push(
      AutoImport({
        dts: './types/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
      })
    );
    config.plugins.push(
      Components({
        dts: './types/components.d.ts',
        resolvers: [ElementPlusResolver()],
      })
    );
    // config.plugins.push(
    //   new CopyPlugin({
    //     patterns: [
    //       { from: path.join(__dirname, 'src', 'static'), to: path.join(__dirname, 'dist', 'static') },
    //     ],
    //   }),
    // );
  }
});
