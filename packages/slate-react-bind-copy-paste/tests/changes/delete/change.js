/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

export function runChange(changes, change) {
    return changes.delete(change);
}

export const input = (
    <value>
        <document>
            <paragraph>
                <anchor />B
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
