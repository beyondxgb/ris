const url = require('url');
const chalk = require('chalk');
const address = require('address');

module.exports = (protocol, host, port) => {
  const formatUrl = hostname => url.format({
    protocol,
    hostname,
    port,
    pathname: '/',
  });
  const prettyPrintUrl = hostname => url.format({
    protocol,
    hostname,
    port: chalk.bold(port),
    pathname: '/',
  });

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  let prettyHost;
  let lanUrlForConfig;
  let lanUrlForTerminal;
  if (isUnspecifiedHost) {
    prettyHost = 'localhost';
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip();
      if (lanUrlForConfig) {
        lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig);
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host;
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost);
  const localUrlForBrowser = formatUrl(prettyHost);
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser,
  };
};
