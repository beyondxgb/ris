const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { getRisrc } = require('@ris/utils');

const risrc = getRisrc();
const dllPlugin = risrc.dllPlugin || {};

function dependencyHandlers() {
  const dllPath = path.resolve(process.cwd(), dllPlugin.path || 'node_modules/ris-react-boilerplate-dlls');
  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(dllPath, 'risReactBoilerplateDeps.json');
    if (fs.existsSync(manifestPath)) {
      return [
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require(manifestPath),
        }),
      ];
    }
    return [];
  }

  const dllManifests = Object.keys(dllPlugin.dlls).map(name => path.join(dllPath, `/${name}.json`));
  const dllPlugins = [];
  dllManifests.map((manifestPath) => {
    if (fs.existsSync(manifestPath)) {
      dllPlugins.push(new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath),
      }));
    }
    return true;
  });
  return dllPlugins;
}

module.exports = () => {
  const plugins = [];
  if (dllPlugin) {
    const files = [];
    glob.sync(`${dllPlugin.path}/*.dll.js`).forEach((dllPath) => {
      files.push({
        filepath: path.join(process.cwd(), dllPath),
        includeSourcemap: false,
      });
    });
    if (files.length > 0) {
      plugins.push(new AddAssetHtmlPlugin(files));
    }
  }
  return plugins.concat(dependencyHandlers());
};
