const fs = require('fs');
const { merge } = require('@ris/utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getRisrc } = require('@ris/utils');
const webpackBaseConfig = require('./webpack.config.base');
const constant = require('./constant');

const risrc = getRisrc();

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// Specify the cdn path
const cdnPath = process.env.CDN_PATH;

const plugins = [
  new MiniCssExtractPlugin(Object.assign({
    filename: '[name].css',
    chunkFilename: '[name].[contenthash:8].chunk.css',
  }, risrc.cssExtractPluginOptions || {})),
];

if (fs.existsSync(constant.appEntryHtml)) {
  plugins.push(new HtmlWebpackPlugin({
    template: constant.appEntryHtml,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
  }));
}

module.exports = merge({
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  entry: constant.appEntry,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    path: constant.appBuild,
    publicPath: cdnPath || '/',
  },
  plugins,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
            drop_console: true,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
        },
      }),
    ],
  },
  performance: {
    // Only show performance hints on JS files
    assetFilter: name => name.endsWith('.js'),
    maxAssetSize: 2 * 1024 * 1024, // 2MB
    maxEntrypointSize: 4 * 1024 * 1024, // 4MB
  },
}, webpackBaseConfig('production'));
