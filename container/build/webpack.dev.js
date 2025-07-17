// @ts-check
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const debug = !!process.env.npm_config_debug;

/** @type {*} */
module.exports = merge(baseConfig, {
  devtool: debug ? 'source-map' : 'eval-cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7999',
        pathRewrite: {},
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  target: 'web',
});
