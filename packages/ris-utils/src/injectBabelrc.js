const path = require('path');
const fse = require('fs-extra');

module.exports = (library) => {
  const filePath = path.join(process.cwd(), '.babelrc');
  fse.ensureFileSync(filePath);
  let babelrc = {};
  try {
    babelrc = fse.readJsonSync(filePath);
  } catch (error) {
    //
  }
  const plugins = babelrc.plugins || [];
  let flag = false;
  plugins.forEach((plugin) => {
    if (typeof plugin === 'object' && plugin.length) {
      if (plugin[0] === 'import' && plugin[1].libraryName === library) {
        flag = true;
      }
    }
  });
  if (flag === true) {
    return;
  }
  plugins.push([
    'import',
    {
      libraryName: library,
      style: 'css',
    },
    library,
  ]);
  fse.writeFileSync(filePath, JSON.stringify(babelrc, null, 2));
};
