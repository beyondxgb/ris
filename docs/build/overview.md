# Overview

All build configuration is in the `tools` folder. If current build configuration is not fit you, you can customize your build configuration as you like.

`tools` folder current have four part, `risrc.js`, `webpack`, `server`, `generators`.

## risrc.js

`risrc.js` is the global config.

```js
module.exports = {
  dll: true,
  dllPlugin: {
    path: 'node_modules/ris-react-boilerplate-dlls',
    exclude: [],
    include: [],
    dlls: null,
  },
  bugfree: false,
  styleLoaderOptions: {},
  cssLoaderOptions: {},
  lessLoaderOptions: {},
  sassLoaderOptions: {},
  postCSSLoaderOptions: {},
};
```

## webpack
`webpack` folder have three configuration files, `base.js`, `dev.js` and `prod.js`.

`base.js`
```js
const path = require('path');

const resolveApp = relativePath => path.join(process.cwd(), relativePath);

module.exports = {
  entry: resolveApp('src/index.js'),
  module: {
    rules: [],
  },
  resolve: {
    alias: {
      assets: resolveApp('src/assets'),
      utils: resolveApp('src/utils'),
      components: resolveApp('src/components'),
      pages: resolveApp('src/pages'),
      store: resolveApp('src/store'),
      core: resolveApp('src/core'),
      services: resolveApp('src/services'),
    },
  },
  plugins: [],
};
```

The format of these configuration files is the same as webpack [configuration](https://webpack.js.org/configuration/). 

These configurations will be merge to built-in configuration that use `webpack-merge` finally.

For example, `development` configuration will be merge like this:

```js
merge([built-in config], merge(base.js, dev.js));
```

And `production` will be merge like this:

```js
merge([built-in config], merge(base.js, prod.js));
```

## server
`server` folder is the configuration file for the `webpack-dev-server`. The format of configuration file is the same as webpack-dev-server [configuration](https://webpack.js.org/configuration/dev-server/#devserver). You can configure it as you like.
```js
const mock = require('@ris/mock');

module.exports = {
  port: 3000,
  compress: true,
  quiet: false,
  clientLogLevel: 'none',
  disableHostCheck: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  after: (app) => {
    // Start mock data
    mock(app);
  },
  proxy: {
    // Proxy api request to the remote server
  },
};
```
## generators

This folder is the generator for pages and components. We use a micro-generator called [plop](https://www.npmjs.com/package/plop) to auto create component and pages quickly.

You can change the template of component and page as you like.

