/** @jsx h */

import h from '../h';

export function runChange(plugin, change) {
    const { deleteAtRange } = plugin;
    deleteAtRange(change, change.value.selection);
    return change;
}
export const input = (
    <value>
        <document>
            <paragraph>Before</paragraph>
            <image>
                {' '}
                <anchor />
            </image>
            <image />
            <paragraph>
                {' '}
                <focus />After
            </paragraph>
        </document>
    </value>
);
export const output = (
    <value>
        <document>
            <paragraph>
                Before<anchor />
            </paragraph>
            <paragraph>
                <focus />After
            </paragraph>
        </document>
    </value>
);
