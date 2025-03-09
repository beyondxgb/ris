# @ris/mock

[![npm version](https://img.shields.io/npm/v/@ris/mock.svg?colorB=007ec6&style=flat-square)](https://www.npmjs.com/package/@ris/mock)
[![npm downloads](https://img.shields.io/npm/dm/@ris/mock.svg?style=flat-square)](https://www.npmjs.com/package/@ris/mock)

A light-weight mock tools for webpack server or standard express server.

## Getting Started

```
npm install @ris/mock --save-dev
```

In the `webpack.config.js`, we inject `@ris/mock` as a middleware in the `after` option.

```js
const mock = require('@ris/mock');

module.exports = {
  //...
  devServer: {
    compress: true,
    port: 9000,
    after: (app) => {
      // Start mock data
      mock(app);
    },
  }
};
```

In our project root folder, we create `mock` folder and `mock/rules.js` file.

`mock/rules.js` will like this:

```js

module.exports = {
  'GET /api/user': { name: 'beyondxgb' },
  'POST /api/form/create': { success: true },
  'GET /api/cases/list': (req, res) => { res.end(JSON.stringify([{ id: 1, name: 'demo' }])); },
  'GET /api/user/list': 'user/list.json',
  'GET /api/user/create': 'user/create.js',
};
```

When then browser send a request, for example, `GET /api/user`, if the rules you config in the `mock/rules.js` is matched, then it will directly response the data you config.

In the above rules, when browser send a request `GET /api/user`, then the server will response `{ name: 'beyondxgb' }` to the client.

## Config

`mock/rules.js` return a plain object. In the object, it is a `key/value` format.

```js
module.exports = {
  'GET /api/user': { name: 'beyondxgb' },
};
```

* `key`: it will like [**method**] [**api**]
* `value`: it can be **string**/**object**/**function**/**file**
  * **string/object**: 

  Directly config the response data.
  ```js
  module.exports = {
    'GET /api/user': 'beyondxgb',
    'GET /api/user': { name: 'beyondxgb' },
  }
  ```
  * **function**:

  You can control the response data flexibility through `req/res`.
  ```js
  module.exports = {
    'GET /api/user':  (req, res) => { res.end('beyondxgb'); }
  }
  ```

  * **file**:

  You can split the response data to file, only support `.js` and `.json`.
  
  ```js
  module.exports = {
    'GET /api/user':  'user/info.json'
    'GET /api/user/create':  'user/create.js'
  }
  ```

  Then you should create file `mock/user/info.json` and `mock/user/create.js`:

  `mock/user/info.json`:
  ```json
  {
    "name": "beyondxgb"
  }
  ```

  `mock/user/create.js`:
  ```js
  module.exports = (req, res) => {
    res.end('ok');
  };
  ```









