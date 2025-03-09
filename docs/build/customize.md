# Customizing Webpack And Server Config

RIS only provide a basic build solution and it does not cover all scenarios. But it prodvide a way that you can extend the build configuration flexibly.

## Webpack
In the `tools/webpack` folder, it have three configuration files, `base.js`, `dev.js` and `prod.js`. You can extend it as you need.

The format of these configuration files is the same as webpack [configuration](https://webpack.js.org/configuration/). 

For example, the `base.js` is like this:

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

These configurations will be merge to built-in configuration that use `webpack-merge` finally.

For example, `development` configuration will be merge like this:

```js
merge([built-in config], merge(base.js, dev.js));
```

And `production` will be merge like this:

```js
merge([built-in config], merge(base.js, prod.js));
```

The following shows how to extend the config:

### basic
For example, we change the output option.

`base.js`
```js
const path = require('path');

const resolveApp = relativePath => path.join(process.cwd(), relativePath);

module.exports = {
  entry: resolveApp('src/index.js'),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: resolveApp('build'),
    publicPath: '',
  },
}
```

### loders

For example, we want to import `html` file, but default configuration is not include `html-loader`, you can add `html-laoder` in rules option.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      }
    ]
  },
};
```
Of course, you should install `html-loader` to the dependencies.

```bash
npm install html-loader --save-dev
```

What if the default configuration doesn't fit for me？You can cover it directly. It will give priority to the use of your loader.

For example, the default loader option for `image` is `/\.(bmp|gif|png|jpe?g)$/i：url-loader`. But you want to use another loader. You can in configure it in rules option.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(bmp|gif|png|jpg)$/i,
        loader: 'my-loader',
      }
    ]
  },
  plugins: [
  ],
};
```

### plugins
Configure the plugins is similar to the loaders, you can add your plugins directly.

```js
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify("http://dev.example.com")
    })
  ],
};
```

## Server

In the `tools/server` folder, it is the configuration file for the `webpack-dev-server`. The format of configuration file is the same as webpack-dev-server [configuration](https://webpack.js.org/configuration/dev-server/#devserver). You can configure it as you like.

For example, you want to change the default server port, you can change the `port` option.

`tools/server/index.js`

```js
module.exports = {
  port: 8000,
};
```

