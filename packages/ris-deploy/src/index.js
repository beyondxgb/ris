const chalk = require('chalk');

const { deploy, sleep, checkRemoteMaster } = require('./helper');
const {
  chooseEnv,
  chooseType,
  chooseVersion,
  confirm,
} = require('./handler');

const { DAILY, PUBLISH } = require('./constant');

async function main() {
  await checkRemoteMaster();
  const { env } = await chooseEnv();
  const { type } = await chooseType(env);
  const { version } = await chooseVersion[type](env);
  const { isConfirm } = await confirm({ version, env });
  if (isConfirm) {
    await deploy(version, DAILY);
    if (env === PUBLISH) {
      await sleep(5000);
      await deploy(version, PUBLISH);
    }
  } else {
    throw new Error('Deploy failed!');
  }
}

async function boom() {
  try {
    await main();
    const message = '\nDeployed successfully!';
    console.log(`${chalk.green(message)}`);
  } catch (err) {
    console.error(`${chalk.red(err.message || err)}`);
    process.exit();
  }
}

module.exports = {
  async run() {
    await boom();
  },
};
