# Adding Ant Design

Ant Design is a very good react component libray. Following introduce how to add it into our application and some useful skills.

## Add dependency

```bash
npm install --save antd
```

## Code split

If you want to load the components dynamically, you can use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import).

Install `babel-plugin-import`

```bash
npm install --save-dev babel-plugin-import
```

Configure the plugins in `.babelrc`

```json
{
  "presets": ["@ris/babel-preset-react"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "style": true
      },
      "antd"
    ]
  ]
}
```

## Customize theme

To cutomize the theme of the component, you can configure the `lessLoaderOptions` in `tools/risrc.js`.

```js
const theme = {
  'primary-color': 'red',
};

module.exports = {
  dll: true,
  dllPlugin: {
    path: 'node_modules/ris-react-boilerplate-dlls',
    exclude: [],
    include: [],
    dlls: null,
  },
  lessLoaderOptions: {
    modifyVars: theme,
    javascriptEnabled: true,
  },
};
```

