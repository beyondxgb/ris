const inquirer = require('inquirer');
const chalk = require('chalk');

const {
  getFixedVersion,
  getCurrentVersion,
  getLatestVersion,
  validateVersion,
} = require('./helper');

const {
  DEFAULT,
  DAILY,
  PUBLISH,
  FIXED,
  CURRENT,
  LATEST,
  CUSTOM,
} = require('./constant');

const chooseVersion = {
  [FIXED]: () => {
    const version = getFixedVersion(DEFAULT);
    return Promise.resolve({ version });
  },
  [CURRENT]: () => getCurrentVersion().then(version => Promise.resolve({ version })),
  [LATEST]: () => getLatestVersion().then(version => Promise.resolve({ version })),
  [CUSTOM]: () => inquirer.prompt({
    type: 'input',
    name: 'version',
    message: 'Please input the version:',
    validate: value => validateVersion(value) || 'The format of version is wrong, should like this: x.y.z',
  }),
};

const chooseType = (env) => {
  const choices = [CURRENT, LATEST, CUSTOM];
  if (env === DAILY) {
    choices.unshift(FIXED);
  }

  return inquirer.prompt({
    type: 'list',
    name: 'type',
    message: 'Please choose type:',
    choices,
  });
};

const confirm = ({ version, env }) => inquirer.prompt({
  type: 'confirm',
  name: 'isConfirm',
  message: `Are you sure to deploy ${chalk.bgRed(version)} to ${chalk.bgRed(env)}?`,
});

const chooseEnv = () => inquirer.prompt({
  type: 'list',
  name: 'env',
  message: 'Please choose environment:',
  choices: [DAILY, PUBLISH],
});

module.exports = {
  chooseVersion,
  chooseType,
  chooseEnv,
  confirm,
};
