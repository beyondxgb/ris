#!/usr/bin/env node
const program = require('commander');
const semver = require('semver');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const updater = require('npm-updater');
const pkg = require('../package.json');
const commands = require('./command');
const utils = require('./utils');
const env = require('./env');

program
  .version(pkg.version, '-v, --version')
  .usage('<command> [options]');

process.env = { ...env, ...process.env };

const argvs = process.argv;

function isInternalCommand(command) {
  return commands.some(item => item.command === command);
}

function autoRecommended(target) {
  let result = [];
  commands.forEach((item) => {
    result.push({
      command: item.command,
      percent: utils.strSimilarity2Percent(target, item.command),
    });
  });
  result = result.sort((a, b) => a.percent < b.percent);
  console.log(`'${target}' is not a ris command. See 'ris --help'.`);
  console.log();
  console.log('Did you mean one of these?');
  console.log(`\t${result[0].command}`);
  console.log(`\t${result[1].command}`);
}

function validateDirectory() {
  const filePath = path.join(process.cwd(), 'tools/risrc.js');
  if (!fs.existsSync(filePath)) {
    console.log();
    console.log(chalk.red('You should run this command in an ris project.'));
    console.log();
    process.exit(1);
  }
}

function registerCommand() {
  for (let i = 0, len = commands.length; i < len; i += 1) {
    const {
      name,
      command,
      description,
      options,
    } = commands[i];
    const cmdObj = program.command(command).description(description).allowUnknownOption();
    if (name !== '') {
      const cmdPath = `@ris/${name}`;
      if (options) {
        // add command options
        options.forEach((option) => {
          cmdObj.option(option[0], option[1]);
        });
      }
      // command callback
      cmdObj.action((_cmd, _opts) => {
        if (name !== 'init') {
          validateDirectory();
        }
        // get command param and options
        let cmd = _cmd;
        let opts = _opts;
        if (cmd instanceof program.Command) {
          opts = cmd;
          cmd = undefined;
        }
        opts = opts || {};
        // exec command
        require(cmdPath).run(cmd, opts);
      });
    }
  }
}

function main() {
  // check node version
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    console.log(chalk.red.bold(`Require nodejs version ${pkg.engines.node}, current ${process.version}`));
    console.log(`Download the latest nodejs here ${chalk.green('https://nodejs.org/en/download/')}`);
    process.exit();
  }
  registerCommand();

  // todo check update

  const command = argvs[2];
  // parse command param
  program.parse(process.argv);

  // print help information
  if (!command) {
    program.outputHelp();
    process.exit(0);
  }

  if (!isInternalCommand(command)) {
    autoRecommended(command);
  }
}

updater({
  package: pkg,
  abort: false,
  level: 'patch',
  registry: 'https://registry.npm.taobao.org',
  updateMessage: `\nPlease run ${chalk.magenta('npm i @ris/cli@latest --save-dev')} to install.`,
}).then(() => {
  main();
});

module.exports = main;
