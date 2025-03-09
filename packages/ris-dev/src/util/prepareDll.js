const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const chalk = require('chalk');
const defaults = require('lodash/defaultsDeep');
const { webpack, dllConfig, webpackConfigDll } = require('@ris/webpack-config');
const { clean, getRisrc } = require('@ris/utils');

const exists = fs.existsSync;
const writeFile = fs.writeFileSync;

const risrc = getRisrc();
const dllFinalConfig = defaults(risrc.dllPlugin || {}, dllConfig.dllPlugin.defaults);
const outputPath = path.join(process.cwd(), dllFinalConfig.path);
const dllManifestPath = path.join(outputPath, 'package.json');

let pkg;
try {
  pkg = require(path.join(process.cwd(), 'package.json'));
} catch (e) {
  pkg = {};
}

function getDllDependenciesInfo(entry) {
  const result = [];
  Object.keys(entry).forEach((key) => {
    const items = entry[key];
    for (let i = 0; i < items.length; i += 1) {
      const itemName = items[i];
      const pkgDeps = pkg.dependencies;
      let version;
      Object.keys(pkgDeps).forEach((depName) => {
        if (depName === itemName) {
          version = pkgDeps[depName];
        }
      });
      result.push({
        name: itemName,
        version,
      });
    }
  });
  return result;
}

function checkIncrement() {
  const manifest = require(dllManifestPath);
  const oldDlls = manifest.dlls;
  const dlls = getDllDependenciesInfo(webpackConfigDll.entry);
  let result = false;
  if (dlls.length < oldDlls.length) {
    result = true;
  }
  // O(N^2) dependencies is less, so ignore
  dlls.forEach((item1) => {
    let flag = false;
    oldDlls.forEach((item2) => {
      // Compare dependent's name and version
      if (item1.name === item2.name && item1.version === item2.version) {
        flag = true;
      }
    });
    if (!flag) {
      result = true;
    }
  });
  return result;
}

async function buildDll() {
  try {
    await clean(outputPath);
  } catch (e) {
    console.log(e);
  }
  
  fse.ensureDirSync(outputPath);

  console.log('# Building the Webpack DLL...');

  if (!exists(dllManifestPath)) {
    writeFile(
      dllManifestPath,
      JSON.stringify(defaults({
        name: 'ris-react-boilerplate-dlls',
        private: true,
        author: pkg.author,
        repository: pkg.repository,
        version: pkg.version,
        dlls: getDllDependenciesInfo(webpackConfigDll.entry),
      }), null, 2),
      'utf8',
    );
  }

  return new Promise((resolve) => {
    const compiler = webpack(webpackConfigDll);
    compiler.apply(new webpack.ProgressPlugin());
    compiler.run((err, stats) => {
      if (err) {
        clean(outputPath).then(() => {
          console.log(chalk.bold.red('# Failed to compile.'));
          console.log();
          console.log(err.message || err);
          console.log();
          process.exit(1);
        });
        return;
      }
      console.log(`\n${stats.toString({
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false,
      })}`);
      // Catch the error that some modules not install correctly,
      // the way is not the best, but no other way
      if (stats.toString().indexOf('ERROR in dll') !== -1 && stats.toString().indexOf('Module not found') !== -1) {
        clean(outputPath).then(() => {
          console.log();
          console.log(chalk.bold.red('# Failed to compile dll, maybe some modules not install correctly.'));
          console.log();
          process.exit(1);
        });
        return;
      }
      console.log();
      console.log('# Building success, now building app...');
      console.log();
      setTimeout(() => {
        // Fix the problem that will trigger hotload soon
        resolve();
      }, 1000);
    });
  });
}

module.exports = async () => {
  // Don't do anything during the DLL Build step
  if (process.env.BUILDING_DLL
      || !pkg.dependencies
      || (pkg.dependencies && Object.keys(pkg.dependencies).length === 0)) {
    return false;
  }
  const { dllPlugin = {} } = risrc;
  const dllPath = path.resolve(process.cwd(), dllPlugin.path || 'node_modules/ris-react-boilerplate-dlls');

  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(dllPath, 'risReactBoilerplateDeps.json');
    const isExists = fs.existsSync(manifestPath);
    // If is not exists or there is some increment, then build dll
    if (!isExists || (isExists && checkIncrement())) {
      if (isExists) {
        console.log('# There is some changes of the dll, begin to rebuild.');
      }
      await buildDll();
      return true;
    }
    return false;
  }

  // If DLLs are explicitly defined, we automatically create a DLLReferencePlugin for each of them.
  const dllManifests = Object.keys(dllPlugin.dlls).map(name => path.join(dllPath, `/${name}.json`));
  let ifBuild = false;
  let isExists = false;

  dllManifests.forEach((manifestPath) => {
    if (!fs.existsSync(manifestPath)) {
      ifBuild = true;
    } else {
      isExists = true;
    }
  });
  if (ifBuild) {
    // Not exists some manifestPath
    await buildDll();
    return true;
  } if (isExists && checkIncrement()) {
    // Exists at least one manifestPath
    console.log('# There is some changes of the dll, begin to rebuild.');
    await buildDll();
    return true;
  }
  return false;
};
