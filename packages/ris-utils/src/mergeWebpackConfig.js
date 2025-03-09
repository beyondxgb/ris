const merge = require('webpack-merge');

module.exports = (clientConfig, defaultConfig) => {
  // Merge plugins
  // There is no problem if client add plugins
  // If client want to cover the plugins, we remove it from default plugins.
  const defaults = Object.assign({}, defaultConfig);
  const defaultPlugins = defaults.plugins || [];
  const clientPlugins = clientConfig.plugins || [];
  const clientPluginNames = clientPlugins.map(plugin => plugin.constructor.name);

  const validPlugins = [];
  defaultPlugins.forEach((item) => {
    const pluginName = item.constructor.name;
    if (clientPluginNames.indexOf(pluginName) === -1) {
      validPlugins.push(item);
    }
  });

  defaults.plugins = validPlugins;

  const config = merge({}, defaults, clientConfig);

  // Merge rules
  // We put all user's loaders into oneOf config
  // We ensure that user's loaders is in the front of our loaders
  const { rules } = config.module;
  const newRules = [];
  const loaders = [];
  rules.forEach((item) => {
    if (item.test && (item.loader || item.use)) {
      loaders.push(item);
    } else {
      newRules.push(item);
    }
  });
  newRules.forEach((item) => {
    if (item.oneOf) {
      for (let i = loaders.length - 1; i >= 0; i -= 1) {
        item.oneOf.unshift(loaders[i]);
      }
    }
  });
  config.module.rules = newRules;

  return config;
};
