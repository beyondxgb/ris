const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

let MOCK_DIR;
let RULES_PATH;

const optionalParam = /\((.*?)\)/g;
const namedParam = /(\(\?)?:\w+/g;
const splatParam = /\*\w+/g;
const escapeRegExp = /[-{}[\]+?.,\\^$|#\s]/g;

function routeToRegExp(_route) {
  const route = _route.replace(escapeRegExp, '\\$&')
    .replace(optionalParam, '(?:$1)?')
    .replace(namedParam, (match, optional) => (optional ? match : '([^/?]+)'))
    .replace(splatParam, '([^?]*?)');
  return new RegExp(`^${route}(?:\\?([\\s\\S]*))?$`);
}

function getApiRules() {
  let apiRules;
  try {
    delete require.cache[RULES_PATH];
    apiRules = require(RULES_PATH);
  } catch (e) {
    console.log(chalk.red(`mock error: read \`${RULES_PATH}\` error`));
    console.log(e);
    apiRules = {};
  }
  return apiRules;
}

function formatUrl(url) {
  if (url[0] !== '/') {
    return `/${url}`;
  }
  return url;
}

function splitRuleKey(rule) {
  const value = rule.split(' ');
  if (value.length === 2) {
    return {
      method: value[0].toUpperCase(),
      url: formatUrl(value[1]),
    };
  }
  return {
    method: 'ALL',
    url: formatUrl(rule),
  };
}

function matchRules(url, method) {
  let result = null;
  // Read rules from the rules file
  const apiRules = getApiRules();
  // Transverse the rule
  Object.keys(apiRules).forEach((key) => {
    const { method: ruleMethod, url: ruleUrl } = splitRuleKey(key);
    const routeReg = routeToRegExp(ruleUrl);
    if ((method === ruleMethod || ruleMethod === 'ALL') && routeReg.test(url)) {
      // Match method and url success
      result = apiRules[key];
    }
  });
  return result;
}

function mapLocalData(localFilePath, req, res, next) {
  const mockFilePath = path.join(MOCK_DIR, localFilePath);
  delete require.cache[mockFilePath];
  if (fs.existsSync(mockFilePath)) {
    console.log(`mock data: ${chalk.yellow(req.originalUrl)} => ${chalk.yellow(mockFilePath)}`);

    // Check extname, must be .json or js
    const extname = path.extname(mockFilePath);
    if (!(extname === '.json' || extname === '.js')) {
      console.log(chalk.red(`mock error: ${chalk.yellow(req.originalUrl)} mock file must be .json or .js`));
      next();
      return;
    }

    // Get mock data
    let mockData;
    try {
      mockData = require(mockFilePath);
    } catch (e) {
      console.log(chalk.red(`mock error: read \`${mockFilePath}\` error`));
      console.log(e);
      next();
      return;
    }

    // Match local data, .json or js
    if (extname === '.json') {
      if (req.query.callback) {
        // JSONP
        const str = `${req.query.callback}(${JSON.stringify(mockData)})`;
        res.end(str);
      } else {
        // JSON
        res.send(mockData);
      }
    } else if (extname === '.js') {
      // Function
      mockData(req, res);
      next();
    }
  } else {
    // Can't not find the mock file
    console.log(chalk.red(`mock error: ${chalk.yellow(req.originalUrl)} can not find ${chalk.yellow(mockFilePath)}`));
  }
  next();
}

module.exports = (app, options = {}) => {
  // Init mock directory
  MOCK_DIR = options.mockDir || path.join(process.cwd(), 'mock');
  // Init rules file path
  RULES_PATH = options.rulesPath || path.join(MOCK_DIR, 'rules.js');
  // Listen all request from local server
  app.use('*', (req, res, next) => {
    const value = matchRules(req.originalUrl, req.method);
    if (!value) {
      // No rule match
      next();
      return;
    }
    if (typeof value === 'string') {
      // Specify .json or .js file
      mapLocalData(value, req, res, next);
    } else if (typeof value === 'object') {
      // Object
      console.log(`mock data: ${chalk.yellow(req.originalUrl)} => ${chalk.yellow(JSON.stringify(value))}`);
      res.json(value);
    } else if (typeof value === 'function') {
      // Function
      console.log(`mock data: ${chalk.yellow(req.originalUrl)} => function}`);
      value(req, res);
      next();
    } else {
      // Invaid data
      console.log(chalk.red(`mock error: ${chalk.yellow(req.originalUrl)} mock data is invalid, expect string, function and object`));
      next();
    }
  });
};
