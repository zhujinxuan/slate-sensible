/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */

import h from '../h';

export function runChange(simulator) {
    simulator.keyDown({ key: 'Enter' });
    return simulator.value;
}

export const input = (
    <value>
        <document>
            <code>
                {'\n'}
                <anchor />POI<focus />
                {'cat is cute'}
            </code>
        </document>
    </value>
);

export const output = (
    <value>
        <document>
            <code>
                {'\n'}
                {'\n'}
                <cursor />
                {'cat is cute'}
            </code>
        </document>
    </value>
);
