/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

export function runChange(plugin, change) {
    change.normalize();
    return change;
}

export const input = (
    <value>
        <document>
            <paragraph>
                <cursor />
                {'\n'}
            </paragraph>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph />
            <paragraph>
                <cursor />
                {''}
            </paragraph>
        </document>
    </value>
);
