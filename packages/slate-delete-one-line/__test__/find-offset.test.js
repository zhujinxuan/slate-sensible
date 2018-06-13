/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import { resolve } from 'path';
import assert from 'assert';
/**
 * Tests.
 */

describe('slate-delete-one-line', () => {
    const categories = fs
        .readdirSync(__dirname)
        .filter(x => x[0] !== '.' && !x.match(/\.js$/));

    categories.forEach(category => {
        describe(category, () => {
            const dirPath = resolve(__dirname, category);
            const tests = fs.readdirSync(dirPath).filter(t => t[0] != '.');

            tests.forEach(test => {
                test(test.replace(/\.js$/, ''), () => {
                    const module = require(resolve(dirPath, test));
                    const { input, output } = module;
                    const actual = module.default.call(null, input);
                    if (actual !== output) {
                        assert.deepEqual(actual.toJSON(), output.toJSON());
                    }
                });
            });
        });
    });
});
