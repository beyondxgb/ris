const path = require('path');
const fs = require('fs');

module.exports = () => {
  const filePath = path.join(process.cwd(), 'tools/server/index.js');
  if (fs.existsSync(filePath)) {
    try {
      return require(filePath);
    } catch (e) {
      console.log(e);
      process.exit(0);
    }
  }
  return {};
};
