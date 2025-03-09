const webpack = require('webpack');
const webpackConfigBase = require('./config/webpack.config.base');
const webpackConfigDev = require('./config/webpack.config.dev');
const getDllPlugins = require('./config/util/getDllPlugins');
const webpackConfigProd = require('./config/webpack.config.prod');
const webpackConfigDll = require('./config/webpack.config.dll');
const dllConfig = require('./config/dll/config');

module.exports = {
  webpack,
  webpackConfigBase: webpackConfigBase(),
  webpackConfigDev,
  webpackConfigProd,
  webpackConfigDll,
  dllConfig,
  getDllPlugins,
};
