/* global expect */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import { resolve } from 'path';

/**
 * Tests.
 */

describe('slate-delete-one-line', () => {
    const categories = fs
        .readdirSync(__dirname)
        .filter(
            x => x[0] !== '.' && !x.includes('helpers') && !x.match(/\.js$/)
        );

    categories.forEach(category => {
        describe(category, () => {
            const dirPath = resolve(__dirname, category);
            const tests = fs.readdirSync(dirPath).filter(t => t[0] != '.');

            tests.forEach(test => {
                it(test.replace(/\.js$/, ''), () => {
                    const module = require(resolve(dirPath, test));
                    const { input, output } = module;
                    const actual = module.default.call(null, input);
                    if (actual !== output) {
                        expect(actual.toJSON()).equals(output.toJSON());
                    }
                });
            });
        });
    });
});
