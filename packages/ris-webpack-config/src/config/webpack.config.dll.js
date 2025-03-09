const { join } = require('path');
const defaults = require('lodash/defaultsDeep');
const webpack = require('webpack');
const { getRisrc } = require('@ris/utils');

const root = process.cwd();
const risrc = getRisrc();
const { dllPlugin } = require('./dll/config');

let dependencies;
try {
  // eslint-disable-next-line
  dependencies = require(join(root, 'package.json')).dependencies;
} catch (e) {
  dependencies = {};
}

const dllConfig = defaults(risrc.dllPlugin || {}, dllPlugin.defaults);
const outputPath = join(process.cwd(), dllConfig.path);

module.exports = {
  mode: 'development',
  context: process.cwd(),
  entry: dllConfig.dlls ? dllConfig.dlls : dllPlugin.entry(risrc, dependencies),
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json'),
    }),
  ],
  performance: {
    hints: false,
  },
};
