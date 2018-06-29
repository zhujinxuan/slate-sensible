import fs from 'fs';
import path from 'path';
import { Schema } from 'slate';

function runTest(plugins, changes) {
    const SCHEMA = Schema.create({
        plugins
    });

    describe('slate-react-bind-copy-paste', () => {
        const tests = fs.readdirSync(__dirname);

        tests.forEach(test => {
            if (test[0] === '.' || path.extname(test).length > 0) return;

            it(test, () => {
                const dir = path.resolve(__dirname, test);

                // eslint-disable-next-line
                const {input, output, runChange} = require(path.resolve(dir, 'change.js'))

                const newChange = runChange(
                    changes,
                    input.change().setValue({ schema: SCHEMA })
                );

                const opts = { preserveSelection: true, preserveData: true };
                const newDocJSon = newChange.value.toJSON(opts);
                expect(newDocJSon).toEqual(output.toJSON(opts));
            });
        });
    });
}

export default runTest;
