/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

export function runChange(changes, change) {
    return changes.splitBlock(change);
}

export const input = (
    <value>
        <document>
            <paragraph>
                <anchor />Before
                <emoji />
            </paragraph>
            <image />
            <quote>
                <emoji>
                    <focus />{' '}
                </emoji>
                After
            </quote>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <paragraph />
            <quote>
                <emoji>
                    <cursor />{' '}
                </emoji>
                After
            </quote>
        </document>
    </value>
);
