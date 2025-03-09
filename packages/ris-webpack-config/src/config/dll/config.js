const { pullAll, uniq } = require('lodash');

const DllConfig = {

  /**
   * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
   * by caching the module metadata for all of our npm dependencies. We enable it by default
   * in development.
   *
   *
   * To disable the DLL Plugin, set this value to false.
   */
  dllPlugin: {
    defaults: {
      /**
       * we need to exclude dependencies which are not intended for the browser
       * by listing them here.
       */
      exclude: [
        'sanitize.css',
      ],

      /**
       * Specify any additional dependencies here. We include core-js and lodash
       * since a lot of our dependencies depend on them and they get picked up by webpack.
       */
      include: [],

      // The path where the DLL manifest and bundle will get built
      path: 'node_modules/ris-react-boilerplate-dlls',
    },

    entry(risRc, dependencies) {
      const dependencyNames = Object.keys(dependencies);
      let customExclude = null;
      let customInclude = null;
      if (risRc.dllPlugin) {
        customExclude = risRc.dllPlugin.exclude;
        customInclude = risRc.dllPlugin.include;
      }
      const exclude = customExclude || DllConfig.dllPlugin.defaults.exclude;
      const include = customInclude || DllConfig.dllPlugin.defaults.include;
      const includeDependencies = uniq(dependencyNames.concat(include));

      return {
        risReactBoilerplateDeps: pullAll(includeDependencies, exclude),
      };
    },
  },
};

module.exports = DllConfig;
