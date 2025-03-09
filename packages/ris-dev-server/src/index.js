const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const { merge } = require('@ris/utils');
const createCompiler = require('./util/createCompiler');
const choosePort = require('./util/choosePort');
const prepareUrls = require('./util/prepareUrls');
const serverDefaultConfig = require('./config');

const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = 3000;

// Hide webpack deprecation warning
process.noDeprecation = true;

function onCompileDone(urls, options) {
  setTimeout(() => {
    console.log();
    console.log([
      '  App running at:',
      `  - ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`,
      `  - ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`,
    ].join('\n'));
    if (options.onCompileDone) {
      options.onCompileDone();
    }
  }, 0);
}

function onCompileInvalid(options) {
  // onCompileInvalid
  if (options.onCompileInvalid) {
    options.onCompileInvalid();
  }
}

module.exports = async (options) => {
  const {
    webpackConfig,
    serverConfig,
  } = options;

  // Merge config(default、user、client)
  const devServerConfig = merge(serverDefaultConfig, serverConfig, {
    publicPath: webpackConfig.output.publicPath || serverConfig.publicPath,
  });

  // Choose an available port
  const port = await choosePort(HOST, devServerConfig.port || DEFAULT_PORT);
  if (port == null) {
    // We have not found a port.
    return;
  }

  const protocol = devServerConfig.https ? 'https' : 'http';
  const urls = prepareUrls(protocol, HOST, port);

  const compiler = createCompiler({
    webpackConfig,
    onCompileDone: onCompileDone.bind(this, urls, options),
    onCompileInvalid: onCompileInvalid.bind(this, options),
  });

  // Create a dev server
  const devServer = new WebpackDevServer(compiler, devServerConfig);

  devServer.listen(port, HOST, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
