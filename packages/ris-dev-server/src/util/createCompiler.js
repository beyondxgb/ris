const chalk = require('chalk');
const path = require('path');
const _ = require('lodash');
const { webpack } = require('@ris/webpack-config');

function injectHMR(entry) {
  let entries = entry;
  if (typeof entries === 'string') {
    entries = [entries];
  }
  const hotScripts = [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
  ];
  if (_.isPlainObject(entries)) {
    Object.keys(entries).forEach((key) => {
      let value = entries[key];
      if (!Array.isArray(value)) {
        if (typeof value === 'string') {
          value = [value];
        } else {
          value = [];
        }
      }
      entries[key] = value.concat(hotScripts);
    });
  } else if (Array.isArray(entries)) {
    entries = hotScripts.concat(entries);
  }
  return entries;
}

module.exports = (options) => {
  const {
    webpackConfig,
    onCompileDone,
    onCompileInvalid,
  } = options;
  // add hot scripts
  const entry = injectHMR(webpackConfig.entry || '');
  // add modules resolve in current node_modules
  webpackConfig.resolve.modules.push(path.resolve(__dirname, '../../node_modules'));
  webpackConfig.entry = entry;
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }
  compiler.apply(new webpack.ProgressPlugin());
  compiler.plugin('done', onCompileDone);
  compiler.plugin('invalid', onCompileInvalid);
  return compiler;
};
