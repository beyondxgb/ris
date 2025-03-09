const path = require('path');
const spawn = require('cross-spawn');

module.exports = {
  run() {
    const filePath = path.join(process.cwd(), 'tools/generators/index.js');
    const plop = path.join(__dirname, '../node_modules/.bin/plop');
    spawn(plop, ['--plopfile', filePath], { stdio: 'inherit' });
  },
};
