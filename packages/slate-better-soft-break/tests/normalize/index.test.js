import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { Schema } from 'slate';
import createSoftBreakPlugin from '../../src/';

const plugin = createSoftBreakPlugin({
    softBreakIn: ['code', 'cell']
});
const SCHEMA = Schema.create({
    plugins: [plugin]
});

describe('slate-better-soft-break', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            const dir = path.resolve(__dirname, test);

            // eslint-disable-next-line
            const {input, output, runChange} = require(path.resolve(dir, 'change.js'))


            const newChange = runChange(
                plugin,
                input.change().setValue({ schema: SCHEMA })
            );

            const opts = { preserveSelection: true, preserveData: true };
            const newDocJSon = newChange.value.toJSON(opts);
            assert.deepEqual(newDocJSon, output.toJSON(opts));
        });
    });
});
