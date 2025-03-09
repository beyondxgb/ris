module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    './rules/es6',
  ].map(require.resolve),
};
