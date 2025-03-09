const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { webpack, webpackConfigProd } = require('@ris/webpack-config');
const {
  mergeWebpackConfig, clean, getUserWebpackConfig, merge,
} = require('@ris/utils');

// hide webpack deprecation warning
process.noDeprecation = true;
// Set node env
process.env.NODE_ENV = 'production';

function build(webpackConfig, options) {
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }
  if (!options.profile) {
    compiler.apply(new webpack.ProgressPlugin());
  }
  compiler.run((err, stats) => {
    if (err) {
      console.log(err);
    } else if (options.profile) {
      fs.writeFileSync(path.join(process.cwd(), options.json || ''), JSON.stringify(stats.toJson(), null, 2));
    } else {
      console.log(`\n${stats.toString({
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false,
      })}`);
    }
  });
}

module.exports = {
  async run(argument, options) {
    // user config
    const userWebpackConfig = getUserWebpackConfig();
    // merge config
    const webpackConfig = mergeWebpackConfig(
      merge(userWebpackConfig.base, userWebpackConfig.prod),
      webpackConfigProd,
    );
    try {
      await clean(webpackConfig.output.path);
    } catch (err) {
      console.log(chalk.red(`Failed to clean output path ${webpackConfig.output.path}`));
      console.log();
      console.log(err.message || err);
      console.log();
      process.exit(1);
    }

    build(webpackConfig, options);
  },
};
