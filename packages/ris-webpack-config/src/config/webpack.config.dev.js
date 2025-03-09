const webpack = require('webpack');
const fs = require('fs');
const { merge } = require('@ris/utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const webpackBaseConfig = require('./webpack.config.base');
const constant = require('./constant');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new CaseSensitivePathsPlugin(),
];

if (fs.existsSync(constant.appEntryHtml)) {
  plugins.push(new HtmlWebpackPlugin({
    inject: true,
    template: constant.appEntryHtml,
  }));
}
module.exports = merge({
  mode: 'development',
  entry: constant.appEntry,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: constant.appBuild,
    publicPath: '/',
  },
  plugins,
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
}, webpackBaseConfig('development'));
