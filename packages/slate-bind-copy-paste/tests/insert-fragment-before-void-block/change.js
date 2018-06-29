/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

const fragment = (
    <document>
        <paragraph>Before</paragraph>
        <image />
        <paragraph>After</paragraph>
    </document>
);

export function runChange(plugin, change) {
    const { insertFragmentAtRange } = plugin;
    return insertFragmentAtRange(change, change.value.selection, fragment);
}

export const input = (
    <value>
        <document>
            <image>
                <cursor />
            </image>
        </document>
    </value>
);
export const output = (
    <value>
        <document>
            <paragraph>Before</paragraph>
            <image />
            <paragraph>
                After<cursor />
            </paragraph>
            <image />
        </document>
    </value>
);
