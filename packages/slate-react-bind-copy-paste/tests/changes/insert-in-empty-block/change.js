/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

export function runChange(changes, change) {
    return changes.insertText(change, 'cat is cute');
}

export const input = (
    <value>
        <document>
            <paragraph>
                <b>Before</b>
            </paragraph>
            <paragraph />
            <paragraph>
                <cursor />
            </paragraph>
            <paragraph>After</paragraph>
        </document>
    </value>
)
    .change()
    .normalize().value;

export const output = (
    <value>
        <document>
            <paragraph>
                <b>Before</b>
            </paragraph>
            <paragraph />
            <paragraph>
                <b>cat is cute</b>
                <cursor />
            </paragraph>
            <paragraph>After</paragraph>
        </document>
    </value>
);
