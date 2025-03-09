const path = require('path');
const fs = require('fs');

module.exports = () => {
  const basePath = path.join(process.cwd(), 'tools/webpack/base.js');
  const devPath = path.join(process.cwd(), 'tools/webpack/dev.js');
  const prodPath = path.join(process.cwd(), 'tools/webpack/prod.js');
  let baseConfig = {};
  let devConfig = {};
  let prodConfig = {};
  if (fs.existsSync(basePath)) {
    try {
      baseConfig = require(basePath);
    } catch (e) {
      console.log(e);
      process.exit(0);
    }
  }
  if (fs.existsSync(devPath)) {
    try {
      devConfig = require(devPath);
    } catch (e) {
      console.log(e);
      process.exit(0);
    }
  }
  if (fs.existsSync(prodPath)) {
    try {
      prodConfig = require(prodPath);
    } catch (e) {
      console.log(e);
      process.exit(0);
    }
  }
  return {
    base: baseConfig,
    dev: devConfig,
    prod: prodConfig,
  };
};
