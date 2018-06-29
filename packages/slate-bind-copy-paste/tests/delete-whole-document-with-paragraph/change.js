/** @jsx h */

import h from '../h';

function runChange(plugin, change) {
    const { deleteAtRange } = plugin;
    return deleteAtRange(change, change.value.selection, {
        deleteStartText: false
    });
}

const input = (
    <value>
        <document>
            <paragraph>
                <anchor />
                Before
                <emoji />
            </paragraph>
            <image />
            <paragraph>
                <emoji />
                After
                <focus />
            </paragraph>
        </document>
    </value>
);
const output = (
    <value>
        <document>
            <paragraph>
                <cursor />
                {''}
            </paragraph>
        </document>
    </value>
);
export { input, output, runChange };
