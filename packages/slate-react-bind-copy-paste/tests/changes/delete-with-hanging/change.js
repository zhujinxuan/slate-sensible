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
                <anchor />Before
                <emoji />
            </paragraph>
            <image />
            <paragraph>
                <emoji>
                    <focus />{' '}
                </emoji>
                After
            </paragraph>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph>
                <emoji>
                    <cursor />{' '}
                </emoji>
                After
            </paragraph>
        </document>
    </value>
);
