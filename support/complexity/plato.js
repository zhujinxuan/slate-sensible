/* eslint-disable import/no-commonjs */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const { resolve } = require('path');
const plato = require('es6-plato');
const eslint = require('../../.eslintrc');

const src = resolve(__dirname, '../../packages/*/src/**/*.js');
const outputDir = resolve(__dirname, '../../tmp/plato');

const platoArgs = {
    title: 'slate-sensible',
    eslint
};

// you can use the reports in the callback.
function callback(reports) {
    const overview = plato.getOverviewReport(reports);

    const { total, average } = overview.summary;

    const output = `total
    ----------------------
    eslint: ${total.eslint}
    sloc: ${total.sloc}
    maintainability: ${total.maintainability}
    average
    ----------------------
    eslint: ${average.eslint}
    sloc: ${average.sloc}
    maintainability: ${average.maintainability}`;

    console.log(output);
}

// usage is plato.inspect
plato.inspect(src, outputDir, platoArgs, callback);
