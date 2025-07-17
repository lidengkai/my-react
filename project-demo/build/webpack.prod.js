// @ts-check
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const gzip = true;
const sourceMap = false;
const report = !!process.env.npm_config_report;

/** @type {*} */
module.exports = merge(baseConfig, {
  ...(sourceMap ? { devtool: 'source-map' } : {}),
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    report && new BundleAnalyzerPlugin(),
    gzip && new CompressionPlugin(),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true,
          compress: {
            drop_console: true,
            ecma: 5,
            comparisons: false,
            inline: 2,
          },
          parse: {
            ecma: 5,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
});
