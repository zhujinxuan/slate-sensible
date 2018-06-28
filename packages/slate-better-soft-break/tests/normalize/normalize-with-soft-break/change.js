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
                {'\n'}Before
                {'\n'}After
                {'\n'}
            </paragraph>
        </document>
    </value>
);

// I know the cursor position is a bug indeed, but I do not want to change about it
export const output = (
    <value>
        <document>
            <paragraph>{''}</paragraph>
            <paragraph>
                <cursor />Before
            </paragraph>
            <paragraph>After</paragraph>
            <paragraph />
        </document>
    </value>
);
