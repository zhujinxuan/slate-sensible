/* eslint-disable import/no-commonjs */
const { jest: lernaAliases } = require('lerna-alias');

module.exports = {
    verbose: true,
    moduleNameMapper: lernaAliases(),
    collectCoverageFrom: ['**/src/**', '!**/test/**']
};
