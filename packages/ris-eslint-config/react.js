module.exports = {
  extends: [
    'eslint-config-airbnb',
    './rules/es6',
    './rules/react',
  ].map(require.resolve),
};
