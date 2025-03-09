const path = require('path');
const constant = require('./constant');
const getCssLoader = require('./util/getCssLoader');

module.exports = env => ({
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: constant.appSrc,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
              require.resolve('thread-loader'),
              {
                loader: require.resolve('babel-loader'),
                options: {
                  // babelrc: false,
                  // presets: [require.resolve('@ris/babel-preset-react')],
                  cacheDirectory: true,
                  compact: true,
                  highlightCode: true,
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: getCssLoader('less-loader', env),
          }, {
            test: /\.scss$/,
            use: getCssLoader('sass-loader', env),
          }, {
            test: /\.css$/,
            use: getCssLoader('css-loader', env),
          },
          {
            test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
            use: require.resolve('file-loader'),
          },
          {
            test: /\.(bmp|gif|png|jpe?g)$/i,
            loader: require.resolve('url-loader'),
            options: {
              limit: 1,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
  ],
  resolveLoader: {
    modules: [
      path.join(__dirname, '../../', 'node_modules'),
      'node_modules',
    ],
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    modules: [
      constant.appSrc,
      path.join(__dirname, '../../', 'node_modules'),
      'node_modules',
    ],
    alias: {
      '@babel/runtime': path.dirname(
        require.resolve('@babel/runtime/package.json'),
      ),
    },
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx', '.web.tsx', '.web.ts'],
  },
  target: 'web',
});
