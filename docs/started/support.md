# Spported Browsers And Features

## Supported Browsers
By default, the generated project supports all modern browsers. Compatible with IE9, base on [@ris/babel-preset-react](https://github.com/risjs/ris/tree/master/packages/ris-preset-react).

## Supported Language Features
* [@babel/preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html), compatible with IE9
* [@babel/preset-react](https://babeljs.io/docs/en/next/babel-preset-react),
* [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)
* [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
* [@babel/plugin-proposal-object-rest-spread](https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread)
* [@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)


`@ris/babel-preset-react`

```js
module.exports = () => (
  {
    presets: [
      [require.resolve('@babel/preset-env'), {
        targets: {
          ie: 9,
        },
        modules: false,
      }],
      require.resolve('@babel/preset-react'),
    ],
    plugins: [
      [require.resolve('@babel/plugin-transform-runtime')],
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
    ],
  }
);
```

