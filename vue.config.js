"use strict";

const { defineConfig } = require("@vue/cli-service");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DefineOptions = require('unplugin-vue-define-options/webpack')
// const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");
const resolve = (...dir) => path.join(__dirname, ...dir);

module.exports = defineConfig({
  publicPath: './',
  pluginOptions: {
    windicss: {
    },
  },
  parallel: false,
  chainWebpack: (config) => {
    // 配置相关loader，支持修改，添加和替换相关的loader
    config.resolve.alias.set("@", resolve("src"));

    config.resolve.extensions.add(...['.js', '.vue', '.json', '.ts', '.tsx']);

    // 优化二次启动速度
    config.mode('production');
    config.cache({
      // 将缓存类型设置为文件系统,默认是memory
      type: 'filesystem',
      buildDependencies: {
        // 更改配置文件时，重新缓存
        config: [__filename]
      }
    });
    config.watchOptions({
      ignored: /node_modules/
    });

    if (process.env.ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.warnings = false;
        args[0].terserOptions.compress['drop_console'] = true;
        args[0].terserOptions.compress['drop_debugger'] = true;
        args[0].terserOptions.compress['pure_funcs'] = ['console.log', 'console.debug'];
        return args;
      });
    }
  },
  configureWebpack: config => {
    config.devtool = 'source-map';
    config.plugins.push(
      DefineOptions(),
      AutoImport({
        dts: './types/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
        imports: ['vue'],
        eslintrc: {
          enabled: true // <-- this
        }
      }),
      Components({
        dts: './types/components.d.ts',
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver()]
      })
    );

    if (process.env.ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配文件名
          threshold: 10240, // 对10K以上的数据进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false // 是否删除源文件,删除的话不会有js文件，都是gz文件
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: 'static', // 不启动展示打包报告的http服务器
          generateStatsFile: false // 是否生成stats.json文件
        })
      );
    }

    // config.plugins.push(
    //   new CopyPlugin({
    //     patterns: [
    //       { from: path.join(__dirname, 'src', 'static'), to: path.join(__dirname, 'dist', 'static') },
    //     ],
    //   }),
    // );
  }
});
