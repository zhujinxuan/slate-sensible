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
            <code>
                <cursor />
                {'\n'}Before
                <comment>inline{'\n'}</comment>
                {'\n'}After
                {'\n'}
            </code>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <code>
                <cursor />
                {'\n'}Before
                <comment>inline</comment>
                {'\n'}
                {'\n'}After
                {'\n'}
            </code>
        </document>
    </value>
);
