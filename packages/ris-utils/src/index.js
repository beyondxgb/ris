const merge = require('webpack-merge');
const getRisrc = require('./getRisrc');
const clean = require('./clean');
const injectBabelrc = require('./injectBabelrc');
const mergeWebpackConfig = require('./mergeWebpackConfig');
const getNpms = require('./getNpms');
const checkmark = require('./checkmark');
const progress = require('./progress');
const getUserServerConfig = require('./getUserServerConfig');
const getUserWebpackConfig = require('./getUserWebpackConfig');

module.exports = {
  getRisrc,
  clean,
  injectBabelrc,
  mergeWebpackConfig,
  getNpms,
  checkmark,
  progress,
  merge,
  getUserServerConfig,
  getUserWebpackConfig,
};
