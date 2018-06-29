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
                <anchor />Before
                <emoji />
            </paragraph>
            <image />
            <paragraph>
                <focus />
                After
            </paragraph>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph>cat is cute</paragraph>
            <paragraph>
                <cursor />After
            </paragraph>
        </document>
    </value>
);
