// @ts-check
const path = require('path');
const webpack = require('webpack');
const {
  CONTEXT,
  mode,
  name,
  version,
  isDev,
  env,
  apiList,
} = require('./config');
const packageJson = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {*} */
module.exports = {
  mode,
  entry: {
    app: path.join(CONTEXT, 'src/bootstrap.ts'),
  },
  output: {
    path: path.join(CONTEXT, 'dist'),
    filename: isDev ? 'public/js/[name].js' : 'public/js/[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.join(CONTEXT, 'src'),
      lodash: 'lodash-es',
      '@components/common': 'my-components-react-common/src',
      '@components/hooks': 'my-components-react-hooks/src',
      '@components/components': 'my-components-react-web/src',
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?|mjs)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev
                  ? '[path][name]__[local]'
                  : '[hash:base64:8]',
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              additionalData: `@webpack-env: '${env}';`,
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        use: 'underscore-template-loader',
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024,
          },
        },
        generator: {
          filename: 'public/images/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset/resource',
        generator: {
          filename: 'public/medias/[name]-[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: 'public/css/[name].[chunkhash].css',
        ignoreOrder: true,
      }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'ejs/index.ejs',
      // favicon: 'favicon.ico',
      scriptLoading: 'blocking',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new webpack.DefinePlugin({
      $APP_NAME: JSON.stringify(name),
      $APP_VERSION: JSON.stringify(version),
      $APP_MODE: JSON.stringify(mode),
      $APP_ENV: JSON.stringify(env),
      APP_API: JSON.stringify(apiList[env]),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(CONTEXT, 'static'),
          to: 'static',
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'demo',
      filename: 'remoteEntry.js',
      exposes: {
        '.': path.join(CONTEXT, 'src/exposes/index.tsx'),
      },
      shared: {
        react: {
          requiredVersion: packageJson.dependencies.react,
          eager: true,
        },
        'react-router-dom': {
          requiredVersion: packageJson.dependencies['react-router-dom'],
          eager: true,
        },
      },
    }),
    new webpack.container.ModuleFederationPlugin({
      remotes: {
        '@container': isDev
          ? 'container@http://127.0.0.1:8000/remoteEntry.js'
          : 'container@../remoteEntry.js',
      },
      shared: {
        react: {
          requiredVersion: packageJson.dependencies.react,
          eager: true,
        },
        'react-router-dom': {
          requiredVersion: packageJson.dependencies['react-router-dom'],
          eager: true,
        },
      },
    }),
  ].filter(Boolean),
  stats: {
    entrypoints: false,
    children: false,
  },
  performance: {
    hints: false,
  },
};
