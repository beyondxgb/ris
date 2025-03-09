module.exports = {
  port: 3000,
  headers: {
    'access-control-allow-origin': '*',
  },
  clientLogLevel: 'none',
  disableHostCheck: true,
  compress: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
  },
  quiet: false,
  historyApiFallback: {
    disableDotRule: true,
  },
  proxy: {

  },
};
