const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getRisrc } = require('@ris/utils');

const risrc = getRisrc();

const defaultPostCssLoaderOptions = {
  // Necessary for external CSS imports to work
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
};

const defaultStyleLoaderOptions = {
  insertAt: 'top',
};
const defaultCssLoaderOptions = {
  sourceMap: false,
};
const defaultLessLoaderOptions = {
  javascriptEnabled: true,
};
const defaultSassLoaderOptions = {
  javascriptEnabled: true,
};

const {
  styleLoaderOptions,
  cssLoaderOptions,
  lessLoaderOptions,
  sassLoaderOptions,
  postCSSLoaderOptions,
} = risrc;

// merge user loader options
function getLoaderOptions(cssType) {
  if (cssType === 'style-loader') {
    if (styleLoaderOptions) {
      return Object.assign(defaultStyleLoaderOptions, styleLoaderOptions);
    }
    return defaultStyleLoaderOptions;
  }
  if (cssType === 'css-loader') {
    if (cssLoaderOptions) {
      return Object.assign(defaultCssLoaderOptions, cssLoaderOptions);
    }
    return defaultCssLoaderOptions;
  }
  if (cssType === 'less-loader') {
    if (lessLoaderOptions) {
      return Object.assign(defaultLessLoaderOptions, lessLoaderOptions);
    }
    return defaultLessLoaderOptions;
  }
  if (cssType === 'sass-loader') {
    if (sassLoaderOptions) {
      return Object.assign(defaultSassLoaderOptions, sassLoaderOptions);
    }
    return defaultSassLoaderOptions;
  }
  if (cssType === 'postcss-loader') {
    return postCSSLoaderOptions || defaultPostCssLoaderOptions;
  }
  return {};
}

// styleloader
const styleloader = {
  loader: require.resolve('style-loader'),
  options: getLoaderOptions('style-loader'),
};
// cssloader
const cssLoader = {
  loader: require.resolve('css-loader'),
  options: getLoaderOptions('css-loader'),
};
// postcssLoader
const postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: getLoaderOptions('postcss-loader'),
};

module.exports = (cssType, env) => {
  if (cssType === 'css-loader') {
    return [
      env === 'production' ? MiniCssExtractPlugin.loader : styleloader,
      cssLoader, postcssLoader,
    ];
  }
  return [
    env === 'production' ? MiniCssExtractPlugin.loader : styleloader,
    cssLoader, postcssLoader, {
      loader: require.resolve(cssType),
      // when import antd,
      // it will show error "Inline JavaScript is not enabled. Is it set in your options?"
      options: getLoaderOptions(cssType),
    },
  ];
};
