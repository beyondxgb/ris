const del = require('del');

module.exports = directory => del([directory], { dot: true });
