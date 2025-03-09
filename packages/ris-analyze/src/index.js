const shelljs = require('shelljs');
const chalk = require('chalk');
const { progress: animateProgress, checkmark: addCheckmark } = require('@ris/utils');

module.exports = {
  run() {
    const progress = animateProgress('Generating stats');

    // Called after webpack has finished generating the stats.json file
    function callback() {
      clearInterval(progress);
      process.stdout.write(
        '\n\nOpen ' + chalk.magenta('http://webpack.github.io/analyse/') + ' in your browser and upload the stats.json file!'
        + chalk.blue('\n(Tip: ' + chalk.italic('CMD + double-click') + ' the link!)\n\n'),
      );
    }

    // Generate stats.json file with webpack
    shelljs.exec(
      'ris build --profile --json stats.json',
      addCheckmark.bind(null, callback), // Output a checkmark on completion
    );
  },
};
