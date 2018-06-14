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
        .filter(x => x[0] !== '.' && !x.match(/\.js$/));

    categories.forEach(category => {
        describe(category, () => {
            const dirPath = resolve(__dirname, category);
            const tests = fs.readdirSync(dirPath).filter(t => t[0] != '.');
            if (tests.includes('index.js')) {
                require(dirPath);
            }
        });
    });
});
