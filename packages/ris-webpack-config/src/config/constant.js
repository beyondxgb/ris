const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appSrc: resolveApp('src'),
  appBuild: resolveApp(process.env.BUILD_DEST || 'build'),
  appEntry: resolveApp('src/index.js'),
  appEntryHtml: resolveApp('src/index.html'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
};
