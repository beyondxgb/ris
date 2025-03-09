# @ris/dev-server

Dev Server for [RIS](https://github.com/risjs/ris). Base on [webpack-dev-server](https://github.com/webpack/webpack-dev-server).

## Usage

```bash
npm install --save-dev @ris/dev-server
```

```js
const risDevServer = require('@ris/dev-server');

risDevServer(options)
```

`options` is a plain object that contain:

* `webpackConfig`: webpack [configuration](https://webpack.js.org/configuration/)
* `serverConfig`: webpack server [configuration](https://webpack.js.org/configuration/dev-server/)
* `onCompileDone`: server compile done hook.
* `onCompileInvalid`: server compile invalid hook.


## Example

```js
const risDevServer = require('@ris/dev-server');

const webpackConfig = {
  entry: 'src/index.js',
};

const serverConfig = {
  port: 3000,
  compress: true,
  quiet: false,
  clientLogLevel: 'none',
  disableHostCheck: true,
};

risDevServer({
  webpackConfig,
  serverConfig,
  onCompileDone: () => {
    console.log('server is start and compile success!');
  },
});
```

