# Mocking Data

Mock data is the key link in our front-end development process. We can simulate request data through the pre-agreed interface with the server-side. RIS use a light-weight mock tools called [@ris/mock](https://github.com/risjs/ris/tree/master/packages/ris-mock) to solve this problem.

> The following introduction is base on [standard](https://github.com/risjs/create-ris/tree/master/template/standard) scaffold.

## Usage

We agreed that config the api rule in `mock/rules.js`.

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

## Configuration

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