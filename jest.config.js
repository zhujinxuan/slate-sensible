/* eslint-disable import/no-commonjs */
const { jest: lernaAliases } = require('lerna-alias');

module.exports = {
    verbose: true,
    moduleNameMapper: lernaAliases(),
    globals: {
        NODE_ENV: 'test'
    },
    collectCoverageFrom: ['**/src/**', '!**/test/**']
};
