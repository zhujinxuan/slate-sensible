/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

export function runChange(changes, change) {
    return changes.splitBlock(change).insertText('a');
}

export const input = (
    <value>
        <document>
            <paragraph>
                <anchor />
                <b>B</b>
                <focus />efore
            </paragraph>
            <image />
            <paragraph>
                <emoji />
                After
            </paragraph>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph>
                <b />
            </paragraph>
            <paragraph>
                <b>a</b>
                <cursor />efore
            </paragraph>
            <image />
            <paragraph>
                <emoji />
                After
            </paragraph>
        </document>
    </value>
);
