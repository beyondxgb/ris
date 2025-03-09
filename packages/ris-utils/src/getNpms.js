const which = require('which');


module.exports = () => {
  const npms = [];

  try {
    if (which.sync('tnpm')) {
      npms.push('tnpm');
    }
  } catch (err) {
    //
  }

  try {
    if (which.sync('cnpm')) {
      npms.push('cnpm');
    }
  } catch (err) {
    //
  }

  npms.push('npm');

  return npms;
};
