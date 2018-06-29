import fs from 'fs';
import path from 'path';
import assert from 'assert';

import {
    insertFragmentAtRange as insertPlugin,
    deleteAtRange as deletePlugin,
    getFragmentAtRange as getPlugin
} from '../src';

const plugin = {
    insertFragmentAtRange: insertPlugin.generate(),
    deleteAtRange: deletePlugin.generate(),
    getFragmentAtRange: getPlugin.generate()
};

describe('slate-bind-copy-paste', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            const dir = path.resolve(__dirname, test);

            // eslint-disable-next-line
            const {input, output, runChange} = require(path.resolve(dir, 'change.js'))


            const newChange = runChange(plugin, input.change());

            const opts = { preserveSelection: true, preserveData: true };
            const newDocJSon = newChange.value.toJSON(opts);
            assert.deepEqual(newDocJSon, output.toJSON(opts));
        });
    });
});
