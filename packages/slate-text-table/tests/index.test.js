/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import fs from 'fs';
import path from 'path';
import { Schema, Value } from 'slate';
import readMetadata from 'read-metadata';
import EditTable from 'slate-text-table';

const PLUGIN = EditTable();

const SCHEMA = Schema.create({
    plugins: [PLUGIN]
});

function deserializeValue(json) {
    return Value.fromJSON({ ...json, schema: SCHEMA }, { normalize: false });
}

describe('slate-text-table', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            const dir = path.resolve(__dirname, test);
            const module = require(path.resolve(dir, 'change.js'));
            const runChange = module.default;

            let { input, expected } = module;
            let opts = { preserveSelection: true, preserveData: true };

            if (!input && !expected) {
                opts = {};
                const objectInput = readMetadata.sync(
                    path.resolve(dir, 'input.yaml')
                );

                input = deserializeValue(objectInput);
                const expectedPath = path.resolve(dir, 'expected.yaml');

                const objectExpected =
                    fs.existsSync(expectedPath) &&
                    readMetadata.sync(expectedPath);

                if (objectExpected) expected = deserializeValue(objectExpected);
            }

            const newChange = runChange(
                PLUGIN,
                input.change().setValue({ schema: SCHEMA })
            );

            if (expected === newChange) return;

            if (!expected) {
                throw new Error(
                    'Expected must have a validate value to compare'
                );
            }

            if (expected.equals && expected.equals(newChange)) return;
            const newDocJSon = newChange.value.toJSON(opts);
            expect(newDocJSon).toEqual(expected.toJSON(opts));
        });
    });
});
