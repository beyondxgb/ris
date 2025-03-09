const detect = require('detect-port-alt');
const isRoot = require('is-root');
const chalk = require('chalk');
const inquirer = require('inquirer');
const getProcessForPort = require('./getProcessForPort');

const isInteractive = true;

module.exports = (host, defaultPort) => (
  detect(defaultPort, host).then(
    port => new Promise((resolve) => {
      if (port === defaultPort) {
        return resolve(port);
      }
      const message = process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
        ? 'Admin permissions are required to run a server on a port below 1024.'
        : `Something is already running on port ${defaultPort}.`;
      if (isInteractive) {
        const existingProcess = getProcessForPort(defaultPort);
        const question = {
          type: 'confirm',
          name: 'shouldChangePort',
          message:
              chalk.yellow(
                message
                  + `${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}`,
              ) + '\n\nWould you like to run the app on another port instead?',
          default: true,
        };
        return inquirer.prompt(question).then((answer) => {
          if (answer.shouldChangePort) {
            resolve(port);
          } else {
            resolve(null);
          }
        });
      }
      console.log(chalk.red(message));
      return resolve(null);
    }),
    (err) => {
      throw new Error(
        chalk.red(`Could not find an open port at ${chalk.bold(host)}.`)
          + '\n'
          + ('Network error message: ' + err.message || err)
          + '\n',
      );
    },
  )
);
