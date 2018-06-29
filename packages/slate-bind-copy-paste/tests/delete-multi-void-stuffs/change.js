/** @jsx h */

import h from '../h';

function runChange(plugin, change) {
    const { deleteAtRange } = plugin;
    return deleteAtRange(change, change.value.selection);
}

const input = (
    <value>
        <document>
            <paragraph>
                Before
                <emoji>
                    {' '}
                    <anchor />
                </emoji>
            </paragraph>
            <image />
            <paragraph>
                <emoji>
                    {' '}
                    <focus />
                </emoji>
                After
            </paragraph>
        </document>
    </value>
);
const output = (
    <value>
        <document>
            <paragraph>
                Before<cursor />After
            </paragraph>
        </document>
    </value>
);
export { input, output, runChange };
